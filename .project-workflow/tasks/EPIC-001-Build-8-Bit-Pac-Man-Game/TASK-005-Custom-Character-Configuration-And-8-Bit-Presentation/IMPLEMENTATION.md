## User Story

As the project owner, I want player and enemy identities to come from configuration, so that the game can use custom characters without rewriting gameplay logic.

## Goal

Make custom characters configurable and visually readable.

## Approach

Introduce character configuration for player and enemies, then connect rendering to that configuration while preserving simple 8-bit readability.

## Phases

- Phase 1: Define character configuration.
- Phase 2: Render player and enemies from configuration.
- Phase 3: Verify 8-bit readability across gameplay states.

## Parent AC Coverage

- AC3, AC4, AC7

## Acceptance Criteria

- [ ] AC1: Character identities can be changed through configuration.
- [ ] AC2: Characters remain readable in normal and vulnerable states.
- [ ] AC3: Presentation stays consistently 8-bit.
- [ ] AC4: Parent AC evidence is recorded.

## Validation

- AC1 / parent AC4: Change config and verify visible character updates.
- AC2 / parent AC4: Inspect normal and vulnerable states.
- AC3 / parent AC3: Inspect for crisp, low-detail, unfancy visuals.
- AC4 / parent AC7: Add evidence before review.

## Task List

| ID | Title | Description | Acceptance Criteria | User Verification | Status |
| --: | ----- | ----------- | ------------------- | ----------------- | ------ |
| 1 | Define config | Add data for player and enemy names, colors, and state styling. | AC1: Config drives identity | Change config value | To Do |
| 2 | Render from config | Connect player and enemy rendering to character config. | AC1, AC2: Characters update and remain readable | Inspect gameplay | To Do |
| 3 | Style states | Make normal, chase, and vulnerable states readable in 8-bit style. | AC2, AC3: States are visually distinct | Trigger state changes | To Do |
| 4 | Check logic boundaries | Ensure gameplay logic does not depend on display names. | AC1: Logic is config-safe | Review code paths | To Do |
| 5 | Record evidence | Add validation notes for parent AC coverage. | AC4: Parent evidence exists | Review this file before QA | To Do |

## Parent AC Evidence

- AC3, AC4, AC7: Pending implementation evidence.

## QA & Code Review

- Verdict: Pending
- Evidence: Pending
- Findings: Pending

## Retro

- Reusable lessons: Pending
- Conventions or agent assets updated: Pending
- Follow-up tasks: Pending

## Notes

- Task: TASK-005
- Title: Custom character configuration and 8-bit presentation
- Created: 2026-06-17
