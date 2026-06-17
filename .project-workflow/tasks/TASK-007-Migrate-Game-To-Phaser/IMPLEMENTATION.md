## User Story

As the project owner, I want the current Pac-Man-style game migrated to Phaser, so that future sprites, animation, sound, tilemap, and arcade polish work can build on a game framework instead of ad hoc DOM rendering.

## Goal

Migrate the current game to Phaser without changing its current gameplay scope.

## Approach

Introduce a project-managed Phaser runtime, move board rendering and update-loop behavior into Phaser scenes, preserve the current data-driven character configuration, and replace the temporary debug hook with a more intentional validation seam.

## Phases

- Phase 1: Add Phaser dependency/loading and local run documentation.
- Phase 2: Recreate the current board, HUD, character roster, and 8-bit presentation in a Phaser-backed structure.
- Phase 3: Port player movement, dot collection, maze clear, enemy movement, chase/roam modes, and player-hit behavior.
- Phase 4: Add or update validation so migrated behavior is covered without relying on the current temporary debug hook.

## Acceptance Criteria

- [ ] AC1: Phaser-backed game launches locally with the current arcade shell.
- [ ] AC2: Current maze traversal, wall collision, dot collection, scoring/progress, and maze clear behavior are preserved.
- [ ] AC3: Current enemy legal movement, chase/roam behavior, and player-hit state are preserved.
- [ ] AC4: Character identities remain data-driven and separate from Phaser scene state.
- [ ] AC5: Phaser dependency/loading is local/project-managed and documented.
- [ ] AC6: Migrated behavior has validation evidence and no longer depends on the temporary `window.pixelPacDebug` hook.

## Validation

- AC1: Launch the local Phaser game and confirm the shell renders.
- AC2: Verify player movement, wall blocking, dot collection, score/progress, and maze clear.
- AC3: Verify enemy legal movement, chase/roam modes, and player-hit state.
- AC4: Review character config boundaries after migration.
- AC5: Verify documented local run path and dependency setup.
- AC6: Run the new or updated automated validation and record evidence.

## Task List

| ID | Title | Description | Acceptance Criteria | User Verification | Status |
| --: | ----- | ----------- | ------------------- | ----------------- | ------ |
| 1 | Add Phaser runtime | Add project-managed Phaser loading and document the local run path. | AC1, AC5: Phaser game launches locally without CDN-only dependency | Run documented local command or open path | To Do |
| 2 | Port rendering shell | Recreate the board, HUD, roster, and 8-bit presentation in the Phaser-backed app. | AC1, AC4: Shell renders and character data remains separate | Inspect game shell and config boundaries | To Do |
| 3 | Port player and collectibles | Preserve movement, wall collision, dot collection, scoring/progress, and maze clear. | AC2: Current player/maze behavior works | Run gameplay validation | To Do |
| 4 | Port enemies and collisions | Preserve legal enemy movement, chase/roam modes, and player-hit state. | AC3: Enemy behavior and hit state work | Run enemy validation | To Do |
| 5 | Replace validation seam | Replace or formalize `window.pixelPacDebug` with a proper migrated validation path. | AC6: Automated validation covers migrated behavior | Run validation checks | To Do |
| 6 | Record evidence | Update implementation notes with validation evidence and remaining risks. | AC1, AC2, AC3, AC4, AC5, AC6: Evidence recorded | Review this file before QA | To Do |

## QA & Code Review

- Verdict: Pending
- Evidence: Pending
- Findings: Pending

## Retro

- Reusable lessons: Pending
- Conventions or agent assets updated: Pending
- Follow-up tasks: Pending

## Notes

- Task: TASK-007
- Title: Migrate Game To Phaser
- Created: 2026-06-17
