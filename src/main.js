import Phaser from "phaser";
import { PixelPacScene } from "./PixelPacScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 600,
  height: 600,
  backgroundColor: "#02020a",
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [PixelPacScene]
};

new Phaser.Game(config);
