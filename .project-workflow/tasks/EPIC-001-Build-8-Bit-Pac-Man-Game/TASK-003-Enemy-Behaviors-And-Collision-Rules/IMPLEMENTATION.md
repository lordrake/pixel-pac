## User Story

As a player, I want enemies to move through the maze and threaten me fairly, so that the game has tension without feeling random or unreadable.

## Goal

Implement enemy movement and player collision rules.

## Approach

Use grid-aware enemy movement with simple state-driven behavior: roam when not targeting, chase when pressuring, and collision reporting for player hits.

## Phases

- Phase 1: Add enemy entities and legal movement.
- Phase 2: Add roam and chase behavior.
- Phase 3: Add player collision consequences.

## Parent AC Coverage

- AC2, AC5, AC7

## Acceptance Criteria

- [x] AC1: Enemies move through legal maze paths.
- [x] AC2: Chase and roam behaviors are observable.
- [x] AC3: Player/enemy collision triggers a hit state.
- [x] AC4: Parent AC evidence is recorded.

## Validation

- AC1 / parent AC2: Observe enemies staying inside maze paths.
- AC2 / parent AC5: Observe enemies changing behavior between roam and chase.
- AC3 / parent AC2, AC5: Collide with an enemy and confirm the consequence.
- AC4 / parent AC7: Add evidence before review.

## Task List

| ID | Title | Description | Acceptance Criteria | User Verification | Status |
| --: | ----- | ----------- | ------------------- | ----------------- | ------ |
| 1 | Add enemies | Create enemy entities that render in the maze. | AC1: Enemies appear and move legally | Watch enemies move | Done |
| 2 | Add roam behavior | Let enemies choose legal paths when not chasing. | AC2: Roam is observable | Watch enemy path variation | Done |
| 3 | Add chase behavior | Let an enemy pressure the player through legal maze choices. | AC2: Chase is observable | Move near enemy and observe pursuit | Done |
| 4 | Add collision consequence | Trigger a readable hit state when player and enemy overlap. | AC3: Collision consequence works | Intentionally collide with enemy | Done |
| 5 | Record evidence | Add validation notes for parent AC coverage. | AC4: Parent evidence exists | Review this file before QA | Done |

## Parent AC Evidence

- AC1: `game.js` now tracks enemy entities in game state and moves them through `getLegalNeighbors`; scripted validation confirmed enemies do not move into wall tiles.
- AC2: `game.js` defines chase and roam enemy behaviors, exposes readable mode labels/classes, and scripted validation confirmed at least one chase and one roam enemy are active.
- AC3: `game.js` detects player/enemy overlap, stops enemy movement, sets status to `hit`, records hit metadata, and scripted validation confirmed the `Player Hit` status label.
- AC7: Validation evidence recorded after `node --check game.js` and scripted enemy behavior validation passed.

## QA & Code Review

- Date: 2026-06-17
- Reviewed areas: `game.js`, `styles.css`, TASK-003 validation evidence, and EPIC-001 tracker status.
- Validation evidence:
  - AC1: `node --check game.js` passed; scripted enemy behavior validation confirmed enemies stay off wall tiles after movement.
  - AC2: Scripted validation confirmed active chase and roam enemies, and chase movement does not increase distance from the player.
  - AC3: Scripted validation confirmed player/enemy collision changes status to `Player Hit`, records hit metadata, and blocks further player movement while hit.
  - AC4: Parent AC evidence is recorded in this file, and `./.project-workflow/cli/workflow doctor` passed with no issues.
- Findings: No blocking findings.
- Follow-ups: Replace the temporary `window.pixelPacDebug` validation hook with a dedicated test harness once the project has a build/test structure.
- Verdict: Pass with follow-ups.

## Retro

- Reusable lessons: Pending
- Conventions or agent assets updated: Pending
- Follow-up tasks: Pending

## Notes

- Task: TASK-003
- Title: Enemy behaviors and collision rules
- Created: 2026-06-17
