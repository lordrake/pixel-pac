# Project Workflow Guidance

Use this file for repo-specific workflow guidance that should survive project-workflow init refreshes.

Add local conventions, validation commands, safety constraints, handoff rules, and agent notes here.

## Local Workflow Conventions

- After a successful `project-qa-review` verdict (`Pass` or `Pass with follow-ups`), commit the reviewed code and workflow artifact changes unless the user explicitly asks not to.
- Do not mark a task `Complete` unless the user explicitly asks for completion, even when the QA review passes and the changes are committed.
