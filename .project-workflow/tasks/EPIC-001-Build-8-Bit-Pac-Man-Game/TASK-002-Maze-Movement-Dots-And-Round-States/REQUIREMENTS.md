# Requirements

## Summary

- Task: TASK-002
- Title: Maze, movement, dots, and round states
- Parent AC Coverage: AC1, AC2, AC7
- Last updated: 2026-06-17

## User Story

As a player, I want to move through a maze, collect dots, and see round progress, so that the core arcade loop becomes playable.

## Goal

Implement maze traversal, wall collision, dot collection, scoring hooks, and basic win/loss state foundations.

## Non-Goals

- Advanced enemy behavior, power-up effects, final character customization, or responsive touch controls.

## Users & Context

- Players need movement and collection to feel understandable before enemies and power-ups add pressure.

## Requirements (Outcome-Focused)

- The player moves through a grid maze and cannot pass through walls.
- Dots can be collected once and update score or progress.
- The round detects when all required dots are collected.
- Basic player state supports later lives, enemy collisions, and restart behavior.

## Acceptance Criteria (Verifiable)

- AC1: Player movement respects maze walls and traversable paths.
- AC2: Dot collection removes dots and updates visible score or progress.
- AC3: The game detects a cleared maze condition.
- AC4: Validation evidence maps behavior to parent AC1, AC2, and AC7.

## Open Questions (Answer Needed)

- None.

## Decisions (Resolved)

- The first maze may be a single hand-authored level.
- Movement should prioritize readable grid behavior over exact original arcade timing.

## Validation Plan

- Move into walls and paths to verify collision.
- Collect dots and verify score/progress changes.
- Clear all dots and verify the round reaches a win-ready state.
