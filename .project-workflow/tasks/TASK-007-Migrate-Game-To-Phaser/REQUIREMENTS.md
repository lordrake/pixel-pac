# Requirements

## Summary

- Task: TASK-007
- Title: Migrate Game To Phaser
- Last updated: 2026-06-17

## User Story

As the project owner, I want the current Pac-Man-style game migrated to Phaser, so that future sprites, animation, sound, tilemap, and arcade polish work can build on a game framework instead of ad hoc DOM rendering.

## Goal

Move the existing playable browser game from plain DOM/grid rendering to Phaser while preserving the current player-facing behavior and 8-bit visual direction.

## Non-Goals

- Adding new gameplay beyond the currently implemented shell, movement, dot collection, maze clear, enemy movement, chase/roam modes, and player-hit state.
- Reworking final custom character art, power-up behavior, lives/game-over rules, mobile controls, or sound effects.
- Recreating original Pac-Man timing or ghost AI exactly.
- Depending on a remote CDN as the only way to run the game.

## Users & Context

- Players should not lose current functionality while the internals move to Phaser.
- Future development tasks need a framework-friendly structure for sprite rendering, animation, update loops, collisions, and audio.
- The project owner wants the migration done before more visual polish and controls make the current DOM approach more expensive to replace.

## Requirements (Outcome-Focused)

- The game runs through a Phaser scene or scenes rather than manually rendering every board tile with DOM elements.
- Current gameplay remains intact: start, restart, movement, wall collision, dot collection, score/progress, maze clear, enemy movement, chase/roam modes, and player-hit state.
- Character identities remain data-driven so custom characters are not hard-coded into Phaser scene logic.
- The 8-bit visual style remains simple, readable, crisp, and unfancy.
- The project has a repeatable local run path for Phaser, including any required dependency or local asset setup.
- Existing validation coverage is preserved or replaced by an equivalent test/verification path.

## Acceptance Criteria (Verifiable)

- AC1: The game launches locally using Phaser and presents the current 8-bit arcade shell.
- AC2: Player movement, wall collision, dot collection, scoring/progress, and maze clear behavior match the current implementation.
- AC3: Enemy entities move through legal paths, expose chase/roam behavior, and trigger the readable player-hit state.
- AC4: Character identity data remains separate from Phaser scene state and can still drive player/enemy names, colors, and roles.
- AC5: Phaser dependency/loading is project-managed and documented so the game does not rely only on an external CDN at runtime.
- AC6: Validation evidence covers the migrated behavior and replaces or formalizes the temporary `window.pixelPacDebug` hook.

## Open Questions (Answer Needed)

- None.

## Decisions (Resolved)

- The project should migrate to Phaser before later visual polish, sound, responsive controls, or custom sprite work.
- The migration should preserve behavior first; gameplay expansion belongs in later tasks.
- The game should keep the intentionally 8-bit visual direction rather than moving toward high-fidelity graphics.

## Validation Plan

- Run the local Phaser game and confirm the shell renders.
- Validate movement, wall collision, dot collection, scoring/progress, maze clear, enemy legal movement, chase/roam behavior, and player-hit state.
- Inspect the implementation to confirm character configuration remains separate from scene state.
- Confirm the run instructions and dependency setup work locally.
- Run `./.project-workflow/cli/workflow doctor` after workflow artifact updates.
