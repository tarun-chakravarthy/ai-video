# Project Guidance Files - Quick Navigation

This document helps you find the right guidance file for your needs.

## 🎯 For Different Audiences

### I'm requesting code from Claude AI
**Start here:** [`.claude-prompt.md`](.claude-prompt.md)
- High-level guidelines for code generation
- Do's and Don'ts
- Common patterns
- Build requirements

**Then check:** [`packages/web/.instructions.md`](packages/web/.instructions.md)
- Technical details specific to the web package
- Component structure patterns
- React best practices

**Also see:** [`packages/web/CLAUDE.md`](packages/web/CLAUDE.md) - Quick reference for web-specific requirements

### I'm writing code manually
**Start here:** [`CODING_BEST_PRACTICES.md`](CODING_BEST_PRACTICES.md)
- General coding standards
- TypeScript patterns
- React best practices
- Naming conventions
- Documentation standards

### I'm uncertain which approach to use
**Start here:** [`AUTO_SKILL_PICKER_GUIDE.md`](AUTO_SKILL_PICKER_GUIDE.md)
- Decision framework for choosing between approaches
- How to evaluate tradeoffs
- Conflict resolution

### I'm working on the web package
**Check:** [`packages/web/AGENTS.md`](packages/web/AGENTS.md)
- Next.js 16.2.9 specific warnings
- Version compatibility notes

### I need project context/architecture
**Check:** [`SOLUTION_ARCHITECTURE.md`](SOLUTION_ARCHITECTURE.md)
- System design overview
- Component relationships
- Data flow

## 📋 File Reference Guide

| File | Purpose | Audience |
|------|---------|----------|
| `.claude-prompt.md` | AI code generation guidelines | Claude AI, Developers |
| `packages/web/.instructions.md` | Technical requirements for web | Claude AI, TypeScript developers |
| `packages/web/CLAUDE.md` | Quick reference for Claude | Claude AI, Developers |
| `packages/web/AGENTS.md` | Next.js version warnings | All developers |
| `CODING_BEST_PRACTICES.md` | General coding standards | All developers |
| `AUTO_SKILL_PICKER_GUIDE.md` | Decision framework | Project managers, Decision makers |
| `SOLUTION_ARCHITECTURE.md` | System design | Architects, Tech leads |
| `PROJECT_MANAGEMENT_GUIDELINES.md` | Project workflow | Project managers |
| `FRONTEND_DESIGN_SYSTEM_BEST_PRACTICES.md` | UI/UX standards | Frontend developers, Designers |
| `TESTING_PLAN.md` | Testing strategy | QA, Developers |
| `VALIDATION_RESULTS.md` | Test/validation results | QA, Project managers |

## 🔗 How Files Connect

```
.claude-prompt.md (ROOT LEVEL)
├── Used by Claude AI for all code generation
├── References: packages/web/.instructions.md
└── Ensures: pnpm build passes, zero TS errors

packages/web/.instructions.md (WEB PACKAGE)
├── Details technical requirements
├── Complements: .claude-prompt.md
└── Used by: Claude AI, Web developers

CODING_BEST_PRACTICES.md
├── General coding standards
├── References: .claude-prompt.md and .instructions.md
└── Used by: All developers

AUTO_SKILL_PICKER_GUIDE.md
├── Decision framework
├── References: .claude-prompt.md
└── Used by: When uncertain about approaches
```

## ✅ Checklist for New Features

- [ ] Read relevant guidance file(s) from above
- [ ] Follow TypeScript patterns from CODING_BEST_PRACTICES.md
- [ ] If requesting code: Include `.claude-prompt.md` in context
- [ ] Run `pnpm build` to verify
- [ ] Check for TypeScript errors
- [ ] Commit with clear message
- [ ] Push to GitHub

## 🚀 Quick Tips

**For Claude code requests:**
```
I'll follow the guidelines in:
- .claude-prompt.md
- packages/web/.instructions.md

Please ensure:
- pnpm build passes
- Zero TypeScript errors
- [Your specific requirements]
```

**For manual coding:**
1. Reference CODING_BEST_PRACTICES.md patterns
2. Check .claude-prompt.md for patterns
3. Run `pnpm build` frequently
4. Keep effects minimal and clean

**When stuck:**
1. Check AUTO_SKILL_PICKER_GUIDE.md
2. Review SOLUTION_ARCHITECTURE.md
3. Ask Claude with context from .claude-prompt.md

## 📝 Updating Guidance Files

When the project evolves:
1. Update .claude-prompt.md first (affects all future Claude requests)
2. Update .instructions.md with specific technical changes
3. Update CODING_BEST_PRACTICES.md with new patterns
4. Update SOLUTION_ARCHITECTURE.md if design changes
5. Keep other files in sync as needed

---

**Last Updated**: 2026-06-18
**Project**: AI Video Dashboard
**Framework**: Next.js 16.2.9 + React 19 + Tailwind CSS 4
