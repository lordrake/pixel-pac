const characterConfig = {
  player: {
    id: "pixel-pac",
    name: "Pixel Pac",
    role: "Player",
    color: "#ffe44d",
    startTile: { x: 7, y: 11 }
  },
  enemies: [
    { id: "blink", name: "Blink", role: "Chaser", color: "#ff4d4d", startTile: { x: 7, y: 5 } },
    { id: "byte", name: "Byte", role: "Roamer", color: "#4df3ff", startTile: { x: 6, y: 7 } },
    { id: "glitch", name: "Glitch", role: "Trickster", color: "#ff7abf", startTile: { x: 8, y: 7 } },
    { id: "zap", name: "Zap", role: "Ambusher", color: "#ff9d3d", startTile: { x: 7, y: 8 } }
  ]
};

const initialGameState = {
  status: "ready",
  score: 0,
  lives: 3
};

let gameState = { ...initialGameState };

const shell = document.querySelector(".arcade-shell");
const board = document.querySelector("#board");
const statusLabel = document.querySelector("#game-status");
const scoreLabel = document.querySelector("#score");
const livesLabel = document.querySelector("#lives");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const playerCard = document.querySelector("#player-card");
const enemyRoster = document.querySelector("#enemy-roster");

const shellMap = [
  "###############",
  "#o...........o#",
  "#.###.###.###.#",
  "#.............#",
  "#.###.#.#.###.#",
  "#.....#.#.....#",
  "#####.....#####",
  "....#.....#....",
  "#####.....#####",
  "#.....#.#.....#",
  "#.###.#.#.###.#",
  "#......P......#",
  "#.###.###.###.#",
  "#o...........o#",
  "###############"
];

function renderBoard() {
  board.replaceChildren();

  shellMap.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      const tile = document.createElement("span");
      tile.className = getTileClass(cell);

      if (cell === "P") {
        tile.appendChild(createSprite(characterConfig.player, "player-sprite"));
      }

      const enemy = characterConfig.enemies.find((item) => item.startTile.x === x && item.startTile.y === y);
      if (enemy) {
        tile.appendChild(createSprite(enemy));
      }

      board.appendChild(tile);
    });
  });
}

function getTileClass(cell) {
  if (cell === "#") return "tile wall";
  if (cell === "o") return "tile power";
  if (cell === "." || cell === "P") return "tile dot";
  return "tile";
}

function createSprite(character, extraClass = "") {
  const sprite = document.createElement("span");
  sprite.className = `sprite ${extraClass}`.trim();
  sprite.style.setProperty("--sprite-color", character.color);
  return sprite;
}

function renderCharacters() {
  playerCard.replaceChildren(createCharacterBadgeContent(characterConfig.player));
  enemyRoster.replaceChildren(...characterConfig.enemies.map(createEnemyCard));
}

function createEnemyCard(character) {
  const card = document.createElement("div");
  card.className = "enemy-card";
  card.append(createCharacterBadgeContent(character));
  return card;
}

function createCharacterBadgeContent(character) {
  const fragment = document.createDocumentFragment();
  const swatch = document.createElement("span");
  const text = document.createElement("span");
  const name = document.createElement("span");
  const role = document.createElement("span");

  swatch.className = "swatch";
  swatch.style.setProperty("--sprite-color", character.color);
  text.className = "character-text";
  name.className = "name";
  role.className = "role";

  name.textContent = character.name;
  role.textContent = character.role;

  text.append(name, role);
  fragment.append(swatch, text);
  return fragment;
}

function startRound() {
  gameState = {
    ...gameState,
    status: "live"
  };
  renderState();
}

function restartRound() {
  gameState = {
    ...initialGameState,
    status: "reset"
  };
  renderState();
}

function renderState() {
  scoreLabel.textContent = gameState.score.toString().padStart(4, "0");
  livesLabel.textContent = String(gameState.lives);
  statusLabel.textContent = getStatusText(gameState.status);
  shell.classList.toggle("is-live", gameState.status === "live");
  shell.classList.toggle("is-reset", gameState.status === "reset");
}

function getStatusText(status) {
  if (status === "live") return "Round Live";
  if (status === "reset") return "Reset";
  return "Ready";
}

startButton.addEventListener("click", startRound);
restartButton.addEventListener("click", restartRound);

renderBoard();
renderCharacters();
renderState();
