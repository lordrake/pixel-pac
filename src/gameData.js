export const characterConfig = {
  player: {
    id: "pixel-pac",
    name: "Pixel Pac",
    role: "Player",
    color: 0xffe44d,
    hexColor: "#ffe44d",
    startTile: { x: 7, y: 11 }
  },
  enemies: [
    { id: "blink", name: "Blink", role: "Chaser", behavior: "chase", color: 0xff4d4d, hexColor: "#ff4d4d", startTile: { x: 7, y: 5 } },
    { id: "byte", name: "Byte", role: "Roamer", behavior: "roam", color: 0x4df3ff, hexColor: "#4df3ff", startTile: { x: 6, y: 7 } },
    { id: "glitch", name: "Glitch", role: "Trickster", behavior: "roam", color: 0xff7abf, hexColor: "#ff7abf", startTile: { x: 8, y: 7 } },
    { id: "zap", name: "Zap", role: "Ambusher", behavior: "chase", color: 0xff9d3d, hexColor: "#ff9d3d", startTile: { x: 7, y: 8 } }
  ]
};

export const mazeMap = [
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

export const directions = [
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 }
];

export const movementKeys = {
  ArrowUp: { x: 0, y: -1 },
  KeyW: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  KeyS: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  KeyA: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  KeyD: { x: 1, y: 0 }
};

export const colors = {
  ink: 0xf8f7d8,
  panel: 0x111126,
  wall: 0x285bff,
  wallEdge: 0x6fd6ff,
  dot: 0xffe66d,
  power: 0xff7ac8,
  dark: 0x02020a,
  black: 0x050510,
  clear: 0x7cff6b
};
