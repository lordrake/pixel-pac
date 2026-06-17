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

- [ ] AC1: Player movement respects maze walls and paths.
- [ ] AC2: Dot collection updates score or progress.
- [ ] AC3: Cleared maze condition is detected.
- [ ] AC4: Parent AC evidence is recorded.

## Validation

- AC1 / parent AC2: Try moving through walls and paths.
- AC2 / parent AC1, AC2: Collect dots and observe score/progress.
- AC3 / parent AC1, AC2: Clear all dots and observe win-ready state.
- AC4 / parent AC7: Add evidence before review.

## Task List

| ID | Title | Description | Acceptance Criteria | User Verification | Status |
| --: | ----- | ----------- | ------------------- | ----------------- | ------ |
| 1 | Render maze | Add a grid maze with walls and collectible dots. | AC1, AC2: Maze elements render | Open game and inspect maze | To Do |
| 2 | Implement movement | Move the player through paths while blocking walls. | AC1: Wall collision works | Use keyboard controls in maze | To Do |
| 3 | Collect dots | Remove collected dots and update visible score/progress. | AC2: Dots affect progress | Collect multiple dots | To Do |
| 4 | Detect clear state | Trigger a win-ready state after all dots are collected. | AC3: Clear condition works | Collect all dots | To Do |
| 5 | Record evidence | Add validation notes for parent AC coverage. | AC4: Parent evidence exists | Review this file before QA | To Do |

## Parent AC Evidence

- AC1, AC2, AC7: Pending implementation evidence.

## QA & Code Review

- Verdict: Pending
- Evidence: Pending
- Findings: Pending

## Retro

- Reusable lessons: Pending
- Conventions or agent assets updated: Pending
- Follow-up tasks: Pending

## Notes

- Task: TASK-002
- Title: Maze, movement, dots, and round states
- Created: 2026-06-17
