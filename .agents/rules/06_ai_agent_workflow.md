# Agent Rule: Autonomous Workflow, Mandatory Testing & Self-Updating Documentation

## 1. Phased Task Execution Architecture
- Every task must be carried out following the roadmap hierarchy:
  `Sprint` → `Feature` → `Feature Specification` → `Atomic Task`.
- Do NOT jump between disconnected tasks. Finish one atomic unit, verify it completely, and register it before advancing.

## 2. Mandatory Pre & Post Testing (Rule of Verification)
- **Mandatory Pre-Testing (التجربة والتحقق قبل أي تعديل):**
  - Before writing or editing code, verify the current baseline and analyze the existing component or file.
  - Ensure the change is strictly necessary and understand all downstream dependencies.
- **Mandatory Post-Testing (التجربة والتحقق بعد أي تعديل):**
  - After executing any code edit, run static analysis and build verification (`npm run lint`, `tsc --noEmit`, or `npm run build`).
  - Zero warnings and zero errors are required before marking any task as complete.

## 3. Mandatory Self-Updating Documentation Protocol
Whenever an AI Agent completes any feature, component, bug fix, or refactor, it MUST immediately update three core project documents:

1. **`docs/ROADMAP_AND_SPRINTS.md`:**
   - Mark the completed task checkbox as `[x]`.
   - Record the exact completion timestamp: `[Completed: YYYY-MM-DD HH:mm]`.
   - Ensure the roadmap remains the living single source of truth for project progress.

2. **`docs/PROJECT_HISTORY.md`:**
   - Append a new chronological entry with the exact timestamp.
   - List the modified/created files and a concise summary of the engineering changes.

3. **`docs/AI_MEMORY.md`:**
   - Update the working memory buffer with any newly established decisions, tokens, or architectural state so future agents retain perfect context.
