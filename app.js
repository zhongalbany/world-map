const data = window.COUNTRY_MAP_DATA;
const map = document.querySelector("#worldMap");
const guessForm = document.querySelector("#guessForm");
const guessInput = document.querySelector("#guessInput");
const hintList = document.querySelector("#hintList");
const feedback = document.querySelector("#feedback");
const skipButton = document.querySelector("#skipButton");
const revealButton = document.querySelector("#revealButton");
const nextButton = document.querySelector("#nextButton");
const backButton = document.querySelector("#backButton");
const newRoundButton = document.querySelector("#newRoundButton");
const submitButton = document.querySelector("#submitButton");
const zoomInButton = document.querySelector("#zoomInButton");
const zoomOutButton = document.querySelector("#zoomOutButton");
const zoomResetButton = document.querySelector("#zoomResetButton");
const terrainToggleButton = document.querySelector("#terrainToggleButton");
const modePanel = document.querySelector("#modePanel");
const startButton = document.querySelector("#startButton");
const gameSurfaces = document.querySelectorAll(".game-surface");
const appShell = document.querySelector(".app-shell");
const mapPanel = document.querySelector(".map-panel");
const scoreboard = document.querySelector(".scoreboard");
const topbar = document.querySelector(".topbar");

const score = {
  correct: 0,
  wrong: 0,
  skipped: 0,
  streak: 0,
};

let queue = [];
let current = null;
let pathById = new Map();
let countryLayer = null;
let labelLayer = null;
let terrainLayer = null;
let view = { x: 0, y: 0, width: data.width, height: data.height };
let drag = null;
let advanceTimer = null;
let viewAnimation = null;
let gameMode = "label";
let gameStarted = false;
let completedIds = new Set();
let waitingForNext = false;

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function countryAnswers(country) {
  return new Set([country.name, ...country.aliases].map(normalize));
}

function renderMap() {
  map.setAttribute("viewBox", `${view.x} ${view.y} ${view.width} ${view.height}`);
  map.setAttribute("preserveAspectRatio", "xMidYMid meet");
  const terrain = document.createElementNS("http://www.w3.org/2000/svg", "image");
  terrain.setAttribute("href", "./assets/terrain-world.png");
  terrain.setAttribute("x", "0");
  terrain.setAttribute("y", "0");
  terrain.setAttribute("width", data.width);
  terrain.setAttribute("height", data.height);
  terrain.setAttribute("preserveAspectRatio", "xMidYMid meet");
  terrain.setAttribute("class", "terrain-relief");
  terrainLayer = terrain;

  const riverLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  riverLayer.setAttribute("id", "riverLayer");
  (window.MAJOR_RIVERS_DATA?.rivers || []).forEach((river) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", river.path);
    path.setAttribute("class", "river");
    riverLayer.append(path);
  });

  countryLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  countryLayer.setAttribute("id", "countryLayer");
  labelLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  labelLayer.setAttribute("id", "labelLayer");
  map.append(terrain, riverLayer, countryLayer, labelLayer);

  data.countries.forEach((country) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", country.path);
    path.setAttribute("class", "country");
    path.setAttribute("data-id", country.id);
    path.setAttribute("aria-hidden", "true");
    countryLayer.append(path);
    pathById.set(country.id, path);
  });
}

function updateScores() {
  document.querySelector("#correctCount").textContent = score.correct;
  document.querySelector("#wrongCount").textContent = score.wrong;
  document.querySelector("#skippedCount").textContent = score.skipped;
  document.querySelector("#streakCount").textContent = score.streak;
}

