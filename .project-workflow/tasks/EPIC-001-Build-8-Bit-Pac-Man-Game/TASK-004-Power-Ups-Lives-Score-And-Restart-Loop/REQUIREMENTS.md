# Requirements

## Summary

- Task: TASK-004
- Title: Power-ups, lives, score, and restart loop
- Parent AC Coverage: AC1, AC2, AC5, AC7
- Last updated: 2026-06-17

## User Story

As a player, I want power-ups, lives, scoring, win/loss, and restart to work together, so that a full round feels complete.

## Goal

Complete the playable round loop by connecting power-ups, vulnerable enemies, lives, scoring, win, loss, and restart behavior.

## Non-Goals

- Multiple levels, persistent high scores, online leaderboards, or advanced difficulty tuning.

## Users & Context

- Players need clear consequences and round endings so the game feels complete rather than like a prototype.

## Requirements (Outcome-Focused)

- Power-ups temporarily change enemy interaction into a vulnerable state.
- Score updates for dots, power-ups, and vulnerable enemy interactions where implemented.
- Lives decrease on normal enemy collision and lead to game over.
- Clearing the maze produces a win state.
- Restart resets round state cleanly.

## Acceptance Criteria (Verifiable)

- AC1: Power-ups visibly trigger a vulnerable enemy period.
- AC2: Lives, score, win, loss, and restart update correctly during a full round.
- AC3: Enemy interactions differ clearly between normal and vulnerable states.
- AC4: Validation evidence maps behavior to parent AC1, AC2, AC5, and AC7.

## Open Questions (Answer Needed)

- None.

## Decisions (Resolved)

- First-version scoring may be simple as long as score changes are visible and consistent.

## Validation Plan

- Play until power-up collection and verify enemy state changes.
- Lose lives through enemy collision and verify game over.
- Clear the maze and verify win state.
- Restart after win and loss and verify round reset.
