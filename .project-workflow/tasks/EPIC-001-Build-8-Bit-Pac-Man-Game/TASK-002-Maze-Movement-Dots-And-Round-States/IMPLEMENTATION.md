## User Story

As a player, I want to move through a maze, collect dots, and see round progress, so that the core arcade loop becomes playable.

## Goal

Create the first playable maze traversal and dot collection loop.

## Approach

Represent the maze as data, render walls and dots, update player position through grid-aware movement, and track progress toward clearing the round.

## Phases

- Phase 1: Add maze data and rendering.
- Phase 2: Add player movement and wall collision.
- Phase 3: Add dot collection, score/progress, and clear condition.

## Parent AC Coverage

- AC1, AC2, AC7

## Acceptance Criteria

- [x] AC1: Player movement respects maze walls and paths.
- [x] AC2: Dot collection updates score or progress.
- [x] AC3: Cleared maze condition is detected.
- [x] AC4: Parent AC evidence is recorded.

## Validation

- AC1 / parent AC2: Try moving through walls and paths.
- AC2 / parent AC1, AC2: Collect dots and observe score/progress.
- AC3 / parent AC1, AC2: Clear all dots and observe win-ready state.
- AC4 / parent AC7: Add evidence before review.

## Task List

| ID | Title | Description | Acceptance Criteria | User Verification | Status |
| --: | ----- | ----------- | ------------------- | ----------------- | ------ |
| 1 | Render maze | Add a grid maze with walls and collectible dots. | AC1, AC2: Maze elements render | Open game and inspect maze | Done |
| 2 | Implement movement | Move the player through paths while blocking walls. | AC1: Wall collision works | Use keyboard controls in maze | Done |
| 3 | Collect dots | Remove collected dots and update visible score/progress. | AC2: Dots affect progress | Collect multiple dots | Done |
| 4 | Detect clear state | Trigger a win-ready state after all dots are collected. | AC3: Clear condition works | Collect all dots | Done |
| 5 | Record evidence | Add validation notes for parent AC coverage. | AC4: Parent evidence exists | Review this file before QA | Done |

## Parent AC Evidence

- AC1: `game.js` now uses grid-aware movement with `movementKeys`, `movePlayer`, `isWall`, and `getCell`; scripted validation confirmed an attempted wall move leaves the player at the same tile.
- AC2: `game.js` tracks `collectedTiles`, updates score on first collection, removes collected dots from rendering, and scripted validation confirmed a dot scores once only.
- AC3: `game.js` counts reachable collectibles and sets status to `clear`; scripted pathfinding validation collected every dot/power pellet and confirmed the `Maze Clear` status label.
- AC7: Validation evidence recorded after `node --check game.js` and scripted gameplay validation passed.

## QA & Code Review

- Date: 2026-06-17
- Reviewed areas: `game.js`, `index.html`, `styles.css`, TASK-002 validation evidence, and EPIC-001 tracker status.
- Validation evidence:
  - AC1: `node --check game.js` passed; scripted gameplay validation confirmed an attempted wall move leaves the player on the same tile.
  - AC2: Scripted gameplay validation confirmed movement onto a dot updates score/progress and revisiting the same dot does not score again.
  - AC3: Scripted pathfinding validation collected every reachable dot/power pellet and confirmed the status changes to `Maze Clear`.
  - AC4: Parent AC evidence is recorded in this file, and `./.project-workflow/cli/workflow doctor` passed with no issues.
- Findings: No blocking findings.
- Follow-ups: Replace the temporary `window.pixelPacDebug` validation hook with a dedicated test harness once the project has a build/test structure.
- Verdict: Pass with follow-ups.

## Retro

- Reusable lessons: Pending
- Conventions or agent assets updated: Pending
- Follow-up tasks: Pending

## Notes

- Task: TASK-002
- Title: Maze, movement, dots, and round states
- Created: 2026-06-17
