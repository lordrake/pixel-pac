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

- [ ] AC1: Power-ups trigger vulnerable enemies.
- [ ] AC2: Lives, score, win, loss, and restart update correctly.
- [ ] AC3: Normal and vulnerable enemy interactions differ clearly.
- [ ] AC4: Parent AC evidence is recorded.

## Validation

- AC1 / parent AC2, AC5: Collect a power-up and observe vulnerable enemies.
- AC2 / parent AC1, AC2: Play through win and loss paths, then restart.
- AC3 / parent AC5: Compare normal collision and vulnerable enemy interaction.
- AC4 / parent AC7: Add evidence before review.

## Task List

| ID | Title | Description | Acceptance Criteria | User Verification | Status |
| --: | ----- | ----------- | ------------------- | ----------------- | ------ |
| 1 | Add power-ups | Render and collect power-ups that change enemy state. | AC1: Vulnerable state triggers | Collect a power-up | To Do |
| 2 | Add lives and scoring | Track lives and scoring for key interactions. | AC2: Score/lives update | Collect dots and hit enemies | To Do |
| 3 | Add win/loss states | Show win after clearing dots and game over after lives run out. | AC2: End states work | Play to win and loss | To Do |
| 4 | Reset round | Restart from win/loss with clean game state. | AC2: Restart resets state | Restart after end state | To Do |
| 5 | Verify enemy states | Confirm normal and vulnerable enemy interactions have distinct outcomes. | AC3: Enemy interactions differ clearly | Compare collisions before and after power-up | To Do |
| 6 | Record evidence | Add validation notes for parent AC coverage. | AC4: Parent evidence exists | Review this file before QA | To Do |

## Parent AC Evidence

- AC1, AC2, AC5, AC7: Pending implementation evidence.

## QA & Code Review

- Verdict: Pending
- Evidence: Pending
- Findings: Pending

## Retro

- Reusable lessons: Pending
- Conventions or agent assets updated: Pending
- Follow-up tasks: Pending

## Notes

- Task: TASK-004
- Title: Power-ups, lives, score, and restart loop
- Created: 2026-06-17
