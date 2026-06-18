# Claude Code Generation Guidelines

This file contains specific guidance for Claude AI when generating code for this project.

## Reference Files
- **Root prompt**: [`.claude-prompt.md`](../../.claude-prompt.md) - High-level guidelines and patterns
- **Technical specs**: [`.instructions.md`](./.instructions.md) - Detailed requirements for web package
- **Best practices**: [`CODING_BEST_PRACTICES.md`](../../CODING_BEST_PRACTICES.md) - General coding standards

## Key Requirements

### Build & Compilation
- ✅ `pnpm build` must pass with zero errors
- ✅ TypeScript type checking must pass
- ✅ No console errors in development

### React & TypeScript
- ✅ No `any` types - always define interfaces
- ✅ Proper event typing: `React.ChangeEvent<HTMLInputElement>`
- ✅ Proper ref typing: `React.RefObject<T>`, `useImperativeHandle`
- ✅ Export types used by other components

### Effects & State
- ✅ Never call `setState` directly in effect bodies
- ✅ Use `useMemo` for derived values instead of state + effects
- ✅ Use `useCallback` for event handlers passed as props
- ✅ Minimal effect dependencies
- ✅ Always clean up listeners/subscriptions

### Hydration
- ✅ No `typeof window === 'undefined'` in state initializers
- ✅ Use safe defaults, sync post-hydration with effects
- ✅ Server and client must render identically initially

## See Also
- @AGENTS.md - Next.js version-specific warnings

