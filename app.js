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
const continentSelect = document.querySelector("#continentSelect");
const labelSizeSelect = document.querySelector("#labelSizeSelect");
const displayLanguageSelect = document.querySelector("#displayLanguageSelect");
const gameSurfaces = document.querySelectorAll(".game-surface");
const appShell = document.querySelector(".app-shell");
const mapPanel = document.querySelector(".map-panel");
const scoreboard = document.querySelector(".scoreboard");
const topbar = document.querySelector(".topbar");
const LANGUAGE_STORAGE_KEY = "country-map-language-mode";

const CONTINENT_NAMES = {
  world: "World",
  africa: "Africa",
  asia: "Asia",
  europe: "Europe",
  "north-america": "North America",
  "south-america": "South America",
  oceania: "Oceania",
};

const COUNTRY_CONTINENTS = {
  afghanistan: "asia",
  albania: "europe",
  algeria: "africa",
  angola: "africa",
  argentina: "south-america",
  armenia: "asia",
  australia: "oceania",
  austria: "europe",
  azerbaijan: "asia",
  bangladesh: "asia",
  belarus: "europe",
  belgium: "europe",
  belize: "north-america",
  benin: "africa",
  bhutan: "asia",
  bolivia: "south-america",
  "bosnia-and-herzegovina": "europe",
  botswana: "africa",
  brazil: "south-america",
  brunei: "asia",
  bulgaria: "europe",
  "burkina-faso": "africa",
  burundi: "africa",
  cambodia: "asia",
  cameroon: "africa",
  canada: "north-america",
  "central-african-republic": "africa",
  chad: "africa",
  chile: "south-america",
  colombia: "south-america",
  "costa-rica": "north-america",
  croatia: "europe",
  cuba: "north-america",
  cyprus: "europe",
  czechia: "europe",
  "democratic-republic-of-the-congo": "africa",
  denmark: "europe",
  djibouti: "africa",
  "dominican-republic": "north-america",
  "east-timor": "asia",
  ecuador: "south-america",
  egypt: "africa",
  "el-salvador": "north-america",
  "equatorial-guinea": "africa",
  eritrea: "africa",
  estonia: "europe",
  eswatini: "africa",
  ethiopia: "africa",
  fiji: "oceania",
  finland: "europe",
  france: "europe",
  gabon: "africa",
  georgia: "asia",
  germany: "europe",
  ghana: "africa",
  greece: "europe",
  greenland: "north-america",
  guatemala: "north-america",
  guinea: "africa",
  "guinea-bissau": "africa",
  guyana: "south-america",
  haiti: "north-america",
  honduras: "north-america",
  hungary: "europe",
  iceland: "europe",
  india: "asia",
  indonesia: "asia",
  iran: "asia",
  iraq: "asia",
  ireland: "europe",
  italy: "europe",
  "ivory-coast": "africa",
  jamaica: "north-america",
  japan: "asia",
  jordan: "asia",
  kazakhstan: "asia",
  kenya: "africa",
  kuwait: "asia",
  kyrgyzstan: "asia",
  laos: "asia",
  latvia: "europe",
  lebanon: "asia",
  lesotho: "africa",
  liberia: "africa",
  libya: "africa",
  lithuania: "europe",
  luxembourg: "europe",
  madagascar: "africa",
  malawi: "africa",
  malaysia: "asia",
  mali: "africa",
  mauritania: "africa",
  mexico: "north-america",
  moldova: "europe",
  mongolia: "asia",
  montenegro: "europe",
  morocco: "africa",
  mozambique: "africa",
  myanmar: "asia",
  namibia: "africa",
  nepal: "asia",
  netherlands: "europe",
  "new-zealand": "oceania",
  nicaragua: "north-america",
  niger: "africa",
  nigeria: "africa",
  "north-korea": "asia",
  "north-macedonia": "europe",
  norway: "europe",
  oman: "asia",
  pakistan: "asia",
  panama: "north-america",
  "papua-new-guinea": "oceania",
  paraguay: "south-america",
  "people-s-republic-of-china": "asia",
  peru: "south-america",
  philippines: "asia",
  poland: "europe",
  portugal: "europe",
  qatar: "asia",
  "republic-of-the-congo": "africa",
  romania: "europe",
  russia: "europe",
  rwanda: "africa",
  "saudi-arabia": "asia",
  senegal: "africa",
  serbia: "europe",
  "sierra-leone": "africa",
  slovakia: "europe",
  slovenia: "europe",
  "solomon-islands": "oceania",
  somalia: "africa",
  somaliland: "africa",
  "south-africa": "africa",
  "south-korea": "asia",
  "south-sudan": "africa",
  spain: "europe",
  "sri-lanka": "asia",
  sudan: "africa",
  suriname: "south-america",
  sweden: "europe",
  switzerland: "europe",
  syria: "asia",
  taiwan: "asia",
  tajikistan: "asia",
  tanzania: "africa",
  thailand: "asia",
  "the-bahamas": "north-america",
  "the-gambia": "africa",
  togo: "africa",
  "trinidad-and-tobago": "north-america",
  tunisia: "africa",
  turkey: "asia",
  "turkish-republic-of-northern-cyprus": "europe",
  turkmenistan: "asia",
  uganda: "africa",
  ukraine: "europe",
  "united-arab-emirates": "asia",
  "united-kingdom": "europe",
  "united-states": "north-america",
  uruguay: "south-america",
  uzbekistan: "asia",
  vanuatu: "oceania",
  venezuela: "south-america",
  vietnam: "asia",
  yemen: "asia",
  zambia: "africa",
  zimbabwe: "africa",
};

