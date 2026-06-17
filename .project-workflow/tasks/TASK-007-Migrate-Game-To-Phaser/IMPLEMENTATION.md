## User Story

As the project owner, I want the current Pac-Man-style game migrated to Phaser, so that future sprites, animation, sound, tilemap, and arcade polish work can build on a game framework instead of ad hoc DOM rendering.

## Goal

Migrate the current game to Phaser without changing its current gameplay scope.

## Approach

Introduce a project-managed Phaser runtime, move board rendering and update-loop behavior into Phaser scenes, preserve the current data-driven character configuration, and replace the temporary debug hook with a more intentional validation seam.

## Phases

- Phase 1: Add Phaser dependency/loading and local run documentation.
- Phase 2: Recreate the current board, HUD, character roster, and 8-bit presentation in a Phaser-backed structure.
- Phase 3: Port player movement, dot collection, maze clear, enemy movement, chase/roam modes, and player-hit behavior.
- Phase 4: Add or update validation so migrated behavior is covered without relying on the current temporary debug hook.

## Acceptance Criteria

- [x] AC1: Phaser-backed game launches locally with the current arcade shell.
- [x] AC2: Current maze traversal, wall collision, dot collection, scoring/progress, and maze clear behavior are preserved.
- [x] AC3: Current enemy legal movement, chase/roam behavior, and player-hit state are preserved.
- [x] AC4: Character identities remain data-driven and separate from Phaser scene state.
- [x] AC5: Phaser dependency/loading is local/project-managed and documented.
- [x] AC6: Migrated behavior has validation evidence and no longer depends on the temporary `window.pixelPacDebug` hook.

## Validation

- AC1: Launch the local Phaser game and confirm the shell renders.
- AC2: Verify player movement, wall blocking, dot collection, score/progress, and maze clear.
- AC3: Verify enemy legal movement, chase/roam modes, and player-hit state.
- AC4: Review character config boundaries after migration.
- AC5: Verify documented local run path and dependency setup.
- AC6: Run the new or updated automated validation and record evidence.

## Task List

| ID | Title | Description | Acceptance Criteria | User Verification | Status |
| --: | ----- | ----------- | ------------------- | ----------------- | ------ |
| 1 | Add Phaser runtime | Add project-managed Phaser loading and document the local run path. | AC1, AC5: Phaser game launches locally without CDN-only dependency | Run documented local command or open path | Done |
| 2 | Port rendering shell | Recreate the board, HUD, roster, and 8-bit presentation in the Phaser-backed app. | AC1, AC4: Shell renders and character data remains separate | Inspect game shell and config boundaries | Done |
| 3 | Port player and collectibles | Preserve movement, wall collision, dot collection, scoring/progress, and maze clear. | AC2: Current player/maze behavior works | Run gameplay validation | Done |
| 4 | Port enemies and collisions | Preserve legal enemy movement, chase/roam modes, and player-hit state. | AC3: Enemy behavior and hit state work | Run enemy validation | Done |
| 5 | Replace validation seam | Replace or formalize `window.pixelPacDebug` with a proper migrated validation path. | AC6: Automated validation covers migrated behavior | Run validation checks | Done |
| 6 | Record evidence | Update implementation notes with validation evidence and remaining risks. | AC1, AC2, AC3, AC4, AC5, AC6: Evidence recorded | Review this file before QA | Done |

## Implementation Evidence

- AC1: `index.html` now loads `/src/main.js`, which starts a Phaser game using `PixelPacScene`; `npm run dev -- --port 4173` returned a local Vite URL and `curl -I http://127.0.0.1:4173/` returned HTTP 200.
- AC2: `src/gameState.js` preserves player movement, wall collision, dot collection, scoring/progress, and maze clear behavior; `npm test` validates wall blocking, one-time dot scoring, and full maze clear.
- AC3: `src/gameState.js` preserves enemy legal movement, chase/roam behavior, collision hit metadata, and movement blocking after hit; `npm test` validates these behaviors.
- AC4: Character identity data lives in `src/gameData.js`; `src/PixelPacScene.js` and `src/ui.js` consume that data without hard-coding display names into scene state.
- AC5: `package.json` and `package-lock.json` project-manage `phaser` and `vite`; `README.md` documents `npm install`, `npm run dev`, `npm run build`, and `npm test`; `npm audit --audit-level=high` found 0 vulnerabilities after updating Vite.
- AC6: `tests/gameplay.test.mjs` imports the pure game-state module directly and replaces the previous temporary `window.pixelPacDebug` validation hook.
- Build: `npm run build` completed successfully. Vite reported a large chunk warning because Phaser is bundled into the app; this is acceptable for the migration task and can be tuned later if needed.

## QA & Code Review

- Date: 2026-06-17
- Reviewed areas: `index.html`, `styles.css`, `package.json`, `package-lock.json`, `README.md`, `.gitignore`, `src/gameData.js`, `src/gameState.js`, `src/PixelPacScene.js`, `src/ui.js`, `src/main.js`, `tests/gameplay.test.mjs`, and tracker state.
- Validation evidence:
  - AC1: Browser check at `http://127.0.0.1:4173/` verified the Phaser canvas is mounted and visible at 600x600, the arcade shell renders, and browser console error logs are empty.
  - AC2: `npm test` passed movement, wall collision, one-time dot scoring, and full maze clear validation.
  - AC3: `npm test` passed enemy count, legal enemy movement, chase/roam mode exposure, chase distance behavior, hit status, and blocked movement after hit.
  - AC4: Character identity data remains in `src/gameData.js`; scene and UI modules consume the config rather than owning character names, colors, roles, or start tiles.
  - AC5: `phaser` and `vite` are project-managed through `package.json` and `package-lock.json`; `README.md` documents install, dev, build, and test commands; `npm audit --audit-level=high` found 0 vulnerabilities.
  - AC6: Validation uses direct module-level tests in `tests/gameplay.test.mjs`; `rg "pixelPacDebug|game\\.js|https://cdn|unpkg|jsdelivr"` found no lingering debug hook, old script reference, or CDN-only dependency.
  - Workflow: `./.project-workflow/cli/workflow doctor` reported no issues.
- Findings: No blocking findings. During review, visual browser verification exposed the player icon missing from the board because the Phaser polygon points were offset incorrectly; this was fixed in `src/PixelPacScene.js` by drawing the player shape with a graphics path in board coordinates.
- Follow-ups: Consider code splitting or Vite chunk warning tuning after more Phaser assets/features land; the current large bundle warning is expected from bundling Phaser and does not block this migration.
- Verdict: Pass with follow-ups.

## Retro

- Reusable lessons: Pending
- Conventions or agent assets updated: Pending
- Follow-up tasks: Pending

## Notes

- Task: TASK-007
- Title: Migrate Game To Phaser
- Created: 2026-06-17
