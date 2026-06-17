<!-- project-workflow:start -->
## Project Workflow

This repository uses project-workflow. Keep workflow state in `.project-workflow/TRACKER.md` and `.project-workflow/tasks/`.

- Read repo-specific workflow guidance from `.project-workflow/guidance.md`.
- To install or refresh project-workflow itself, run `uvx --from git+https://github.com/johndetlefs/project-workflow.git project init` from the repository root; add `--agent codex`, `--agent cursor`, `--agent claude-code`, or `--agent github-copilot` when selecting a mode. Do not use bare `project init` unless the package is intentionally installed and known to be current.
- Use `./.project-workflow/cli/workflow` for supported task and validation commands.
- Use `./.project-workflow/cli/workflow task status --id <TASK-ID> --to <STATUS>` for tracker lifecycle changes.
- Run `./.project-workflow/cli/workflow doctor` after tracker or task-doc changes.
<!-- project-workflow:end -->