const LABEL_ABBREVIATIONS = {
  "bosnia-and-herzegovina": "Bosnia & Herz.",
  "central-african-republic": "Central African Rep.",
  "democratic-republic-of-the-congo": "Dem. Rep. Congo",
  "dominican-republic": "Dominican Rep.",
  "equatorial-guinea": "Eq. Guinea",
  "guinea-bissau": "Guinea-Bissau",
  "north-macedonia": "N. Macedonia",
  "papua-new-guinea": "Papua N.G.",
  "people-s-republic-of-china": "China",
  "republic-of-the-congo": "Congo",
  "saudi-arabia": "Saudi Arabia",
  "sierra-leone": "Sierra Leone",
  "solomon-islands": "Solomon Is.",
  "south-africa": "South Africa",
  "south-korea": "South Korea",
  "south-sudan": "South Sudan",
  "trinidad-and-tobago": "Trinidad & Tobago",
  "turkish-republic-of-northern-cyprus": "N. Cyprus",
  "united-arab-emirates": "U.A.E.",
  "united-kingdom": "United Kingdom",
  "united-states": "United States",
};

const LEADER_LABEL_COUNTRIES = new Set([
  "bahrain",
  "brunei",
  "kuwait",
  "lebanon",
  "luxembourg",
  "malta",
  "qatar",
  "singapore",
]);

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
let labelSize = "small";
let languageMode = "en-zh";
let selectedContinent = "world";
let activeCountries = data.countries;
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

function formatCountryName(country) {
  const chineseName = country.chineseName;
  if (languageMode === "en" || !chineseName) return country.name;
  return `${country.name} (${chineseName})`;
}

function setLanguageMode(mode, { save = true } = {}) {
  languageMode = mode === "en" ? "en" : "en-zh";
  displayLanguageSelect.value = languageMode;
  console.log("Language mode:", languageMode);

  if (!save) return;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, languageMode);
  } catch (error) {
    console.warn("Language preference could not be saved.", error);
  }
}

function restoreLanguageMode() {
  let savedMode = "en-zh";
  try {
    savedMode = localStorage.getItem(LANGUAGE_STORAGE_KEY) || savedMode;
  } catch (error) {
    console.warn("Language preference could not be restored.", error);
  }
  setLanguageMode(savedMode, { save: false });
}

function countriesForContinent(continent) {
  if (continent === "world") return data.countries;
  return data.countries.filter((country) => COUNTRY_CONTINENTS[country.id] === continent);
}

