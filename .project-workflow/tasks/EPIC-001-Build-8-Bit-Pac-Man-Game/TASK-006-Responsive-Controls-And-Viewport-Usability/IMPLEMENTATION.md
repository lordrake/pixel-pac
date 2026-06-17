## User Story

As a player, I want the game to be readable and controllable on desktop and mobile-sized screens, so that I can play comfortably in common browser contexts.

## Goal

Make the game usable across common desktop and mobile browser sizes.

## Approach

Layer input handling and responsive layout checks onto the complete game loop, preserving fixed-format arcade readability.

## Phases

- Phase 1: Confirm keyboard controls.
- Phase 2: Add touch or on-screen controls.
- Phase 3: Verify responsive layout and readability.

## Parent AC Coverage

- AC6, AC7

## Acceptance Criteria

- [ ] AC1: Keyboard controls work reliably on desktop.
- [ ] AC2: Touch or on-screen controls work on mobile-sized viewports.
- [ ] AC3: Maze, HUD, and controls remain readable and non-overlapping.
- [ ] AC4: Parent AC evidence is recorded.

## Validation

- AC1 / parent AC6: Test keyboard movement in desktop viewport.
- AC2 / parent AC6: Test touch/on-screen movement in mobile-sized viewport.
- AC3 / parent AC6: Inspect desktop and mobile layouts for overlap/readability.
- AC4 / parent AC7: Add evidence before review.

## Task List

| ID | Title | Description | Acceptance Criteria | User Verification | Status |
| --: | ----- | ----------- | ------------------- | ----------------- | ------ |
| 1 | Validate keyboard controls | Ensure keyboard input moves the player predictably. | AC1: Desktop controls work | Play with keyboard | To Do |
| 2 | Add mobile controls | Add touch or on-screen directional controls. | AC2: Mobile controls work | Use mobile viewport controls | To Do |
| 3 | Tune responsive layout | Keep maze, HUD, and controls readable across common sizes. | AC3: Layout remains readable | Inspect desktop and mobile viewports | To Do |
| 4 | Record viewport evidence | Capture notes for tested viewport sizes and outcomes. | AC4: Parent evidence exists | Review validation notes | To Do |

## Parent AC Evidence

- AC6, AC7: Pending implementation evidence.

## QA & Code Review

- Verdict: Pending
- Evidence: Pending
- Findings: Pending

## Retro

- Reusable lessons: Pending
- Conventions or agent assets updated: Pending
- Follow-up tasks: Pending

## Notes

- Task: TASK-006
- Title: Responsive controls and viewport usability
- Created: 2026-06-17
