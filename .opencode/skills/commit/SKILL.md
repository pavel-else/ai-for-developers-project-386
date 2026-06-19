---
name: commit
description: Commits all changes with a Conventional Commit message. Use when the user says "commit", "сделай коммит", or "коммит".
---

# Commit

Always stage everything, then inspect changes to write a proper Conventional Commit message.

1. Run `git add -A` — stage all unstaged changes
2. Run `git diff --cached` to see what changed, and `git log --oneline -5` for recent commit context
3. Read the diff and determine the commit type:
   - `feat` — new feature, new file/functionality added
   - `fix` — bug fix, incorrect behavior corrected
   - `refactor` — restructuring without changing behavior
   - `docs` — documentation, comments, i18n, typos
   - `chore` — build config, dependencies, formatting, tooling
4. Write the message as: `<type>: <short imperative description in English>` (≤72 chars)
   - If the change warrants a longer explanation, append `-m "<body>"` with a blank line between title and body
5. Run `git commit -m "<type>: <description>"` (with optional `-m "<body>"`)
6. Show the result with `git log --oneline -1`

If no files were staged at step 1 (nothing changed), print "Nothing to commit." and stop.