function renderMap() {
  map.setAttribute("viewBox", `${view.x} ${view.y} ${view.width} ${view.height}`);
  map.setAttribute("preserveAspectRatio", "xMidYMid meet");
  const terrain = document.createElementNS("http://www.w3.org/2000/svg", "image");
  const terrainSource = "./assets/terrain-world.png";
  terrain.addEventListener("load", () => {
    console.log("terrain image loaded");
  });
  terrain.addEventListener("error", () => {
    console.error(`terrain image failed to load: ${terrainSource}`);
  });
  terrain.setAttribute("href", terrainSource);
  terrain.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", terrainSource);
  terrain.setAttribute("x", "0");
  terrain.setAttribute("y", "0");
  terrain.setAttribute("width", data.width);
  terrain.setAttribute("height", data.height);
  terrain.setAttribute("preserveAspectRatio", "xMidYMid meet");
  terrain.setAttribute("class", "terrain-layer terrain-relief");
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
  document.querySelector("#completedCount").textContent = `${completedIds.size} / ${activeCountries.length}`;
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
  if (!country) {
    finishSelectedContinent();
    return;
  }
  current = country;
  clearTimeout(advanceTimer);
  waitingForNext = false;
  guessInput.value = "";
  hintList.innerHTML = "";
  guessForm.scrollTop = 0;
  setFeedback("Find the highlighted country.");
  setAnswerControlsEnabled(true);
  nextButton.hidden = true;

  pathById.forEach((path) => {
    const isInSelectedSet = activeCountries.some((item) => item.id === path.dataset.id);
    path.classList.toggle("outside-region", !isInSelectedSet);
    path.classList.toggle("active", path.dataset.id === country.id);
    path.classList.toggle("dimmed", isInSelectedSet && path.dataset.id !== country.id);
  });

  const activePath = pathById.get(country.id);
  if (activePath) countryLayer.append(activePath);
  fitLayout();
  zoomToCountry(country, true);
}

function nextCountry() {
  if (queue.length === 0) {
    const remaining = activeCountries.filter((country) => !completedIds.has(country.id));
    if (remaining.length === 0) {
      finishSelectedContinent();
      return;
    }
    queue = shuffle(remaining);
    setFeedback("Full pass complete. Remaining countries reshuffled.");
  }
  setCurrent(queue.pop());
}

function resetGame() {
  selectedContinent = continentSelect.value || "world";
  activeCountries = countriesForContinent(selectedContinent);
  queue = shuffle(activeCountries);
  completedIds = new Set();
  score.correct = 0;
  score.wrong = 0;
  score.skipped = 0;
  score.streak = 0;
  labelLayer.innerHTML = "";
  waitingForNext = false;
  nextButton.hidden = true;
  setAnswerControlsEnabled(true);
  pathById.forEach((path) => {
    const isInSelectedSet = activeCountries.some((country) => country.id === path.dataset.id);
    path.classList.toggle("outside-region", !isInSelectedSet);
    path.classList.remove("completed", "active", "dimmed");
  });
  updateScores();
  resetZoom();
  nextCountry();
}

function startGame() {
  gameMode = document.querySelector('input[name="gameMode"]:checked')?.value || "label";
  labelSize = labelSizeSelect.value || "small";
  setLanguageMode(displayLanguageSelect.value);
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
  pathById.forEach((path) => path.classList.remove("completed", "active", "dimmed", "outside-region"));
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
    if (completedIds.size >= activeCountries.length) {
      finishSelectedContinent(current);
      return;
    }
    setFeedback(`Correct!\n${formatCountryName(current)}`, "good");
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
  if (completedIds.has(country.id)) return;
  completedIds.add(country.id);

  const path = pathById.get(country.id);
  if (!path) return;
  path.classList.add("completed");
  if (gameMode !== "label") return;
  addCountryLabel(country, path);
}

