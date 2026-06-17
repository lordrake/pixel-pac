import assert from "node:assert/strict";
import {
  createInitialState,
  getDistance,
  getPublicState,
  isWall,
  movePlayer,
  startRound,
  tickEnemies
} from "../src/gameState.js";
import { mazeMap } from "../src/gameData.js";

const directions = [
  { code: "ArrowUp", vector: { x: 0, y: -1 } },
  { code: "ArrowDown", vector: { x: 0, y: 1 } },
  { code: "ArrowLeft", vector: { x: -1, y: 0 } },
  { code: "ArrowRight", vector: { x: 1, y: 0 } }
];

const state = startRound(createInitialState());
assert.equal(state.status, "live");
assert.equal(getPublicState(state).enemies.length, 4);

movePlayer(state, { x: 0, y: 1 });
assert.deepEqual(state.playerTile, { x: 7, y: 11 }, "wall collision should block movement");

movePlayer(state, { x: -1, y: 0 });
assert.deepEqual(state.playerTile, { x: 6, y: 11 });
assert.equal(state.score, 10);
assert.equal(state.collectedTiles.size, 1);

movePlayer(state, { x: 1, y: 0 });
movePlayer(state, { x: -1, y: 0 });
assert.equal(state.score, 10, "collected dots should not score twice");

const enemyState = startRound(createInitialState());
const publicBefore = getPublicState(enemyState);
const blinkBefore = publicBefore.enemies.find((enemy) => enemy.id === "blink");
tickEnemies(enemyState);
const publicAfter = getPublicState(enemyState);
const blinkAfter = publicAfter.enemies.find((enemy) => enemy.id === "blink");
assert.equal(publicAfter.enemies.some((enemy) => enemy.mode === "chase"), true);
assert.equal(publicAfter.enemies.some((enemy) => enemy.mode === "roam"), true);
assert.equal(publicAfter.enemies.some((enemy) => isWall(enemy.tile)), false);
assert.ok(
  getDistance(blinkAfter.tile, publicAfter.playerTile) <= getDistance(blinkBefore.tile, publicBefore.playerTile),
  "chase enemy should not move farther from player"
);

const hitState = startRound(createInitialState());
for (let index = 0; index < 6 && hitState.status !== "hit"; index += 1) {
  movePlayer(hitState, { x: 0, y: -1 });
}
assert.equal(hitState.status, "hit");
assert.equal(hitState.hitCount, 1);
const hitTile = { ...hitState.playerTile };
movePlayer(hitState, { x: 0, y: -1 });
assert.deepEqual(hitState.playerTile, hitTile, "player should not move after hit");

const clearState = startRound(createInitialState());
clearState.enemies = [];
const targets = getCollectibleTiles();
while (targets.length) {
  const current = clearState.playerTile;
  let best = null;
  for (const target of targets) {
    const path = findPath(current, target);
    if (!best || path.length < best.path.length) {
      best = { target, targetKey: getTileKey(target), path };
    }
  }
  for (const step of best.path) movePlayer(clearState, step.vector);
  targets.splice(targets.findIndex((target) => getTileKey(target) === best.targetKey), 1);
}
assert.equal(clearState.collectedTiles.size, getPublicState(clearState).totalCollectibles);
assert.equal(clearState.status, "clear");

console.log("gameplay tests passed");

function getCollectibleTiles() {
  const targets = [];
  for (let y = 0; y < mazeMap.length; y += 1) {
    for (let x = 0; x < mazeMap[y].length; x += 1) {
      if (mazeMap[y][x] === "." || mazeMap[y][x] === "o") targets.push({ x, y });
    }
  }
  return targets;
}

function findPath(from, to) {
  const queue = [{ tile: from, path: [] }];
  const seen = new Set([getTileKey(from)]);
  while (queue.length) {
    const current = queue.shift();
    if (current.tile.x === to.x && current.tile.y === to.y) return current.path;
    for (const direction of directions) {
      const next = {
        x: current.tile.x + direction.vector.x,
        y: current.tile.y + direction.vector.y
      };
      if (!isOpen(next) || seen.has(getTileKey(next))) continue;
      seen.add(getTileKey(next));
      queue.push({ tile: next, path: [...current.path, direction] });
    }
  }
  throw new Error(`No path to ${getTileKey(to)}`);
}

function isOpen(tile) {
  return mazeMap[tile.y] && mazeMap[tile.y][tile.x] !== "#";
}

function getTileKey(tile) {
  return `${tile.x},${tile.y}`;
}
