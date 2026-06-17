# Requirements

## Summary

- Task: TASK-003
- Title: Enemy behaviors and collision rules
- Parent AC Coverage: AC2, AC5, AC7
- Last updated: 2026-06-17

## User Story

As a player, I want enemies to move through the maze and threaten me fairly, so that the game has tension without feeling random or unreadable.

## Goal

Add enemy movement, chase/roam behavior, and player collision rules.

## Non-Goals

- Perfect reproduction of original ghost AI.
- Power-up vulnerable behavior beyond hooks needed for the later power-up task.
- Final custom enemy artwork.

## Users & Context

- Players need enemy states to be readable and collisions to feel fair.

## Requirements (Outcome-Focused)

- Enemies move through legal maze paths.
- At least one enemy behavior applies pressure by chasing or approaching the player.
- At least one behavior creates variation through roaming or wandering.
- Player/enemy collision produces a clear consequence that later lives logic can use.

## Acceptance Criteria (Verifiable)

- AC1: Enemies move without crossing walls.
- AC2: Chase and roam behaviors are observable in gameplay.
- AC3: Player/enemy collision triggers a readable player-hit state.
- AC4: Validation evidence maps behavior to parent AC2, AC5, and AC7.

## Open Questions (Answer Needed)

- None.

## Decisions (Resolved)

- Enemy behavior should be fair and readable rather than historically exact.

## Validation Plan

- Observe enemies moving through maze paths.
- Confirm chase and roam behavior appear during play.
- Trigger a collision and verify the player-hit state.
