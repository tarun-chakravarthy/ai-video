# AI Video Dashboard - TLDR

## What Is This?
A modern **video editing dashboard** with AI features. Upload videos, create clips, edit timelines, and get AI suggestions - all in one place.

## Tech Stack
- **Framework**: Next.js 16.2.9 + React 19
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Language**: TypeScript (strict mode)
- **Video**: Custom player, timeline, clip editor

## Key Features
✅ Upload videos  
✅ Create & manage clips  
✅ Visual timeline editor  
✅ Video preview with playback controls  
✅ Keyboard shortcuts for editing  
✅ Export/download videos  
✅ AI suggestions for content  
✅ Dark mode + responsive design  

## Project Status
✅ **Build**: Clean - `pnpm build` passes  
✅ **Types**: Zero TypeScript errors  
✅ **Quality**: Production-ready  
✅ **Git**: Pushed to GitHub  

## Quick Commands
```bash
pnpm dev      # Start development server
pnpm build    # Production build (must pass)
pnpm lint     # Code linting
```

## For Code Requests
📋 Reference: [`.claude-prompt.md`](.claude-prompt.md)

Key rules:
- Zero `any` types
- Proper TypeScript interfaces
- No cascading renders
- Pass `pnpm build`
- Clean up effects/listeners

## File Structure
```
packages/web/src/
├── app/
│   ├── page.tsx           # Main dashboard
│   └── layout.tsx
└── components/
    ├── video-dashboard.tsx
    ├── video-preview.tsx
    ├── story-timeline.tsx
    ├── editing-tools.tsx
    ├── ai-suggestions.tsx
    ├── export-controls.tsx
    └── upload-interface.tsx
```

## Guidance Files (In Order of Usefulness)
1. [`.claude-prompt.md`](./.claude-prompt.md) - For Claude AI code requests
2. [`packages/web/.instructions.md`](packages/web/.instructions.md) - Technical details
3. [`CODING_BEST_PRACTICES.md`](CODING_BEST_PRACTICES.md) - General standards
4. [`GUIDANCE_OVERVIEW.md`](GUIDANCE_OVERVIEW.md) - Navigation guide

## Git Workflow
```bash
git add .
git commit -m "Your clear message"
git push
# Pushes to: https://github.com/tarun-chakravarthy/ai-video
```

## Current Focus Areas
- ✅ Core video editing functionality
- ✅ Clip management
- ✅ UI/UX polish
- 🔄 Dashboard library integration (shadcn/ui components)
- 📋 Data tables for clip management
- 🎨 Advanced navigation

## The Golden Rule
**Build must always pass**: `pnpm build` with zero errors before committing.

---

**That's it!** Start with `.claude-prompt.md` for code changes. Everything else follows from there.
