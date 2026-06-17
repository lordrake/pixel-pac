# Requirements

## Summary

- Task: EPIC-001
- Title: Build 8-bit Pac-Man Game
- Last updated: 2026-06-17

## Goal

Deliver the first playable version of an 8-bit Pac-Man-inspired browser game where a player can complete a maze-chase round using custom character identities.

## Non-Goals

- Exact recreation of original Pac-Man timing rules, ghost AI quirks, or copyrighted presentation.
- Fancy, high-fidelity, realistic, 3D, or heavily animated graphics.
- Multiplayer, user accounts, online leaderboards, monetization, or a general-purpose game engine.
- User-uploaded assets in the first playable version unless later approved as a separate task.

## Users & Context

- Players want a quick, readable arcade experience that feels familiar without needing a tutorial.
- The project owner wants a custom-character Pac-Man-style game that can grow through small playable milestones.
- Creators or friend groups may later want to swap character identities while keeping the same core maze-chase rules.

## Requirements (Outcome-Focused)

- The game must provide a complete round loop: start, play, score, win, lose, and restart.
- The maze-chase rules must be immediately understandable through movement, dots, power-ups, enemies, score, and lives.
- The 8-bit visual direction must be obvious in the first playable version through crisp, simple, low-detail art treatment.
- Custom player and enemy characters must be represented as configurable identities rather than hard-coded one-off visuals.
- The game must remain readable and controllable on common desktop and mobile browser sizes.
- Development must be sliced into independently reviewable tasks that each leave the game closer to playable.

## Acceptance Criteria (Verifiable)

- AC1: A player can launch the game, start a round, move through a maze, collect dots, see score changes, and restart after win or loss.
- AC2: Maze walls, dots, power-ups, player movement, enemy collisions, lives, win state, and loss state work together as a coherent arcade loop.
- AC3: The game presents a consistent 8-bit style with crisp edges, limited detail, strong silhouettes, and no fancy modern visual effects.
- AC4: Player and enemy characters are driven by a configuration model that supports distinct names, colors or sprites, and gameplay-readable states.
- AC5: Enemy behavior creates fair pressure through at least chase, roam, and frightened or vulnerable states.
- AC6: The game is usable with keyboard controls on desktop and touch or on-screen controls on mobile-sized viewports.
- AC7: Each child task includes validation evidence mapped back to the relevant parent acceptance criteria.

## Open Questions (Answer Needed)

- None.

## Decisions (Resolved)

- The product direction is an 8-bit Pac-Man-inspired arcade game with custom characters.
- The first phase optimizes for a complete playable browser game over exact historical arcade fidelity.
- Fancy graphics, 3D visuals, and high-fidelity art are intentionally out of scope.
- The first playable version will use simple 8-bit pixel-shape character rendering and a configuration model, so names/colors can be swapped without waiting on final sprite art.
- Initial custom character names may be placeholders until the project owner supplies final character identities.
- The foundation task should introduce the character identity boundary early, even if the full custom character presentation work is completed in a later task.

## Validation Plan

- Play through at least one full round from start to win or loss and confirm score, lives, restart, and state transitions.
- Test wall collision, dot collection, power-up behavior, enemy collision, and enemy vulnerable state against the acceptance criteria.
- Inspect desktop and mobile-sized viewports for readable 8-bit visuals, non-overlapping UI, and usable controls.
- Review character configuration to confirm player and enemy identities are not hard-coded into game logic.
- Record child task validation evidence in each task's implementation or review notes and preserve parent AC coverage in the epic tracker.
