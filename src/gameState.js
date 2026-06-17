import { characterConfig, directions, mazeMap } from "./gameData.js";

export const totalCollectibles = countCollectibles();
export const vulnerableDurationTicks = 8;
export const vulnerableEnemyScore = 200;

export function createInitialState() {
  return {
    status: "ready",
    score: 0,
    lives: 3,
    playerTile: { ...characterConfig.player.startTile },
    collectedTiles: new Set(),
    enemies: createInitialEnemies(),
    enemyStep: 0,
    hitBy: null,
    hitCount: 0,
    vulnerableTicks: 0,
    eatenCount: 0
  };
}

export function createInitialEnemies() {
  return characterConfig.enemies.map((enemy, index) => {
    return {
      id: enemy.id,
      tile: { ...enemy.startTile },
      mode: enemy.behavior,
      roamOffset: index
    };
  });
}

export function startRound(currentState) {
  const state = currentState.status === "clear" || currentState.status === "game-over"
    ? createInitialState()
    : currentState;

  if (state.status === "hit") resetActorsForNextLife(state);

  state.status = "live";
  state.hitBy = null;
  collectCurrentTile(state);
  checkPlayerEnemyCollision(state);
  return state;
}

export function restartRound() {
  const state = createInitialState();
  state.status = "reset";
  return state;
}

export function movePlayer(state, direction) {
  if (state.status !== "live") return false;

  const nextTile = {
    x: state.playerTile.x + direction.x,
    y: state.playerTile.y + direction.y
  };

  if (isWall(nextTile)) return false;

  state.playerTile = nextTile;
  collectCurrentTile(state);
  if (state.status === "live") checkPlayerEnemyCollision(state);
  return true;
}

export function tickEnemies(state) {
  if (state.status !== "live") return false;

  state.enemyStep += 1;
  state.enemies = state.enemies.map((enemy) => moveEnemy(state, enemy));
  checkPlayerEnemyCollision(state);
  if (state.status === "live") tickVulnerableTimer(state);
  return true;
}

export function moveEnemy(state, enemy) {
  const character = getEnemyConfig(enemy.id);
  const mode = getEnemyMode(state, character);
  const nextTile = mode === "chase" ? chooseChaseTile(state, enemy.tile) : chooseRoamTile(state, enemy);

  return {
    ...enemy,
    mode,
    tile: nextTile
  };
}

export function collectCurrentTile(state) {
  const cell = getCell(state.playerTile);
  const tileKey = getTileKey(state.playerTile);
  if (state.collectedTiles.has(tileKey)) return false;

  if (cell === "." || cell === "o") {
    state.collectedTiles.add(tileKey);
    state.score += cell === "o" ? 50 : 10;
    if (cell === "o") activatePowerUp(state);

    if (state.collectedTiles.size === totalCollectibles) {
      state.status = "clear";
      state.vulnerableTicks = 0;
      updateEnemyModes(state);
    }

    return true;
  }

  return false;
}

export function checkPlayerEnemyCollision(state) {
  if (state.status !== "live") return false;

  const collidedEnemies = state.enemies.filter((item) => {
    return item.tile.x === state.playerTile.x && item.tile.y === state.playerTile.y;
  });

  if (collidedEnemies.length === 0) return false;

  if (state.vulnerableTicks > 0) {
    eatVulnerableEnemies(state, collidedEnemies);
    return true;
  }

  const enemy = collidedEnemies[0];
  state.lives = Math.max(0, state.lives - 1);
  state.status = "hit";
  state.hitBy = enemy.id;
  state.hitCount += 1;
  state.vulnerableTicks = 0;
  updateEnemyModes(state);
  if (state.lives === 0) state.status = "game-over";
  return true;
}

export function activatePowerUp(state) {
  state.vulnerableTicks = vulnerableDurationTicks;
  updateEnemyModes(state);
}

export function tickVulnerableTimer(state) {
  if (state.vulnerableTicks === 0) return false;

  state.vulnerableTicks -= 1;
  if (state.vulnerableTicks === 0) updateEnemyModes(state);
  return true;
}

export function eatVulnerableEnemies(state, collidedEnemies) {
  const collidedIds = new Set(collidedEnemies.map((enemy) => enemy.id));
  state.score += vulnerableEnemyScore * collidedIds.size;
  state.eatenCount += collidedIds.size;
  state.enemies = state.enemies.map((enemy) => {
    if (!collidedIds.has(enemy.id)) return enemy;

    const config = getEnemyConfig(enemy.id);
    return {
      ...enemy,
      tile: { ...config.startTile },
      mode: getEnemyMode(state, config)
    };
  });
}

export function chooseChaseTile(state, tile) {
  const legalTiles = getLegalNeighbors(tile);
  if (legalTiles.length === 0) return tile;

  return legalTiles.reduce((best, candidate) => {
    const bestDistance = getDistance(best, state.playerTile);
    const candidateDistance = getDistance(candidate, state.playerTile);
    return candidateDistance < bestDistance ? candidate : best;
  });
}

export function chooseRoamTile(state, enemy) {
  const legalTiles = getLegalNeighbors(enemy.tile);
  if (legalTiles.length === 0) return enemy.tile;

  const index = (state.enemyStep + enemy.roamOffset) % legalTiles.length;
  return legalTiles[index];
}

export function resetActorsForNextLife(state) {
  state.playerTile = { ...characterConfig.player.startTile };
  state.enemies = createInitialEnemies();
  state.enemyStep = 0;
  state.vulnerableTicks = 0;
  state.hitBy = null;
}

export function updateEnemyModes(state) {
  state.enemies = state.enemies.map((enemy) => {
    const character = getEnemyConfig(enemy.id);
    return {
      ...enemy,
      mode: getEnemyMode(state, character)
    };
  });
}

export function getEnemyMode(state, character) {
  return state.vulnerableTicks > 0 && state.status === "live" ? "vulnerable" : character.behavior;
}

export function getLegalNeighbors(tile) {
  return directions
    .map((direction) => {
      return {
        x: tile.x + direction.x,
        y: tile.y + direction.y
      };
    })
    .filter((candidate) => !isWall(candidate));
}

export function isWall(tile) {
  return getCell(tile) === "#";
}

export function getCell(tile) {
  return mazeMap[tile.y]?.[tile.x] ?? "#";
}

export function getTileKey(tile) {
  return `${tile.x},${tile.y}`;
}

export function getDistance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export function getEnemyConfig(id) {
  return characterConfig.enemies.find((enemy) => enemy.id === id);
}

export function countCollectibles() {
  return mazeMap.reduce((total, row) => {
    return total + [...row].filter((cell) => cell === "." || cell === "o").length;
  }, 0);
}

export function getPublicState(state) {
  return {
    status: state.status,
    score: state.score,
    lives: state.lives,
    playerTile: { ...state.playerTile },
    enemies: state.enemies.map((enemy) => {
      return {
        id: enemy.id,
        mode: enemy.mode,
        tile: { ...enemy.tile }
      };
    }),
    collectedCount: state.collectedTiles.size,
    totalCollectibles,
    hitBy: state.hitBy,
    hitCount: state.hitCount,
    vulnerableTicks: state.vulnerableTicks,
    eatenCount: state.eatenCount
  };
}
