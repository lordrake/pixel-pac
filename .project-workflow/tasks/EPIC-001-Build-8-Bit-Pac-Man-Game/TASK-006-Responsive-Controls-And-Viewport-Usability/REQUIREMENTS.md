# Requirements

## Summary

- Task: TASK-006
- Title: Responsive controls and viewport usability
- Parent AC Coverage: AC6, AC7
- Last updated: 2026-06-17

## User Story

As a player, I want the game to be readable and controllable on desktop and mobile-sized screens, so that I can play comfortably in common browser contexts.

## Goal

Add keyboard and mobile-friendly controls, responsive layout behavior, and viewport usability checks.

## Non-Goals

- Native mobile packaging, gamepad support, or device-specific app-store behavior.

## Users & Context

- Desktop players need reliable keyboard control.
- Mobile-sized viewport players need visible controls that do not cover the maze or HUD.

## Requirements (Outcome-Focused)

- Keyboard controls work for desktop play.
- Touch or on-screen controls support mobile-sized play.
- The game layout keeps the maze, HUD, and controls readable without overlap.
- Responsive behavior preserves the 8-bit style and playable proportions.

## Acceptance Criteria (Verifiable)

- AC1: Keyboard controls move the player reliably on desktop.
- AC2: Touch or on-screen controls move the player on mobile-sized viewports.
- AC3: The maze, HUD, and controls remain readable and non-overlapping at common desktop and mobile sizes.
- AC4: Validation evidence maps behavior to parent AC6 and AC7.

## Open Questions (Answer Needed)

- None.

## Decisions (Resolved)

- Browser responsiveness is required; native app packaging is out of scope.

## Validation Plan

- Test keyboard controls in a desktop viewport.
- Test touch or on-screen controls in a mobile-sized viewport.
- Inspect common viewport sizes for text, HUD, maze, and control overlap.