function addCountryLabel(country, path) {
  if (labelSize === "off") return;
  const box = pathBounds(path);
  const center = {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const fontSize = labelSize === "medium" ? (isMobile ? 8 : 11) : isMobile ? 7 : 9;
  const labelText = labelName(country, box);
  const useLeader = shouldUseLeaderLabel(country, box);
  const labelPoint = useLeader ? leaderLabelPoint(center, fontSize) : center;

  label.setAttribute("class", "country-label");
  label.setAttribute("x", labelPoint.x.toFixed(1));
  label.setAttribute("y", labelPoint.y.toFixed(1));
  label.setAttribute("font-size", fontSize.toFixed(1));
  label.textContent = labelText;

  if (useLeader) {
    const leader = document.createElementNS("http://www.w3.org/2000/svg", "line");
    leader.setAttribute("class", "country-label-leader");
    leader.setAttribute("x1", center.x.toFixed(1));
    leader.setAttribute("y1", center.y.toFixed(1));
    leader.setAttribute("x2", labelPoint.x.toFixed(1));
    leader.setAttribute("y2", labelPoint.y.toFixed(1));
    labelLayer.append(leader);
  }

  labelLayer.append(label);
}

function labelName(country, box) {
  if (LABEL_ABBREVIATIONS[country.id]) return LABEL_ABBREVIATIONS[country.id];
  if (country.name.length > 18 && box.width < 55) return country.abbrev || country.name;
  return country.name;
}

function shouldUseLeaderLabel(country, box) {
  return LEADER_LABEL_COUNTRIES.has(country.id) || box.width < 14 || box.height < 9 || box.width * box.height < 90;
}

function leaderLabelPoint(center, fontSize) {
  const offsetX = center.x > data.width * 0.78 ? -fontSize * 3 : fontSize * 3;
  const offsetY = center.y > data.height * 0.72 ? -fontSize * 1.5 : -fontSize * 1.2;
  return {
    x: Math.max(fontSize * 2, Math.min(data.width - fontSize * 2, center.x + offsetX)),
    y: Math.max(fontSize * 2, Math.min(data.height - fontSize * 2, center.y + offsetY)),
  };
}

function finishSelectedContinent(completedCountry = null) {
  current = null;
  clearTimeout(advanceTimer);
  waitingForNext = true;
  hintList.innerHTML = "";
  nextButton.hidden = true;
  setAnswerControlsEnabled(false);
  const continentName = CONTINENT_NAMES[selectedContinent] || "World";
  const completedAnswer = completedCountry ? `Correct!\n${formatCountryName(completedCountry)}\n\n` : "";
  setFeedback(`${completedAnswer}Congratulations! You completed all countries in ${continentName}.`, "good");
  updateScores();
}

function updateHints() {
  if (waitingForNext) return;
  const typed = normalize(guessInput.value);
  hintList.innerHTML = "";
  if (typed.length < 1) return;

  const matches = activeCountries
    .filter((country) => normalize(country.name).startsWith(typed))
    .slice(0, 8);

  matches.forEach((country) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "hint";
    button.textContent = formatCountryName(country);
    button.setAttribute("role", "option");
    button.addEventListener("click", () => {
      guessInput.value = country.name;
      updateHints();
    });
    hintList.append(button);
  });
}

function skipCountry() {
  if (waitingForNext) return;
  score.skipped += 1;
  score.streak = 0;
  updateScores();
  setFeedback(`Skipped: ${formatCountryName(current)}`, "bad");
  clearTimeout(advanceTimer);
  advanceTimer = setTimeout(nextCountry, 750);
}

function revealCountry() {
  if (waitingForNext) return;
  score.wrong += 1;
  score.streak = 0;
  updateScores();
  guessInput.value = current.name;
  setFeedback(`Answer:\n${formatCountryName(current)}`, "bad");
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
  if (window.matchMedia("(max-width: 700px)").matches) {
    appShell.style.setProperty("--map-height", `${Math.floor(viewportHeight * 0.35)}px`);
    return;
  }
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

displayLanguageSelect.addEventListener("change", () => {
  setLanguageMode(displayLanguageSelect.value);
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

restoreLanguageMode();
renderMap();
newRoundButton.disabled = true;
fitLayout();
window.addEventListener("load", fitLayout);
window.addEventListener("resize", fitLayout);
window.addEventListener("orientationchange", fitLayout);
document.addEventListener("fullscreenchange", fitLayout);
window.visualViewport?.addEventListener("resize", fitLayout);
