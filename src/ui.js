import { characterConfig } from "./gameData.js";
import { getEnemyConfig } from "./gameState.js";

export function createUi() {
  return {
    shell: document.querySelector(".arcade-shell"),
    statusLabel: document.querySelector("#game-status"),
    scoreLabel: document.querySelector("#score"),
    livesLabel: document.querySelector("#lives"),
    startButton: document.querySelector("#start-button"),
    restartButton: document.querySelector("#restart-button"),
    playerCard: document.querySelector("#player-card"),
    enemyRoster: document.querySelector("#enemy-roster")
  };
}

export function renderState(ui, state) {
  ui.scoreLabel.textContent = state.score.toString().padStart(4, "0");
  ui.livesLabel.textContent = String(state.lives);
  ui.statusLabel.textContent = getStatusText(state);
  ui.shell.classList.toggle("is-live", state.status === "live");
  ui.shell.classList.toggle("is-reset", state.status === "reset");
  ui.shell.classList.toggle("is-clear", state.status === "clear");
  ui.shell.classList.toggle("is-hit", state.status === "hit");
  ui.shell.classList.toggle("is-game-over", state.status === "game-over");
  ui.shell.classList.toggle("is-vulnerable", state.status === "live" && state.vulnerableTicks > 0);
}

export function renderCharacters(ui, state) {
  ui.playerCard.replaceChildren(createCharacterBadgeContent(characterConfig.player));
  ui.enemyRoster.replaceChildren(...state.enemies.map(createEnemyCard));
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
  swatch.style.setProperty("--sprite-color", character.hexColor);
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

function getStatusText(state) {
  if (state.status === "live" && state.vulnerableTicks > 0) return `Power ${state.vulnerableTicks}`;
  if (state.status === "live") return "Round Live";
  if (state.status === "reset") return "Reset";
  if (state.status === "clear") return "Maze Clear";
  if (state.status === "hit") return "Life Lost";
  if (state.status === "game-over") return "Game Over";
  return "Ready";
}
