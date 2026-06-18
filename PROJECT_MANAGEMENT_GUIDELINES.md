# Agentic AI Development Project Management Guidelines

## Core Principles
1. **Time Boxing**: Strict adherence to maximum work sessions to prevent burnout and maintain focus
2. **Task Limitation**: Constrained scope per session to ensure measurable progress
3. **Progress Tracking**: Transparent tracking of completed work and remaining goals
4. **Sustainable Pace**: Regular breaks and clear session boundaries
5. **Clear Handoffs**: Structured continuation points between sessions

## Hard Limits (Non-Negotiable)

### ⏱️ Time Constraints
- **Maximum Work Session**: 15 minutes of active development time per execution
- **Break Requirement**: Minimum 5-minute break between sessions
- **Daily Cap**: Recommended maximum of 4 sessions (1 hour) per day for sustainable pace
- **Enforcement**: Use internal timer or ScheduleWakeup tool when approaching limits

### 📋 Task Constraints
- **Per Session Maximum**: 
  - Option A: 5 discrete actionable tasks
  - Option B: 2 epics, each containing 5+ related tasks (treated as cohesive units)
- **Sub-task Limitation**: Maximum 1 level of subtasks under main tasks (avoid deep nesting)
- **Task Granularity**: Each task should be completable within 2-3 minutes of focused work
- **Epic Definition**: A epic represents a cohesive feature area requiring multiple related tasks

## Progress Tracking System

### 📊 Task States
Use these exact states in our task management:
- `pending`: Ready to work on
- `in_progress`: Currently being worked on
- `completed`: Finished and verified
- `blocked`: Waiting on external dependency or clarification
- `deprecated`: No longer relevant or superseded

### 🔍 Tracking Requirements
1. **Before Work**: Clearly mark task as `in_progress` when starting
2. **During Work**: Provide brief progress updates at natural breakpoints
3. **After Work**: Mark task as `completed` with specific outcome
4. **Blocked Tasks**: Immediately identify blocking issues and expected resolution time
5. **Session Summary**: End each session with completed/incomplete task summary

## Session Structure Template

### 🚀 Start of Session (0-2 min)
1. Review current task list and priorities
2. Select next task(s) to work on (respecting 5-task/2-epic limit)
3. Mark selected task(s) as `in_progress`
4. State intended outcome for the session
5. Set internal timer for 12-minute work warning (leaving 3 min for wrap-up)

### ⚙️ Work Period (2-12 min)
1. Focus exclusively on selected task(s)
2. Avoid scope creep - if new ideas emerge, note them for later
3. Provide one brief progress update at ~6-minute mark
4. If blocked, immediately identify blocker and seek clarification if possible

### 🏁 Wrap-up (12-15 min)
1. **At 12 min**: Begin concluding work
2. **At 14 min**: Stop all new work
3. **Final 1 min**: 
   - Update task statuses (`completed` or back to `pending`)
   - Add brief notes on what was accomplished
   - Identify any blockers for next session
   - State clear next steps

## Implementation Rules

### ✅ Do:
- Break work into smallest valuable increments
- Complete one task fully before starting another
- Use clear, action-oriented task subjects (verbs first)
- Link related tasks when they form a logical unit
- Report blockers immediately with specific needs
- Take actual breaks between sessions (step away from screen)
- Respect the 15-minute hard stop - it's better to stop mid-task than exceed limit

### ❌ Don't:
- Start more than 5 tasks in a single session
- Create nested subtasks beyond 1 level
- Work past the 15-minute limit without explicit extension request
- Leave tasks in `in_progress` state at session end
- Ignore blockers hoping they'll resolve themselves
- Combine unrelated work under single epic label
- Skip the wrap-up phase to "just finish one more thing"

## Continuation Between Sessions

### 🔄 Handoff Protocol
When ending a session:
1. **Document** what was completed and what remains
2. **Identify** the exact next actionable step
3. **Note** any context needed to resume quickly
4. **Set** clear priority for next session
5. **Schedule** next session if planning ahead (optional)

When resuming:
1. **Review** previous session's notes
2. **Confirm** current priorities still apply
3. **Select** next task(s) from backlog
4. **Begin** with a 1-minute context refresh

## Special Considerations

### 🐛 Bug Fixes
- Treat as single task unless multiple unrelated bugs
- Include reproduction steps in task description
- Mark as `completed` only after fix is verified

### 🔧 Refactoring
- Limit to one cohesive area per session
- Extract interface/task if work exceeds 5 tasks
- Ensure behavior remains unchanged (add verification notes)

### 🚀 Feature Development
- Use epic structure for larger features (2 epics max per session)
- Each epic should deliver user-visible value when complete
- Spike tasks for research limited to 3 minutes max

### 📚 Learning/Research
- Time-box to 3 minutes per session
- Document findings in task notes
- Convert to actionable tasks immediately after research

## Enforcement & Adaptation

### ⚠️ Violation Responses
If approaching limits:
- At 12 min: Announce "3 minutes left to wrap up"
- At 14 min: Announce "1 minute left - concluding work"
- At 15 min: Hard stop regardless of completion state
- If user requests extension: Must specify exact additional time (max 5 min)

### 🔄 Process Improvement
After every 3 sessions:
1. Review what worked/didn't work in process
2. Adjust guidelines based on actual experience
3. Keep what helps, discard what hinders
4. Never sacrifice sustainability for short-term gains

## Example Session Flow

**Session Start (0:00-2:00)**
> "Reviewing task list. Selected: Implement responsive sidebar (Task #3). Marking as in_progress. Goal: Make sidebar collapsible on mobile with toggle button. Timer set for 12-minute warning."

**Mid-point Check (~6:00)**
> "Sidebar toggle button implemented and working. Need to add backdrop and transition effects. On track."

**Wrap-up (12:00-15:00)**
> "12:00 - Beginning wrap-up. Sidebar collapse/expand working with smooth transitions. Added backdrop for mobile. 
> 14:00 - Finalizing code. 
> 14:59 - Task #3 marked completed. Next: Refine dashboard grid (Task #4). Break recommended."

## Benefits of This Approach
- Predictable progress despite AI's tendency to overextend
- Clear communication of what was accomplished each session
- Prevention of scope creep and unfinished work accumulation
- Sustainable working rhythm that models good development practices
- Easy handoff if human needs to take over or review

These guidelines ensure we make consistent, measurable progress while working within healthy constraints - treating the AI assistant as a sustainable partner rather than an endless resource.