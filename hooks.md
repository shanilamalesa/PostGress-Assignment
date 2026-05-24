## Git Hooks Reflection

### What problems do pre-commit hooks solve?

Pre-commit hooks solve the problem of inconsistent code formatting and
bad commit messages getting into the codebase. Without them, developers
can push messy code or unhelpful commit messages like "fixed stuff" that
make it hard to understand the project history.

### What is the cost of a slow pre-commit hook?

If a pre-commit hook is too slow, developers get frustrated waiting and
start using --no-verify to skip it entirely. This defeats the whole
purpose of having hooks in the first place.

### When should you use --no-verify and when should you never?

You can use --no-verify in an emergency, like hotfixing a production bug
where every second counts. You should never use it just because the hook
is annoying or to sneak in code that would fail the checks — that breaks
trust with your team.

### What would you add next?

I would add a pre-push hook that runs the full test suite so broken code
never reaches the remote. I would also add ESLint to catch code errors,
not just formatting issues.
