# Skill: Frontend State Management

## Trigger
When adding client-side state (e.g. search, filters).

## Steps
- Prefer URL state (useSearchParams) for shareable state (search query, category filter)
- Use useState for local UI state (modal open, dropdown)
- Keep state close to where it is used; avoid prop drilling beyond 2 levels
