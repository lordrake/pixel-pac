const characterConfig = {
  player: {
    id: "pixel-pac",
    name: "Pixel Pac",
    role: "Player",
    color: "#ffe44d",
    startTile: { x: 7, y: 11 }
  },
  enemies: [
    { id: "blink", name: "Blink", role: "Chaser", behavior: "chase", color: "#ff4d4d", startTile: { x: 7, y: 5 } },
    { id: "byte", name: "Byte", role: "Roamer", behavior: "roam", color: "#4df3ff", startTile: { x: 6, y: 7 } },
    { id: "glitch", name: "Glitch", role: "Trickster", behavior: "roam", color: "#ff7abf", startTile: { x: 8, y: 7 } },
    { id: "zap", name: "Zap", role: "Ambusher", behavior: "chase", color: "#ff9d3d", startTile: { x: 7, y: 8 } }
  ]
};

const initialGameState = {
  status: "ready",
  score: 0,
  lives: 3,
  playerTile: { ...characterConfig.player.startTile },
  collectedTiles: new Set(),
  enemies: [],
  enemyStep: 0,
  hitBy: null,
  hitCount: 0
};

let gameState = createInitialGameState();
let enemyTimer = null;

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
const enemyStepMs = 650;
const directions = [
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 }
];
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
    collectedTiles: new Set(),
    enemies: createInitialEnemies(),
    enemyStep: 0,
    hitBy: null,
    hitCount: 0
  };
}

function createInitialEnemies() {
  return characterConfig.enemies.map((enemy, index) => {
    return {
      id: enemy.id,
      tile: { ...enemy.startTile },
      mode: enemy.behavior,
      roamOffset: index
    };
  });
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

      const enemy = gameState.enemies.find((item) => item.tile.x === x && item.tile.y === y);
      if (enemy) {
        const enemyConfig = getEnemyConfig(enemy.id);
        tile.appendChild(createSprite(enemyConfig, `enemy-sprite mode-${enemy.mode}`));
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
  enemyRoster.replaceChildren(...gameState.enemies.map(createEnemyCard));
}

function createEnemyCard(enemyState) {
  const character = getEnemyConfig(enemyState.id);
  const card = document.createElement("div");
  card.className = `enemy-card mode-${enemyState.mode}`;
  card.append(createCharacterBadgeContent(character, enemyState.mode));
  return card;
}

function createCharacterBadgeContent(character, mode = "") {
  const fragment = document.createDocumentFragment();
  const swatch = document.createElement("span");
  const text = document.createElement("span");
  const name = document.createElement("span");
  const role = document.createElement("span");
  const modeLabel = document.createElement("span");

  swatch.className = "swatch";
  swatch.style.setProperty("--sprite-color", character.color);
  text.className = "character-text";
  name.className = "name";
  role.className = "role";
  modeLabel.className = "mode-label";

  name.textContent = character.name;
  role.textContent = character.role;
  modeLabel.textContent = mode;

  text.append(name, role);
  if (mode) text.append(modeLabel);
  fragment.append(swatch, text);
  return fragment;
}

function startRound() {
  if (gameState.status === "clear" || gameState.status === "hit") {
    gameState = createInitialGameState();
  }

  gameState = {
    ...gameState,
    status: "live"
  };
  collectCurrentTile();
  checkPlayerEnemyCollision();
  renderBoard();
  renderCharacters();
  renderState();
  startEnemyLoop();
  board.focus();
}

function restartRound() {
  stopEnemyLoop();
  gameState = createInitialGameState();
  gameState.status = "reset";
  renderBoard();
  renderCharacters();
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
  shell.classList.toggle("is-hit", gameState.status === "hit");
}

function getStatusText(status) {
  if (status === "live") return "Round Live";
  if (status === "reset") return "Reset";
  if (status === "clear") return "Maze Clear";
  if (status === "hit") return "Player Hit";
  return "Ready";
}

function handleKeyDown(event) {
  const direction = movementKeys[event.code];
  if (!direction || gameState.status !== "live") return;

  event.preventDefault();
  movePlayer(direction);
}

function movePlayer(direction) {
  if (gameState.status !== "live") return;

  const nextTile = {
    x: gameState.playerTile.x + direction.x,
    y: gameState.playerTile.y + direction.y
  };

  if (isWall(nextTile)) return;

  gameState.playerTile = nextTile;
  collectCurrentTile();
  if (checkPlayerEnemyCollision()) return;
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
    stopEnemyLoop();
  }
}

function startEnemyLoop() {
  stopEnemyLoop();
  enemyTimer = setInterval(tickEnemies, enemyStepMs);
}

function stopEnemyLoop() {
  if (!enemyTimer) return;
  clearInterval(enemyTimer);
  enemyTimer = null;
}

function tickEnemies() {
  if (gameState.status !== "live") return;

  gameState.enemyStep += 1;
  gameState.enemies = gameState.enemies.map(moveEnemy);

  if (checkPlayerEnemyCollision()) return;

  renderBoard();
  renderCharacters();
  renderState();
}

function moveEnemy(enemy) {
  const character = getEnemyConfig(enemy.id);
  const mode = character.behavior;
  const nextTile = mode === "chase" ? chooseChaseTile(enemy.tile) : chooseRoamTile(enemy);

  return {
    ...enemy,
    mode,
    tile: nextTile
  };
}

function chooseChaseTile(tile) {
  const legalTiles = getLegalNeighbors(tile);
  if (legalTiles.length === 0) return tile;

  return legalTiles.reduce((best, candidate) => {
    const bestDistance = getDistance(best, gameState.playerTile);
    const candidateDistance = getDistance(candidate, gameState.playerTile);
    return candidateDistance < bestDistance ? candidate : best;
  });
}

function chooseRoamTile(enemy) {
  const legalTiles = getLegalNeighbors(enemy.tile);
  if (legalTiles.length === 0) return enemy.tile;

  const index = (gameState.enemyStep + enemy.roamOffset) % legalTiles.length;
  return legalTiles[index];
}

function getLegalNeighbors(tile) {
  return directions
    .map((direction) => {
      return {
        x: tile.x + direction.x,
        y: tile.y + direction.y
      };
    })
    .filter((candidate) => !isWall(candidate));
}

function checkPlayerEnemyCollision() {
  const enemy = gameState.enemies.find((item) => {
    return item.tile.x === gameState.playerTile.x && item.tile.y === gameState.playerTile.y;
  });

  if (!enemy) return false;

  handlePlayerHit(enemy);
  return true;
}

function handlePlayerHit(enemy) {
  stopEnemyLoop();
  gameState = {
    ...gameState,
    status: "hit",
    hitBy: enemy.id,
    hitCount: gameState.hitCount + 1
  };
  renderBoard();
  renderCharacters();
  renderState();
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

function getDistance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getEnemyConfig(id) {
  return characterConfig.enemies.find((enemy) => enemy.id === id);
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
      enemies: gameState.enemies.map((enemy) => {
        return {
          id: enemy.id,
          mode: enemy.mode,
          tile: { ...enemy.tile }
        };
      }),
      collectedCount: gameState.collectedTiles.size,
      totalCollectibles,
      hitBy: gameState.hitBy,
      hitCount: gameState.hitCount
    }),
    movePlayer,
    restartRound,
    startRound,
    tickEnemies
  };
}

renderBoard();
renderCharacters();
renderState();