function setFeedback(message, type = "") {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`.trim();
}

function setCurrent(country) {
  current = country;
  clearTimeout(advanceTimer);
  waitingForNext = false;
  guessInput.value = "";
  hintList.innerHTML = "";
  setFeedback("Find the highlighted country.");
  setAnswerControlsEnabled(true);
  nextButton.hidden = true;

  pathById.forEach((path) => {
    path.classList.toggle("active", path.dataset.id === country.id);
    path.classList.toggle("dimmed", path.dataset.id !== country.id);
  });

  const activePath = pathById.get(country.id);
  if (activePath) countryLayer.append(activePath);
  fitLayout();
  zoomToCountry(country, true);
  guessInput.focus({ preventScroll: true });
}

function nextCountry() {
  if (queue.length === 0) {
    queue = shuffle(data.countries);
    setFeedback("Full pass complete. Countries reshuffled.");
  }
  setCurrent(queue.pop());
}

function resetGame() {
  queue = shuffle(data.countries);
  completedIds = new Set();
  score.correct = 0;
  score.wrong = 0;
  score.skipped = 0;
  score.streak = 0;
  labelLayer.innerHTML = "";
  waitingForNext = false;
  nextButton.hidden = true;
  setAnswerControlsEnabled(true);
  pathById.forEach((path) => path.classList.remove("completed", "active", "dimmed"));
  updateScores();
  resetZoom();
  nextCountry();
}

function startGame() {
  gameMode = document.querySelector('input[name="gameMode"]:checked')?.value || "label";
  gameStarted = true;
  modePanel.hidden = true;
  gameSurfaces.forEach((surface) => {
    surface.hidden = false;
  });
  newRoundButton.disabled = false;
  resetZoom();
  fitLayout();
  resetGame();
}

function backToMainMenu() {
  clearTimeout(advanceTimer);
  gameStarted = false;
  current = null;
  waitingForNext = false;
  guessInput.value = "";
  hintList.innerHTML = "";
  labelLayer.innerHTML = "";
  nextButton.hidden = true;
  setAnswerControlsEnabled(true);
  completedIds = new Set();
  pathById.forEach((path) => path.classList.remove("completed", "active", "dimmed"));
  resetZoom();
  gameSurfaces.forEach((surface) => {
    surface.hidden = true;
  });
  modePanel.hidden = false;
  newRoundButton.disabled = true;
  setFeedback("");
}

function checkGuess() {
  if (waitingForNext) return;
  const typed = normalize(guessInput.value);
  if (!typed || !current) return;

  if (countryAnswers(current).has(typed)) {
    score.correct += 1;
    score.streak += 1;
    completeCountry(current);
    updateScores();
    setFeedback(`Correct: ${current.name}`, "good");
    waitForNext();
  } else {
    score.wrong += 1;
    score.streak = 0;
    updateScores();
    setFeedback("Not quite. Try another name or alias.", "bad");
  }
}

function waitForNext() {
  clearTimeout(advanceTimer);
  waitingForNext = true;
  hintList.innerHTML = "";
  setAnswerControlsEnabled(false);
  nextButton.hidden = false;
  nextButton.focus({ preventScroll: true });
}

function setAnswerControlsEnabled(enabled) {
  guessInput.disabled = !enabled;
  submitButton.disabled = !enabled;
  skipButton.disabled = !enabled;
  revealButton.disabled = !enabled;
}

function goToNextCountry() {
  if (!waitingForNext) return;
  waitingForNext = false;
  nextButton.hidden = true;
  setAnswerControlsEnabled(true);
  nextCountry();
}

function completeCountry(country) {
  if (gameMode !== "label" || completedIds.has(country.id)) return;
  completedIds.add(country.id);

  const path = pathById.get(country.id);
  if (!path) return;
  path.classList.add("completed");
  addCountryLabel(country, path);
}

function addCountryLabel(country, path) {
  const box = pathBounds(path);
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const fontSize = Math.max(5.8, Math.min(8.2, Math.sqrt(Math.max(box.width * box.height, 1)) / 10));
  label.setAttribute("class", "country-label");
  label.setAttribute("x", box.x + box.width / 2);
  label.setAttribute("y", box.y + box.height / 2);
  label.setAttribute("font-size", fontSize.toFixed(1));
  label.textContent = country.name;
  labelLayer.append(label);
}

function updateHints() {
  if (waitingForNext) return;
  const typed = normalize(guessInput.value);
  hintList.innerHTML = "";
  if (typed.length < 1) return;

  const matches = data.countries
    .map((country) => country.name)
    .filter((name) => normalize(name).startsWith(typed))
    .slice(0, 8);

  matches.forEach((name) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hint";
    button.textContent = name;
    button.setAttribute("role", "option");
    button.addEventListener("click", () => {
      guessInput.value = name;
      updateHints();
      guessInput.focus({ preventScroll: true });
    });
    hintList.append(button);
  });
}

function skipCountry() {
  if (waitingForNext) return;
  score.skipped += 1;
  score.streak = 0;
  updateScores();
  setFeedback(`Skipped: ${current.name}`, "bad");
  clearTimeout(advanceTimer);
  advanceTimer = setTimeout(nextCountry, 750);
}

function revealCountry() {
  if (waitingForNext) return;
  score.wrong += 1;
  score.streak = 0;
  updateScores();
  guessInput.value = current.name;
  setFeedback(`Answer: ${current.name}`, "bad");
  waitForNext();
}

function applyView() {
  const x = Math.max(0, Math.min(data.width - view.width, view.x));
  const y = Math.max(0, Math.min(data.height - view.height, view.y));
  view = { ...view, x, y };
  map.setAttribute("viewBox", `${view.x} ${view.y} ${view.width} ${view.height}`);
}

function resetZoom({ animate = false } = {}) {
  const target = { x: 0, y: 0, width: data.width, height: data.height };
  if (animate) {
    animateViewTo(target);
  } else {
    view = target;
    applyView();
  }
}

function zoomAt(factor, centerX = view.x + view.width / 2, centerY = view.y + view.height / 2) {
  const nextWidth = Math.max(130, Math.min(data.width, view.width * factor));
  const nextHeight = nextWidth / 2;
  view = {
    x: centerX - nextWidth / 2,
    y: centerY - nextHeight / 2,
    width: nextWidth,
    height: nextHeight,
  };
  applyView();
}

function pathBounds(path) {
  try {
    return path.getBBox();
  } catch {
    return { x: 0, y: 0, width: data.width, height: data.height };
  }
}

function animateViewTo(target, duration = 520) {
  if (viewAnimation) cancelAnimationFrame(viewAnimation);
  const start = { ...view };
  const startTime = performance.now();
  const clampedTarget = clampView(target);

  function ease(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function step(now) {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = ease(progress);
    view = {
      x: start.x + (clampedTarget.x - start.x) * eased,
      y: start.y + (clampedTarget.y - start.y) * eased,
      width: start.width + (clampedTarget.width - start.width) * eased,
      height: start.height + (clampedTarget.height - start.height) * eased,
    };
    map.setAttribute("viewBox", `${view.x} ${view.y} ${view.width} ${view.height}`);
    if (progress < 1) {
      viewAnimation = requestAnimationFrame(step);
    } else {
      view = clampedTarget;
      applyView();
      viewAnimation = null;
    }
  }

  viewAnimation = requestAnimationFrame(step);
}

function clampView(target) {
  const width = Math.max(130, Math.min(data.width, target.width));
  const height = width / 2;
  return {
    x: Math.max(0, Math.min(data.width - width, target.x)),
    y: Math.max(0, Math.min(data.height - height, target.y)),
    width,
    height,
  };
}

function zoomToCountry(country, animate = true) {
  const path = pathById.get(country.id);
  if (!path) return;
  const box = pathBounds(path);
  const boxWidth = Math.max(box.width, 1);
  const boxHeight = Math.max(box.height, 1);
  const maxZoomWidth = 130;
  const isLarge = boxWidth > data.width * 0.32 || boxHeight > data.height * 0.32;
  const padding = isLarge ? 24 : 42;
  const multiplier = isLarge ? 1.18 : 1.55;
  const targetWidth = Math.max(
    maxZoomWidth,
    Math.min(data.width, Math.max(boxWidth * multiplier + padding * 2, (boxHeight * multiplier + padding * 2) * 2)),
  );
  const targetHeight = targetWidth / 2;
  const target = {
    x: box.x + box.width / 2 - targetWidth / 2,
    y: box.y + box.height / 2 - targetHeight / 2,
    width: targetWidth,
    height: targetHeight,
  };
  if (animate) {
    animateViewTo(target);
  } else {
    view = target;
    applyView();
  }
}

function fitLayout() {
  const viewportHeight = window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight;
  const shellStyles = getComputedStyle(appShell);
  const paddingY = parseFloat(shellStyles.paddingTop) + parseFloat(shellStyles.paddingBottom);
  const gap = parseFloat(shellStyles.rowGap || shellStyles.gap || 8);
  const visibleBlocks = [topbar, modePanel.hidden ? null : modePanel, scoreboard.hidden ? null : scoreboard, guessForm.hidden ? null : guessForm].filter(Boolean);
  const occupied = visibleBlocks.reduce((sum, element) => sum + element.getBoundingClientRect().height, 0);
  const visibleGapCount = Math.max(0, visibleBlocks.length + (mapPanel.hidden ? 0 : 1) - 1);
  const availableHeight = viewportHeight - paddingY - occupied - visibleGapCount * gap;
  const shellWidth = appShell.clientWidth - parseFloat(shellStyles.paddingLeft) - parseFloat(shellStyles.paddingRight);
  const mapHeightByWidth = Math.max(0, shellWidth / 2);
  const mapHeight = Math.max(48, Math.min(mapHeightByWidth, Math.max(0, availableHeight)));
  appShell.style.setProperty("--map-height", `${Math.floor(mapHeight)}px`);
}

function pointerPoint(event) {
  const rect = map.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * view.width + view.x,
    y: ((event.clientY - rect.top) / rect.height) * view.height + view.y,
  };
}

guessInput.addEventListener("input", () => {
  updateHints();
});

guessInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || event.isComposing) return;
  event.preventDefault();
  checkGuess();
});

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkGuess();
});

startButton.addEventListener("click", startGame);
backButton.addEventListener("click", backToMainMenu);
skipButton.addEventListener("click", skipCountry);
revealButton.addEventListener("click", revealCountry);
nextButton.addEventListener("click", goToNextCountry);
newRoundButton.addEventListener("click", () => {
  if (gameStarted) resetGame();
});
zoomInButton.addEventListener("click", () => zoomAt(0.7));
zoomOutButton.addEventListener("click", () => zoomAt(1.35));
zoomResetButton.addEventListener("click", () => resetZoom({ animate: true }));
terrainToggleButton.addEventListener("click", () => {
  const hidden = terrainLayer.classList.toggle("is-hidden");
  terrainToggleButton.setAttribute("aria-pressed", String(!hidden));
});

map.addEventListener("pointerdown", (event) => {
  map.setPointerCapture(event.pointerId);
  map.classList.add("dragging");
  drag = { start: pointerPoint(event), view: { ...view } };
});

map.addEventListener("pointermove", (event) => {
  if (!drag) return;
  const point = pointerPoint(event);
  view = {
    ...drag.view,
    x: drag.view.x + (drag.start.x - point.x),
    y: drag.view.y + (drag.start.y - point.y),
  };
  applyView();
});

map.addEventListener("pointerup", () => {
  drag = null;
  map.classList.remove("dragging");
});

map.addEventListener(
  "wheel",
  (event) => {
    event.preventDefault();
    const point = pointerPoint(event);
    zoomAt(event.deltaY < 0 ? 0.86 : 1.16, point.x, point.y);
  },
  { passive: false },
);

renderMap();
newRoundButton.disabled = true;
fitLayout();
window.addEventListener("load", fitLayout);
window.addEventListener("resize", fitLayout);
window.addEventListener("orientationchange", fitLayout);
document.addEventListener("fullscreenchange", fitLayout);
window.visualViewport?.addEventListener("resize", fitLayout);
