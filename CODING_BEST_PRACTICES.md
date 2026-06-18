# Coding Best Practices for AI Video Dashboard

This document outlines the coding best practices to be followed throughout the project. Adhering to these practices ensures code quality, maintainability, consistency, and accessibility.

> **📋 For Claude/AI Code Generation**: Refer to [`.claude-prompt.md`](./.claude-prompt.md) and [`packages/web/.instructions.md`](packages/web/.instructions.md) for detailed AI-executable guidelines.

## Table of Contents
0. [Claude AI Code Guidelines](#claude-ai-code-guidelines)
1. [TypeScript Practices](#typescript-practices)
2. [React Practices](#react-practices)
3. [Styling & Tailwind CSS](#styling--tailwind-css)
4. [Accessibility (a11y)](#accessibility-a11y)
5. [Performance](#performance)
6. [Code Organization](#code-organization)
7. [Naming Conventions](#naming-conventions)
8. [Documentation & Comments](#documentation--comments)
9. [Testing](#testing)
10. [Git & Workflow](#git--workflow)

---

## Claude AI Code Guidelines

When requesting code changes from Claude AI, ensure compliance with:

- **`.claude-prompt.md`** - High-level guidelines for code generation, build requirements, and project structure
- **`packages/web/.instructions.md`** - Detailed technical requirements specific to the web package

### Key Requirements for Claude-Generated Code:
- ✅ Must pass `pnpm build` with zero errors
- ✅ Must have zero TypeScript errors after compilation
- ✅ Must follow React best practices (no cascading renders)
- ✅ Must use proper TypeScript typing (no `any` types)
- ✅ Must not cause hydration mismatches in Next.js
- ✅ Must clean up side effects (listeners, subscriptions)

---

## TypeScript Practices

- **Use Strict Mode**: Enable `strict` in `tsconfig.json` to catch errors early.
- **Prefer Interfaces Over Types**: Use `interface` for object shapes, `type` for unions, tuples, and mapped types.
- **Avoid `any`**: Use `unknown` when type is uncertain and narrow it down. If you must use `any`, document why.
- **Explicit Return Types**: Always specify return types for functions, especially exported ones.
- **Const Assertions**: Use `as const` for objects that should be treated as immutable literals.
- **Discriminated Unions**: Use for mutually exclusive state (e.g., loading, success, error).
- **Avoid `any` in Arrays**: Prefer `Array<Type>` over `any[]`.
- **Use `readonly`**: Mark arrays and objects as `readonly` when they shouldn't be mutated.
- **Leverage Utility Types**: Use `Partial`, `Required`, `Pick`, `Omit`, `Record`, etc., appropriately.
- **Enum Alternatives**: Prefer `const` objects with `as const` over `enum` for better type safety and smaller bundle size.

## React Practices

- **Function Components**: Use function components with hooks; avoid class components.
- **Hooks Rules**: Only call hooks at the top level; never inside loops, conditions, or nested functions.
- **Custom Hooks**: Extract reusable logic into custom hooks (prefixed with `use`).
- **Memoization**: 
  - Use `useMemo` for expensive computations.
  - Use `useCallback` for referentially stable functions (especially when passed as props).
  - Memoize components with `React.memo` when props are stable and re-renders are costly.
- **State Management**:
  - Colocate state: Keep state close to where it's used.
  - Lift state up only when necessary.
  - Use `useReducer` for complex state logic.
  - Prefer `useState` for primitive values, `useReducer` for objects/arrays.
- **Event Handlers**:
  - Name handlers with `handle` prefix (e.g., `handleClick`, `handleSubmit`).
  - Pass down handler functions, not state setter functions, to avoid unnecessary re-renders.
- **Lists and Keys**: Always provide a unique `key` prop when rendering lists; use stable IDs, not indices.
- **Fragments**: Use `<>...</>` or `<React.Fragment>` to avoid unnecessary wrapper elements.
- **Conditional Rendering**: Use logical `&&` for simple conditions, ternary for if-else, and extract complex conditions to variables or functions.
- **Avoid Prop Drilling**: Use context or state management libraries (like Zustand, Jotai) for deeply nested props.
- **Error Boundaries**: Implement error boundaries for graceful error handling in UI.

## Styling & Tailwind CSS

- **Utility-First**: Use Tailwind utility classes for styling; avoid custom CSS when possible.
- **Design Tokens**: Define colors, spacing, typography, etc., in `tailwind.config.js` and use them via Tailwind's design token syntax (e.g., `text-primary`, `bg-secondary`).
- **Component Styling**:
  - Apply base styles with utilities.
  - Use `className` prop for extendability.
  - For component-internal styles, use `@apply` sparingly in a separate CSS file or within a `style` tag in the component (if using CSS modules).
- **Dark Mode**: Use `dark:` variant for all color-related utilities; ensure all components support dark mode.
- **Responsive Design**: Use responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) for breakpoints.
- **Avoid Arbitrary Values**: Define values in `tailwind.config.js` instead of using arbitrary values (e.g., `[#123456]`).
- **Pseudo-classes**: Use Tailwind's pseudo-class variants (e.g., `hover:`, `focus:`, `active:`, `disabled:`).
- **Accessibility**: Ensure sufficient contrast; use `focus-visible` for keyboard focus indicators.
- **Performance**: 
  - Purge unused classes (Tailwind does this by default in production).
  - Avoid long class strings; consider using `tw-merge` or `clsx` for conditional class merging.
  - Use `@layer` to organize custom CSS.

## Accessibility (a11y)

- **Keyboard Navigation**: Ensure all interactive elements are reachable and operable via keyboard.
- **Focus Management**: 
  - Never remove focus outlines without providing a visible alternative.
  - Manage focus in modals, dropdowns, and dynamic content.
- **ARIA Attributes**: 
  - Use `aria-label`, `aria-labelledby`, `aria-describedb` appropriately.
  - Use `aria-expanded`, `aria-controls`, `aria-haspopup` for interactive components.
- **Semantic HTML**: Use appropriate HTML elements (`button`, `nav`, `header`, `main`, `section`, etc.).
- **Color Contrast**: 
  - Text: Minimum 4.5:1 contrast ratio (AA).
  - Large text: 3:1.
  - UI components: 3:1.
- **Text Resizing**: Ensure layout works when text is resized up to 200%.
- **Screen Reader Testing**: Test with screen readers (NVDA, VoiceOver) for critical components.
- **Alt Text**: Provide meaningful `alt` text for images; use `alt=""` for decorative images.
- **Form Elements**: 
  - Associate labels with inputs using `htmlFor` and `id`.
  - Use `fieldset` and `legend` for grouped inputs.
  - Provide clear error messages and instructions.
- **Touch Targets**: Minimum 44x44 dp for touch targets.
- **Motion Sensitivity**: Respect `prefers-reduced-motion`; avoid non-essential animations.

## Performance

- **Bundle Size**: 
  - Monitor bundle size impact of new dependencies.
  - Use dynamic imports (`next/dynamic`) for non-critical components.
  - Prefer native browser APIs over large libraries when possible.
- **Rendering**:
  - Memoize expensive computations with `useMemo`.
  - Memoize event handlers with `useCallback`.
  - Use `React.memo` for components that re-render frequently with same props.
  - Virtualize long lists (e.g., with `react-window` or `react-virtualized`).
- **Images**: 
  - Use `next/image` for automatic optimization, lazy loading, and responsive images.
  - Provide proper `width` and `height` to avoid layout shift.
- **Font Loading**: 
  - Use `font-display: swap` for custom fonts.
  - Preload critical fonts with `<link rel="preload">`.
- **Third-Party Scripts**: 
  - Load non-essential scripts asynchronously or defer.
  - Use `next/script` for optimal loading strategies.
- **Server Components**: Leverage React Server Components (RSC) where appropriate to reduce client-side JavaScript.
- **Streaming**: Use Suspense for streaming HTML on the server.

## Code Organization

- **Feature-Based Structure**: Organize code by features or domains, not just by type (e.g., `/components/dashboard/`, `/components/upload/`).
- **Component Colocation**: Keep a component's files together: 
  - `Component.tsx`
  - `Component.stories.tsx` (if using Storybook)
  - `Component.test.tsx` (if applicable)
  - `Component.styles.css` or `Component.module.css` (if needed)
  - `types.ts` (if component-specific types)
- **Barrel Exports**: Avoid deep barrel exports; use them only for public API of a directory (e.g., `/components/ui/index.ts`).
- **Utilities**: Place reusable utility functions in `/lib/` or `/utils/` directory.
- **Constants**: Define constants in `/constants/` or within the feature directory if scoped.
- **Styles (global)**: Global styles in `/styles/`; component-specific styles co-located.
- **Assets**: 
  - Images: `/public/images/`
  - Icons: `/public/icons/` or use inline SVGs.
  - Fonts: `/public/fonts/` or use `@font-face` in CSS.

## Naming Conventions

- **Components**: PascalCase (e.g., `VideoPlayer`, `UploadButton`).
- **Functions and Variables**: camelCase (e.g., `getUserData`, `isLoading`).
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_UPLOAD_SIZE`, `API_ENDPOINT`).
- **Files**: 
  - Components: PascalCase (e.g., `VideoPlayer.tsx`)
  - Utilities and helpers: camelCase (e.g., `formatTime.ts`)
  - Constants: UPPER_SNAKE_CASE (e.g., `APP_CONSTANTS.ts`)
  - Styles: kebab-case (e.g., `video-player.module.css`)
- **Props and State**: 
  - Boolean: Prefix with `is`, `has`, `should`, `can` (e.g., `isVisible`, `hasError`).
  - Callback: Prefix with `on` (e.g., `onClick`, `onSubmit`).
  - Event handler: Use past tense for events that have occurred (`onClick`), present for future (`onSubmit`).
- **Avoid**: 
  - Underscores in JavaScript/TypeScript identifiers.
  - Ambiguous names like `data`, `items`, `handleStuff`.
  - Single-letter variables (except for loop indices in short scopes).

## Documentation & Comments

- **JSDoc**: 
  - Add JSDoc comments for all exported functions, components, and types.
  - Include `@param`, `@returns`, `@throws`, and `@example` where applicable.
- **README**: Keep project README updated with setup, usage, and contribution guidelines.
- **Inline Comments**: 
  - Explain why, not what.
  - Use TODOs with timestamps or issue references (e.g., `// TODO: #123 - Refactor this when API stabilizes`).
  - Avoid commented-out code; delete it or use feature flags.
- **Changelog**: Maintain a `CHANGELOG.md` for notable changes per version.

## Testing

- **Unit Tests**: 
  - Write tests for pure functions, custom hooks, and component logic.
  - Use Jest and React Testing Library.
  - Aim for high coverage on business logic and utilities.
- **Integration Tests**: 
  - Test component interactions and data flow.
  - Use React Testing Library for user-centric tests.
- **End-to-End Tests**: 
  - Consider Cypress or Playwright for critical user flows (optional for now).
- **Accessibility Tests**: 
  - Use `jest-axe` for automated accessibility testing in unit tests.
- **Visual Regression**: 
  - Consider Storybook with Chromatic for UI regression (optional).
- **Test Practices**: 
  - Write tests before or alongside implementation (TDD or TDD-like).
  - Test edge cases and error conditions.
  - Mock external dependencies (APIs, timers).
  - Keep tests readable and maintainable.

## Git & Workflow

- **Commit Messages**: 
  - Use conventional commits: `feat: add video upload`, `fix: resolve timeline seek bug`, `docs: update API reference`.
  - Keep subject line under 50 characters; body under 72 characters.
  - Reference issues: `fix: close video on escape (#123)`.
- **Branching**: 
  - Use feature branches: `feature/video-upload`, `bugfix/timeline-snap`.
  - Keep branches short-lived.
- **Pull Requests**: 
  - Provide clear description and context.
  - Link to related issues.
  - Request review from at least one team member.
  - Ensure all checks pass before merging.
- **Code Review**: 
  - Look for correctness, readability, adherence to practices.
  - Check for accessibility, performance, and security implications.
  - Ask questions if unsure.
- **Dependency Management**: 
  - Audit dependencies regularly (`npm audit` or `pnpm audit`).
  - Keep dependencies updated; use tools like `Dependabot` or `Renovate`.
  - Avoid adding heavy libraries for minor utility functions.

## When in Doubt

1. **Check Existing Code**: Look for similar patterns in `/packages/web/src/components/`.
2. **Consult Documentation**: 
   - TypeScript: https://www.typescriptlang.org/docs/
   - React: https://react.dev/reference
   - Tailwind CSS: https://tailwindcss.com/docs
   - Accessibility: https://webaim.org/standards/wcag/checklist
3. **Ask for Clarification**: If uncertain, raise the issue for discussion before proceeding.
4. **Prototype First**: For complex changes, create a quick prototype to validate the approach.
5. **Consider Impact**: Evaluate how the change affects performance, accessibility, and bundle size.

## Violations & Escalation

If a proposed change violates these principles:
- Clearly state the violation in code review.
- Suggest a specific alternative that adheres to guidelines.
- If unclear about the best approach, raise the issue for team discussion.
- Do not merge code that knowingly violates accessibility requirements.