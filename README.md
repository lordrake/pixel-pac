# Pixel Pac

An 8-bit Pac-Man-inspired browser game with custom character identities, built with Phaser and Vite.

Play it here: https://pixel-pac.vercel.app

## Features

- Keyboard-controlled maze movement.
- Dots, power-ups, score, lives, maze clear, and game-over states.
- Chase, roam, and vulnerable enemy modes.
- Config-driven player and enemy identities.
- Crisp, simple 8-bit presentation without high-fidelity graphics.

## Tech Stack

- Phaser for the game scene and board rendering.
- Vite for local development and production builds.
- Plain JavaScript modules for gameplay state and validation.

## Local Development

Install dependencies:

```sh
npm install
```

Run the Phaser game locally:

```sh
npm run dev
```

Build the static app:

```sh
npm run build
```

Run the gameplay validation checks:

```sh
npm test
```

## Project Workflow

This repo uses `project-workflow` artifacts under `.project-workflow/` to track requirements, tasks, QA review, and retro notes.
