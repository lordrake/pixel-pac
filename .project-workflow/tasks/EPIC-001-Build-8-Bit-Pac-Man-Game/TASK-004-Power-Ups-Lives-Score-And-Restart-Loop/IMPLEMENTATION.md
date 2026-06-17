## User Story

As a player, I want power-ups, lives, scoring, win/loss, and restart to work together, so that a full round feels complete.

## Goal

Complete the first full playable round loop.

## Approach

Layer power-up state, vulnerable enemy interactions, lives, scoring, and end-state reset logic onto the existing maze and enemy systems.

## Phases

- Phase 1: Add power-up collection and vulnerable state.
- Phase 2: Add lives, score rules, and game over.
- Phase 3: Add win/loss restart reset checks.

## Parent AC Coverage

- AC1, AC2, AC5, AC7

## Acceptance Criteria

- [x] AC1: Power-ups trigger vulnerable enemies.
- [x] AC2: Lives, score, win, loss, and restart update correctly.
- [x] AC3: Normal and vulnerable enemy interactions differ clearly.
- [x] AC4: Parent AC evidence is recorded.

## Validation

- AC1 / parent AC2, AC5: Collect a power-up and observe vulnerable enemies.
- AC2 / parent AC1, AC2: Play through win and loss paths, then restart.
- AC3 / parent AC5: Compare normal collision and vulnerable enemy interaction.
- AC4 / parent AC7: Add evidence before review.

## Task List

| ID | Title | Description | Acceptance Criteria | User Verification | Status |
| --: | ----- | ----------- | ------------------- | ----------------- | ------ |
| 1 | Add power-ups | Render and collect power-ups that change enemy state. | AC1: Vulnerable state triggers | Collect a power-up | Done |
| 2 | Add lives and scoring | Track lives and scoring for key interactions. | AC2: Score/lives update | Collect dots and hit enemies | Done |
| 3 | Add win/loss states | Show win after clearing dots and game over after lives run out. | AC2: End states work | Play to win and loss | Done |
| 4 | Reset round | Restart from win/loss with clean game state. | AC2: Restart resets state | Restart after end state | Done |
| 5 | Verify enemy states | Confirm normal and vulnerable enemy interactions have distinct outcomes. | AC3: Enemy interactions differ clearly | Compare collisions before and after power-up | Done |
| 6 | Record evidence | Add validation notes for parent AC coverage. | AC4: Parent evidence exists | Review this file before QA | Done |

## Parent AC Evidence

- Parent AC1: The round now supports score changes, life loss, maze clear, game over, and restart through `src/gameState.js`; `tests/gameplay.test.mjs` validates these state transitions.
- Parent AC2: Dots, power-ups, vulnerable enemy interaction, normal enemy collision, lives, win state, loss state, and restart now work together in the same state loop.
- Parent AC5: Power-ups set all enemies to a visible `vulnerable` mode for `vulnerableDurationTicks`, and vulnerable collisions score points instead of costing a life.
- Parent AC7: Validation evidence is recorded here with direct command results.

## Implementation Evidence

- AC1: `collectCurrentTile` now activates a vulnerable timer when a power-up tile is collected; `PixelPacScene` and `ui.js` render vulnerable enemy and countdown cues.
- AC2: Normal enemy collisions decrement lives, `game-over` is reached at zero lives, `clear` remains the win state, and `restartRound` resets score, lives, collected tiles, enemies, and power-up state.
- AC3: Normal collisions set `hit` or `game-over`; vulnerable collisions add `vulnerableEnemyScore`, increment eaten count, reset the enemy to its start tile, and keep the player live.
- AC4: `npm test` passed, `npm run build` passed with the existing Phaser chunk-size warning, and `./.project-workflow/cli/workflow doctor` reported no issues.

## QA & Code Review

- Date: 2026-06-17
- Reviewed areas: `src/gameState.js`, `src/PixelPacScene.js`, `src/gameData.js`, `src/ui.js`, `styles.css`, `tests/gameplay.test.mjs`, TASK-004 implementation notes, and EPIC-001 tracker state.
- Validation evidence:
  - AC1: `npm test` verifies power-up collection sets `vulnerableTicks`, switches enemies to `vulnerable`, and later restores normal enemy modes. `PixelPacScene` and `ui.js` expose vulnerable enemy and countdown cues.
  - AC2: `npm test` verifies score changes, normal collision life loss, game-over at zero lives, restart reset, continued win/maze-clear behavior, and next-life reset after a hit.
  - AC3: `npm test` verifies normal enemy collision costs a life while vulnerable enemy collision scores `vulnerableEnemyScore`, increments eaten count, resets the enemy to its start tile, and keeps the player live.
  - AC4: Parent evidence is recorded above for AC1, AC2, AC5, and AC7.
  - Build: `npm run build` passed with the existing Phaser bundle-size warning.
  - Launch: `curl -I http://127.0.0.1:4173/` returned HTTP 200 from the local Vite dev server.
  - Workflow: `./.project-workflow/cli/workflow doctor` reported no issues.
- Findings: No blocking findings. During review, the final-power-up maze-clear edge case was tightened so clearing the maze cancels vulnerability and restores enemy modes; `tests/gameplay.test.mjs` now covers that case.
- Follow-ups: The existing Phaser bundle-size warning remains a future optimization item, not a TASK-004 blocker.
- Verdict: Pass with follow-ups.

## Retro

- Date: 2026-06-17
- Reusable lessons: Keep gameplay rules in `src/gameState.js` and cover round-loop edge cases in `tests/gameplay.test.mjs`; visual Phaser cues should remain a projection of state rather than owning game rules.
- Conventions or agent assets updated: `.project-workflow/guidance.md` now records that epic-child tasks should use `workflow epic status` for lifecycle updates.
- Follow-up tasks: Consider a later performance/build task if the Phaser bundle-size warning becomes a delivery concern.
- Missed in-scope work: None.

## Notes

- Task: TASK-004
- Title: Power-ups, lives, score, and restart loop
- Created: 2026-06-17
