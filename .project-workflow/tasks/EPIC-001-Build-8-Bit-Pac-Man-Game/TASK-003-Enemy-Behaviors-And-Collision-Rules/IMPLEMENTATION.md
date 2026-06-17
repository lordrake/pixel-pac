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

- [ ] AC1: Enemies move through legal maze paths.
- [ ] AC2: Chase and roam behaviors are observable.
- [ ] AC3: Player/enemy collision triggers a hit state.
- [ ] AC4: Parent AC evidence is recorded.

## Validation

- AC1 / parent AC2: Observe enemies staying inside maze paths.
- AC2 / parent AC5: Observe enemies changing behavior between roam and chase.
- AC3 / parent AC2, AC5: Collide with an enemy and confirm the consequence.
- AC4 / parent AC7: Add evidence before review.

## Task List

| ID | Title | Description | Acceptance Criteria | User Verification | Status |
| --: | ----- | ----------- | ------------------- | ----------------- | ------ |
| 1 | Add enemies | Create enemy entities that render in the maze. | AC1: Enemies appear and move legally | Watch enemies move | To Do |
| 2 | Add roam behavior | Let enemies choose legal paths when not chasing. | AC2: Roam is observable | Watch enemy path variation | To Do |
| 3 | Add chase behavior | Let an enemy pressure the player through legal maze choices. | AC2: Chase is observable | Move near enemy and observe pursuit | To Do |
| 4 | Add collision consequence | Trigger a readable hit state when player and enemy overlap. | AC3: Collision consequence works | Intentionally collide with enemy | To Do |
| 5 | Record evidence | Add validation notes for parent AC coverage. | AC4: Parent evidence exists | Review this file before QA | To Do |

## Parent AC Evidence

- AC2, AC5, AC7: Pending implementation evidence.

## QA & Code Review

- Verdict: Pending
- Evidence: Pending
- Findings: Pending

## Retro

- Reusable lessons: Pending
- Conventions or agent assets updated: Pending
- Follow-up tasks: Pending

## Notes

- Task: TASK-003
- Title: Enemy behaviors and collision rules
- Created: 2026-06-17
