# Frontend Design System Best Practices

## Core Principles
1. **Reusability**: Components should be designed for reuse across different contexts
2. **Composability**: Build complex UIs by combining simple, focused components
3. **Consistency**: Maintain visual and behavioral consistency through design tokens
4. **Accessibility**: All components must be accessible by default (WCAG 2.1 AA)
5. **Performance**: Optimize for rendering performance and bundle size
6. **Developer Experience**: Clear APIs, documentation, and type safety

## Strict Rules

### Component Architecture
- ✅ **DO**: Create atomic components (buttons, inputs, icons) that encapsulate single responsibilities
- ✅ **DO**: Use composition over inheritance for component variations
- ✅ **DO**: Accept `className` prop for extendability (follows `@radix-ui/react-slot` pattern)
- ✅ **DO**: Export components with clear, descriptive names (PascalCase)
- ❌ **DON'T**: Create overly specific components that can't be reused
- ❌ **DON'T**: Hardcode styles that prevent contextual overrides
- ❌ **DON'T**: Create components with excessive prop drilling (>3 levels)

### Styling & Design Tokens
- ✅ **DO**: Use Tailwind CSS utility classes for styling
- ✅ **DO**: Define design tokens in `tailwind.config.js` (colors, spacing, typography, shadows)
- ✅ **DO**: Use semantic class names that describe purpose, not appearance (when creating custom CSS)
- ✅ **DO**: Leverage Tailwind's `@apply` sparingly for component internal styles
- ✅ **DO**: Use dark mode variants (`dark:`) for all color-related utilities
- ❌ **DON'T**: Use arbitrary values (`[#123456]`) without defining them as tokens first
- ❌ **DON'T**: Mix CSS-in-JS with Tailwind utilities in the same component
- ❌ **DON'T**: Hardcode pixel values; use Tailwind's spacing scale

### Accessibility (Non-Negotiable)
- ✅ **DO**: Ensure all interactive elements are keyboard navigable
- ✅ **DO**: Provide meaningful `aria-label`s for icons and button-only controls
- ✅ **DO**: Maintain sufficient color contrast (minimum 4.5:1 for text)
- ✅ **DO**: Use semantic HTML elements (button, nav, header, etc.) appropriately
- ✅ **DO**: Test with screen readers (NVDA, VoiceOver) for critical components
- ❌ **DON'T**: Remove focus outlines without providing visible focus alternatives
- ❌ **DON'T**: Use color as the sole means of conveying information
- ❌ **DON'T**: Ignore mobile touch target sizes (minimum 44x44dp)

### Performance Guidelines
- ✅ **DO**: Lazy-load non-critical components and assets
- ✅ **DO**: Use `next/image` for image optimization (with proper sizing)
- ✅ **DO**: Memoize expensive computations with `useMemo` and `useCallback`
- ✅ **DO**: Split code at route level with Next.js dynamic imports
- ✅ **DO**: Monitor bundle size impact of new dependencies
- ❌ **DON'T**: Block the main thread with synchronous operations >50ms
- ❌ **DON'T**: Load large libraries for minor utility functions
- ❌ **DON'T**: Cause layout shifts without using `next/image` or proper sizing

### Code Organization
- ✅ **DO**: Follow the `components/` directory structure:
  - `components/ui/` - primitive, unstyled components (if using Radix)
  - `components/` - application-specific, styled components
  - `components/layout/` - layout components (header, footer, sidebar)
- ✅ **DO**: Keep components in their own directories with associated styles/tests
- ✅ **DO**: Use barrel exports (`index.ts`) only for public API, not internal organization
- ✅ **DO**: Place TypeScript interfaces near their usage or in dedicated `types/` folder
- ❌ **DON'T**: Create deeply nested component hierarchies (>4 levels)
- ❌ **DON'T**: Put page-specific components in shared directories
- ❌ **DON'T**: Mix business logic with presentation in components

### Props & State Management
- ✅ **DO**: Use TypeScript interfaces for all component props
- ✅ **DO**: Make props optional only when truly optional (avoid `any` or `unknown`)
- ✅ **DO**: Use discriminated unions for mutually exclusive prop combinations
- ✅ **DO**: Lift state up only when necessary; prefer colocation
- ✅ **DO**: Use context sparingly for truly global state (theme, auth, i18n)
- ❌ **DON'T**: Pass excessive props (>7) - consider config objects
- ❌ **DON'T**: Mutate props directly; treat them as immutable
- ❌ **DON'T**: Use `useEffect` for props synchronization when derivable from props

### Naming Conventions
- ✅ **DO**: Use PascalCase for component names (`Button`, `VideoPlayer`)
- ✅ **DO**: Use camelCase for props and state variables (`isLoading`, `onChange`)
- ✅ **DO**: Prefix boolean props with `is`, `has`, `should`, `can` (`isVisible`, `hasError`)
- ✅ **DO**: Use past tense for event handlers that have occurred (`onClick`, `onChange`)
- ✅ **DO**: Use present tense for event handlers that will occur (`onSubmit`, `onSave`)
- ❌ **DON'T**: Use ambiguous names like `handleStuff`, `data`, `items`
- ❌ **DON'T**: Use underscores in JavaScript/TypeScript identifiers

### Documentation & Standards
- ✅ **DO**: Add JSDoc comments for all exported components and hooks
- ✅ **DO**: Include usage examples in JSDoc for complex components
- ✅ **DO**: Maintain a `STORIES.md` or Storybook for visual regression testing
- ✅ **DO**: Update this document when establishing new patterns
- ❌ **DON'T**: Commit code without corresponding type definitions
- ❌ **DON'T**: Leave TODO comments unresolved for >1 week
- ❌ **DON'T**: Add dependencies without discussing impact on bundle size

## Component Checklist (Before Considering Complete)
- [ ] Responsive behavior tested at mobile, tablet, desktop breakpoints
- [ ] Keyboard navigation functional (Tab, Enter, Space, Escape as appropriate)
- [ ] Screen reader announced changes and states
- [ ] Color contrast verified (4.5:1 text, 3:1 graphics/UI)
- [ ] TypeScript types cover all props and return values
- [ ] No console warnings/errors in development
- [ ] Bundle impact measured (<5kb gzipped for UI components)
- [ ] Follows existing code patterns in the codebase
- [ ] Includes at least one usage example in documentation
- [ ] Handles loading, error, and empty states appropriately

## When in Doubt
1. Check existing components in `/packages/web/src/components/` for patterns
2. Refer to Radix UI primitives for behavior and accessibility standards
3. Consult the Tailwind CSS documentation for utility class usage
4. Ask: "Would this component be useful in 3 different unrelated contexts?"
5. If the answer is no, reconsider the abstraction level

## Violations & Escalation
If a proposed change violates these principles:
- Clearly state the violation in code review
- Suggest a specific alternative that adheres to guidelines
- If unclear about the best approach, raise the issue for team discussion
- Do not merge code that knowingly violates accessibility requirements