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
  lives: 3,
  playerTile: { ...characterConfig.player.startTile },
  collectedTiles: new Set()
};

let gameState = createInitialGameState();

const shell = document.querySelector(".arcade-shell");
const board = document.querySelector("#board");
const statusLabel = document.querySelector("#game-status");
const scoreLabel = document.querySelector("#score");
const livesLabel = document.querySelector("#lives");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const playerCard = document.querySelector("#player-card");
const enemyRoster = document.querySelector("#enemy-roster");

const mazeMap = [
  "###############",
  "#o...........o#",
  "#.###.###.###.#",
  "#.............#",
  "#.###.#.#.###.#",
  "#.....#.#.....#",
  "#####.....#####",
  "#####.....#####",
  "#####.....#####",
  "#.....#.#.....#",
  "#.###.#.#.###.#",
  "#......P......#",
  "#.###.###.###.#",
  "#o...........o#",
  "###############"
];

const totalCollectibles = countCollectibles();
const movementKeys = {
  ArrowUp: { x: 0, y: -1 },
  KeyW: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  KeyS: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  KeyA: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  KeyD: { x: 1, y: 0 }
};

function createInitialGameState() {
  return {
    ...initialGameState,
    playerTile: { ...characterConfig.player.startTile },
    collectedTiles: new Set()
  };
}

function renderBoard() {
  board.replaceChildren();

  mazeMap.forEach((row, y) => {
    [...row].forEach((cell, x) => {
      const tile = document.createElement("span");
      const tileKey = getTileKey({ x, y });
      tile.className = getTileClass(cell, tileKey);

      if (gameState.playerTile.x === x && gameState.playerTile.y === y) {
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

function getTileClass(cell, tileKey) {
  if (cell === "#") return "tile wall";
  if (gameState.collectedTiles.has(tileKey)) return "tile";
  if (cell === "o") return "tile power";
  if (cell === ".") return "tile dot";
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
  collectCurrentTile();
  renderBoard();
  renderState();
  board.focus();
}

function restartRound() {
  gameState = createInitialGameState();
  gameState.status = "reset";
  renderBoard();
  renderState();
  board.focus();
}

function renderState() {
  scoreLabel.textContent = gameState.score.toString().padStart(4, "0");
  livesLabel.textContent = String(gameState.lives);
  statusLabel.textContent = getStatusText(gameState.status);
  shell.classList.toggle("is-live", gameState.status === "live");
  shell.classList.toggle("is-reset", gameState.status === "reset");
  shell.classList.toggle("is-clear", gameState.status === "clear");
}

function getStatusText(status) {
  if (status === "live") return "Round Live";
  if (status === "reset") return "Reset";
  if (status === "clear") return "Maze Clear";
  return "Ready";
}

function handleKeyDown(event) {
  const direction = movementKeys[event.code];
  if (!direction || gameState.status !== "live") return;

  event.preventDefault();
  movePlayer(direction);
}

function movePlayer(direction) {
  const nextTile = {
    x: gameState.playerTile.x + direction.x,
    y: gameState.playerTile.y + direction.y
  };

  if (isWall(nextTile)) return;

  gameState.playerTile = nextTile;
  collectCurrentTile();
  renderBoard();
  renderState();
}

function collectCurrentTile() {
  const cell = getCell(gameState.playerTile);
  const tileKey = getTileKey(gameState.playerTile);
  if (gameState.collectedTiles.has(tileKey)) return;

  if (cell === "." || cell === "o") {
    gameState.collectedTiles.add(tileKey);
    gameState.score += cell === "o" ? 50 : 10;
  }

  if (gameState.collectedTiles.size === totalCollectibles) {
    gameState.status = "clear";
  }
}

function isWall(tile) {
  return getCell(tile) === "#";
}

function getCell(tile) {
  return mazeMap[tile.y]?.[tile.x] ?? "#";
}

function getTileKey(tile) {
  return `${tile.x},${tile.y}`;
}

function countCollectibles() {
  return mazeMap.reduce((total, row) => {
    return total + [...row].filter((cell) => cell === "." || cell === "o").length;
  }, 0);
}

startButton.addEventListener("click", startRound);
restartButton.addEventListener("click", restartRound);
document.addEventListener("keydown", handleKeyDown);

if (typeof window !== "undefined") {
  window.pixelPacDebug = {
    getState: () => ({
      status: gameState.status,
      score: gameState.score,
      lives: gameState.lives,
      playerTile: { ...gameState.playerTile },
      collectedCount: gameState.collectedTiles.size,
      totalCollectibles
    }),
    movePlayer,
    restartRound,
    startRound
  };
}

renderBoard();
renderCharacters();
renderState();
