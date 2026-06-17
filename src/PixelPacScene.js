import Phaser from "phaser";
import { characterConfig, colors, mazeMap, movementKeys } from "./gameData.js";
import {
  createInitialState,
  getCell,
  getEnemyConfig,
  getPublicState,
  getTileKey,
  movePlayer,
  restartRound,
  startRound,
  tickEnemies
} from "./gameState.js";
import { createUi, renderCharacters, renderState } from "./ui.js";

const boardPixels = 600;
const tileSize = boardPixels / mazeMap.length;
const enemyStepMs = 650;

export class PixelPacScene extends Phaser.Scene {
  constructor() {
    super("PixelPacScene");
    this.state = createInitialState();
    this.enemyTimer = null;
    this.ui = null;
  }

  create() {
    this.ui = createUi();
    this.ui.startButton.addEventListener("click", () => this.startRound());
    this.ui.restartButton.addEventListener("click", () => this.restartRound());
    this.input.keyboard.on("keydown", (event) => this.handleKeyDown(event));
    this.renderAll();
  }

  startRound() {
    this.state = startRound(this.state);
    this.renderAll();
    this.startEnemyLoop();
    this.game.canvas.focus();
  }

  restartRound() {
    this.stopEnemyLoop();
    this.state = restartRound();
    this.renderAll();
    this.game.canvas.focus();
  }

  handleKeyDown(event) {
    const direction = movementKeys[event.code];
    if (!direction || this.state.status !== "live") return;

    event.preventDefault();
    movePlayer(this.state, direction);
    if (this.state.status !== "live") this.stopEnemyLoop();
    this.renderAll();
  }

  startEnemyLoop() {
    this.stopEnemyLoop();
    this.enemyTimer = this.time.addEvent({
      delay: enemyStepMs,
      loop: true,
      callback: () => {
        tickEnemies(this.state);
        if (this.state.status !== "live") this.stopEnemyLoop();
        this.renderAll();
      }
    });
  }

  stopEnemyLoop() {
    if (!this.enemyTimer) return;
    this.enemyTimer.remove(false);
    this.enemyTimer = null;
  }

  renderAll() {
    this.renderBoard();
    renderCharacters(this.ui, this.state);
    renderState(this.ui, this.state);
  }

  renderBoard() {
    this.children.removeAll(true);

    mazeMap.forEach((row, y) => {
      [...row].forEach((cell, x) => {
        this.renderTile(cell, x, y);
      });
    });

    this.state.enemies.forEach((enemy) => this.renderEnemy(enemy));
    this.renderPlayer();
  }

  renderTile(cell, x, y) {
    const center = this.getTileCenter({ x, y });
    const tileKey = getTileKey({ x, y });

    if (cell === "#") {
      this.add
        .rectangle(center.x, center.y, tileSize, tileSize, colors.wall)
        .setStrokeStyle(3, 0x102cc7);
      return;
    }

    this.add.rectangle(center.x, center.y, tileSize, tileSize, colors.dark);

    if (this.state.collectedTiles.has(tileKey)) return;

    if (cell === ".") {
      this.add.rectangle(center.x, center.y, tileSize * 0.22, tileSize * 0.22, colors.dot);
    }

    if (cell === "o") {
      this.add.rectangle(center.x, center.y, tileSize * 0.46, tileSize * 0.46, colors.power);
    }
  }

  renderPlayer() {
    const center = this.getTileCenter(this.state.playerTile);
    const points = [
      { x: center.x - tileSize * 0.36, y: center.y - tileSize * 0.34 },
      { x: center.x + tileSize * 0.36, y: center.y - tileSize * 0.34 },
      { x: center.x + tileSize * 0.36, y: center.y - tileSize * 0.12 },
      { x: center.x + tileSize * 0.1, y: center.y },
      { x: center.x + tileSize * 0.36, y: center.y + tileSize * 0.12 },
      { x: center.x + tileSize * 0.36, y: center.y + tileSize * 0.34 },
      { x: center.x - tileSize * 0.36, y: center.y + tileSize * 0.34 }
    ];
    const player = this.add.graphics();
    player.fillStyle(characterConfig.player.color, 1);
    player.beginPath();
    player.moveTo(points[0].x, points[0].y);
    points.slice(1).forEach((point) => player.lineTo(point.x, point.y));
    player.closePath();
    player.fillPath();
  }

  renderEnemy(enemy) {
    const center = this.getTileCenter(enemy.tile);
    const config = getEnemyConfig(enemy.id);
    const fillColor = enemy.mode === "vulnerable" ? colors.vulnerable : config.color;
    const body = this.add
      .rectangle(center.x, center.y, tileSize * 0.7, tileSize * 0.7, fillColor)
      .setOrigin(0.5);

    if (enemy.mode === "vulnerable") {
      body.setStrokeStyle(4, colors.power);
    } else if (enemy.mode === "chase") {
      body.setStrokeStyle(3, colors.ink);
    } else {
      body.setStrokeStyle(4, colors.black);
    }
  }

  getTileCenter(tile) {
    return {
      x: tile.x * tileSize + tileSize / 2,
      y: tile.y * tileSize + tileSize / 2
    };
  }

  getSnapshot() {
    return getPublicState(this.state);
  }

  getCell(tile) {
    return getCell(tile);
  }
}
