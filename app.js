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

const COUNTRY_NAMES_ZH = {
  afghanistan: "阿富汗",
  albania: "阿尔巴尼亚",
  algeria: "阿尔及利亚",
  angola: "安哥拉",
  argentina: "阿根廷",
  armenia: "亚美尼亚",
  australia: "澳大利亚",
  austria: "奥地利",
  azerbaijan: "阿塞拜疆",
  bangladesh: "孟加拉国",
  belarus: "白俄罗斯",
  belgium: "比利时",
  belize: "伯利兹",
  benin: "贝宁",
  bhutan: "不丹",
  bolivia: "玻利维亚",
  "bosnia-and-herzegovina": "波斯尼亚和黑塞哥维那",
  botswana: "博茨瓦纳",
  brazil: "巴西",
  brunei: "文莱",
  bulgaria: "保加利亚",
  "burkina-faso": "布基纳法索",
  burundi: "布隆迪",
  cambodia: "柬埔寨",
  cameroon: "喀麦隆",
  canada: "加拿大",
  "central-african-republic": "中非共和国",
  chad: "乍得",
  chile: "智利",
  colombia: "哥伦比亚",
  "costa-rica": "哥斯达黎加",
  croatia: "克罗地亚",
  cuba: "古巴",
  cyprus: "塞浦路斯",
  czechia: "捷克",
  "democratic-republic-of-the-congo": "刚果民主共和国",
  denmark: "丹麦",
  djibouti: "吉布提",
  "dominican-republic": "多米尼加共和国",
  "east-timor": "东帝汶",
  ecuador: "厄瓜多尔",
  egypt: "埃及",
  "el-salvador": "萨尔瓦多",
  "equatorial-guinea": "赤道几内亚",
  eritrea: "厄立特里亚",
  estonia: "爱沙尼亚",
  eswatini: "斯威士兰",
  ethiopia: "埃塞俄比亚",
  fiji: "斐济",
  finland: "芬兰",
  france: "法国",
  gabon: "加蓬",
  georgia: "格鲁吉亚",
  germany: "德国",
  ghana: "加纳",
  greece: "希腊",
  greenland: "格陵兰",
  guatemala: "危地马拉",
  guinea: "几内亚",
  "guinea-bissau": "几内亚比绍",
  guyana: "圭亚那",
  haiti: "海地",
  honduras: "洪都拉斯",
  hungary: "匈牙利",
  iceland: "冰岛",
  india: "印度",
  indonesia: "印度尼西亚",
  iran: "伊朗",
  iraq: "伊拉克",
  ireland: "爱尔兰",
  italy: "意大利",
  "ivory-coast": "科特迪瓦",
  jamaica: "牙买加",
  japan: "日本",
  jordan: "约旦",
  kazakhstan: "哈萨克斯坦",
  kenya: "肯尼亚",
  kuwait: "科威特",
  kyrgyzstan: "吉尔吉斯斯坦",
  laos: "老挝",
  latvia: "拉脱维亚",
  lebanon: "黎巴嫩",
  lesotho: "莱索托",
  liberia: "利比里亚",
  libya: "利比亚",
  lithuania: "立陶宛",
  luxembourg: "卢森堡",
  madagascar: "马达加斯加",
  malawi: "马拉维",
  malaysia: "马来西亚",
  mali: "马里",
  mauritania: "毛里塔尼亚",
  mexico: "墨西哥",
  moldova: "摩尔多瓦",
  mongolia: "蒙古",
  montenegro: "黑山",
  morocco: "摩洛哥",
  mozambique: "莫桑比克",
  myanmar: "缅甸",
  namibia: "纳米比亚",
  nepal: "尼泊尔",
  netherlands: "荷兰",
  "new-zealand": "新西兰",
  nicaragua: "尼加拉瓜",
  niger: "尼日尔",
  nigeria: "尼日利亚",
  "north-korea": "朝鲜",
  "north-macedonia": "北马其顿",
  norway: "挪威",
  oman: "阿曼",
  pakistan: "巴基斯坦",
  panama: "巴拿马",
  "papua-new-guinea": "巴布亚新几内亚",
  paraguay: "巴拉圭",
  "people-s-republic-of-china": "中国",
  peru: "秘鲁",
  philippines: "菲律宾",
  poland: "波兰",
  portugal: "葡萄牙",
  qatar: "卡塔尔",
  "republic-of-the-congo": "刚果共和国",
  romania: "罗马尼亚",
  russia: "俄罗斯",
  rwanda: "卢旺达",
  "saudi-arabia": "沙特阿拉伯",
  senegal: "塞内加尔",
  serbia: "塞尔维亚",
  "sierra-leone": "塞拉利昂",
  slovakia: "斯洛伐克",
  slovenia: "斯洛文尼亚",
  "solomon-islands": "所罗门群岛",
  somalia: "索马里",
  somaliland: "索马里兰",
  "south-africa": "南非",
  "south-korea": "韩国",
  "south-sudan": "南苏丹",
  spain: "西班牙",
  "sri-lanka": "斯里兰卡",
  sudan: "苏丹",
  suriname: "苏里南",
  sweden: "瑞典",
  switzerland: "瑞士",
  syria: "叙利亚",
  taiwan: "台湾",
  tajikistan: "塔吉克斯坦",
  tanzania: "坦桑尼亚",
  thailand: "泰国",
  "the-bahamas": "巴哈马",
  "the-gambia": "冈比亚",
  togo: "多哥",
  "trinidad-and-tobago": "特立尼达和多巴哥",
  tunisia: "突尼斯",
  turkey: "土耳其",
  "turkish-republic-of-northern-cyprus": "北塞浦路斯土耳其共和国",
  turkmenistan: "土库曼斯坦",
  uganda: "乌干达",
  ukraine: "乌克兰",
  "united-arab-emirates": "阿拉伯联合酋长国",
  "united-kingdom": "英国",
  "united-states": "美国",
  uruguay: "乌拉圭",
  uzbekistan: "乌兹别克斯坦",
  vanuatu: "瓦努阿图",
  venezuela: "委内瑞拉",
  vietnam: "越南",
  yemen: "也门",
  zambia: "赞比亚",
  zimbabwe: "津巴布韦",
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
let displayLanguage = "bilingual";
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

function displayCountryName(country) {
  const chineseName = COUNTRY_NAMES_ZH[country.id];
  if (displayLanguage !== "bilingual" || !chineseName) return country.name;
  return `${country.name} (${chineseName})`;
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
  displayLanguage = displayLanguageSelect.value || "bilingual";
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
      finishSelectedContinent();
      return;
    }
    setFeedback(`Correct!\n${displayCountryName(current)}`, "good");
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

function finishSelectedContinent() {
  current = null;
  clearTimeout(advanceTimer);
  waitingForNext = true;
  hintList.innerHTML = "";
  nextButton.hidden = true;
  setAnswerControlsEnabled(false);
  const continentName = CONTINENT_NAMES[selectedContinent] || "World";
  setFeedback(`Congratulations! You completed all countries in ${continentName}.`, "good");
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
    button.textContent = displayCountryName(country);
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
  setFeedback(`Answer:\n${displayCountryName(current)}`, "bad");
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
