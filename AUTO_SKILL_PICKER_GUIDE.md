# Auto Skill Picker Guide: Decision Framework for Agentic AI Development

## Quick Reference for Claude AI Code Generation

**Before requesting code from Claude:**
- Read [`.claude-prompt.md`](./.claude-prompt.md) - Contains all code generation guidelines
- Read [`packages/web/.instructions.md`](packages/web/.instructions.md) - Technical specifics
- Verify `pnpm build` passes before making requests
- Include project constraints in your prompt

**Expected outcomes from Claude-generated code:**
- ✅ Zero TypeScript errors
- ✅ Passes `pnpm build` 
- ✅ Follows React best practices
- ✅ Properly typed (no `any`)
- ✅ No hydration mismatches
- ✅ Production-ready quality

---

## Purpose
This guide serves as an "auto skill picker" - a decision framework to help determine the most appropriate approach when facing uncertainty, conflicts, or confusion during development. It provides structured methods for selecting the right technique, tool, or strategy based on the situation.

## When to Use This Guide
- Facing conflicting requirements or approaches
- Uncertain about which technology or pattern to apply
- Confusion about how to solve a particular problem
- Need to decide between multiple viable solutions
- When standard procedures don't seem to fit the situation

## Core Decision Framework

### Step 1: Clarify the Problem (Always Start Here)
Before picking any approach, ensure you understand:
- **What exactly is the problem?**
- **What are the constraints?** (time, resources, dependencies)
- **What are the success criteria?**
- **Who are the stakeholders affected?**
- **What have we already tried?**

### Step 2: Categorize the Situation
Identify which category best describes your uncertainty:

#### A. Technical Implementation Uncertainty
*When you're unsure about HOW to build something*

#### B. Design/UX Uncertainty
*When you're unsure about WHAT to build or HOW it should work*

#### C. Process/Workflow Uncertainty
*When you're unsure about the BEST way to approach the work*

#### D. Conflict Resolution
*When there are opposing viewpoints or requirements*

#### E. Knowledge Gap
*When you lack necessary information to proceed*

### Step 3: Apply the Appropriate Decision Matrix

#### For Technical Implementation Uncertainty (A)
Use the **TECHNIQUE SELECTION MATRIX**:

| Factor | Consider | Favors Simple Solution | Favors Complex Solution |
|--------|----------|------------------------|-------------------------|
| **Impact** | How critical is this feature? | Low-Medium impact | High impact (core functionality) |
| **Frequency** | How often will it be used? | Rare/Occasional | Frequent/Critical path |
| **Stability** | How likely are requirements to change? | Stable, well-understood | Evolving, uncertain |
| **Effort** | Development time/effort required | <2 hours | >4 hours |
| **Risk** | What if we get it wrong? | Low consequence | High consequence (data loss, UX破坏) |
| **Reusability** | Will this be used elsewhere? | Single use | Multiple contexts |
| **Team Familiarity** | Do we know this well? | Familiar technology/pattern | New/unfamiliar approach |

**Decision Rule**: 
- If 4+ factors favor simple → Use simplest effective solution
- If 4+ factors favor complex → Invest in robust solution
- If tied or 3-3 → Choose moderate complexity with clear escape hatch

#### For Design/UX Uncertainty (B)
Use the **USER-CENTERED DECISION FRAMEWORK**:

1. **User Goals First**: What is the user trying to accomplish?
2. **Context of Use**: Where, when, and how will this be used?
3. **Constraints**: Technical, time, resource limitations
4. **Alternatives**: Sketch 2-3 different approaches
5. **Testability**: How can we validate this quickly?
6. **Accessibility**: Does this work for all users?
7. **Progressive Enhancement**: Can we start simple and enhance?

**Decision Rule**: Choose the option that best satisfies user goals within constraints, prioritizing accessibility and testability.

#### For Process/Workflow Uncertainty (C)
Use the **WORKFLOW OPTIMIZATION MATRIX**:

| Consider | Question | Indicates Need for... |
|----------|----------|----------------------|
| **Blocking** | Is anything preventing progress? | Immediate resolution/escalation |
| **Repetition** | Have we solved similar problems? | Pattern reuse/template |
| **Learning** | Will this teach us something valuable? | Investment in exploration |
| **Dependency** | Are others waiting on this? | Prioritization and communication |
| **Value** | What's the impact of delaying? | Urgency assessment |
| **Enjoyment** | Is this energizing or draining? | Pairing/motivation strategy |

**Decision Rule**: 
- If blocked → Seek immediate clarification
- If high repetition → Create reusable solution
- If high learning value → Time-box exploration
- If others waiting → Communicate and prioritize
- If high delay impact → Focus on MVP first

#### For Conflict Resolution (D)
Use the **CONFLICT RESOLUTION FRAMEWORK**:

1. **Identify Type**: 
   - Technical disagreement (how)
   - Priority disagreement (what/when)
   - Resource disagreement (who/how much)
   - Values disagreement (why)

2. **Gather Data**:
   - What evidence supports each position?
   - What are the trade-offs of each option?
   - What do stakeholders actually need vs. want?

3. **Apply Resolution Principles**:
   - **Technical**: Spike both options, time-boxed comparison
   - **Priority**: Use impact/effort matrix (value vs. cost)
   - **Resource**: Negotiate scope or timeline
   - **Values**: Refer to project principles and goals

4. **Seek Synthesis**:
   - Can we combine elements of both approaches?
   - Is there a third option we haven't considered?
   - What's the minimal viable experiment?

5. **Escalation Path**:
   - Try peer discussion first (15 min)
   - Then team discussion (30 min)
   - Then lead/architect (if needed)
   - Finally stakeholder decision (with options presented)

**Decision Rule**: Aim for consensus, but be ready to escalate to maintain progress. Document the decision and reasoning.

#### For Knowledge Gap (E)
Use the **LEARNING ACQUISITION PROCESS**:

1. **Gap Analysis**:
   - What exactly do we need to know?
   - Why do we need to know it?
   - How will we know when we've learned enough?

2. **Resource Selection**:
   - Documentation (official > tutorials > blogs)
   - Code examples (search for similar implementations)
   - Expert consultation (team members, communities)
   - Hands-on experimentation (time-boxed)

3. **Learning Method**:
   - **Just-in-Time**: Learn only what's needed for immediate task
   - **Just-in-Case**: Learn foundational knowledge for future use
   - **Debugging-first**: Learn by fixing related issues
   - **Explanation-based**: Learn by teaching others

4. **Verification**:
   - Can we explain it simply?
   - Can we apply it to solve the problem?
   - Can we identify when NOT to use it?

**Decision Rule**: Time-box learning to 25 minutes maximum per session. Apply what you learn immediately or document for future reference.

## Special Situations and Protocols

### When Facing Ambiguous Requirements
1. **Ask Clarifying Questions** using the 5 Whys technique
2. **Create Examples**: "Would this scenario work like X or like Y?"
3. **Prototype Options**: Build quick proofs of concept
4. **Define Acceptance Criteria**: What would "done" look like?
5. **Iterate**: Get feedback on prototypes quickly

### When Dealing with Changing Requirements
1. **Separate Stable vs. Unstable**: Identify what's likely to change
2. **Design for Change**: Use abstractions where volatility is high
3. **Version Decisions**: Document what was decided when
4. **Impact Analysis**: Estimate effort of potential changes
5. **Communication Plan**: Keep stakeholders informed of changes

### When Resources Are Limited
1. **Triple Constraint Trade-off**: Scope, Time, Resources - pick two to fix
2. **Minimum Viable Product**: What's the smallest thing that delivers value?
3. **Phased Delivery**: Break into deliverable chunks
4. **Leverage Existing**: Reuse, adapt, or integrate rather than build new
5. **Simplify Ruthlessly**: Remove non-essential features

### When Technical Debt Is Impeding Progress
1. **Make It Visible**: Document the debt and its impact
2. **Quantify Cost**: Estimate time lost due to debt
3. **Boy Scout Rule**: Leave code cleaner than you found it
4. **Strategic Refactoring**: Fix debt as part of feature work
5. **Dedicated Time**: Allocate percentage of each sprint to debt reduction

## Skill Selection Helper: Quick Reference

When you're stuck, ask yourself:

### If you're unsure about TECHNICAL APPROACH:
- ➡️ "What's the simplest thing that could possibly work?"
- ➡️ "How would I explain this to a new team member?"
- ➡️ "What would make this easy to delete or replace?"
- ➡️ "What are the actual risks if we get this wrong?"

### If you're unsure about DESIGN/UX:
- ➡️ "What is the user actually trying to accomplish?"
- ➡️ "What would be frustrating or confusing about this?"
- ➡️ "How would this work on mobile vs. desktop?"
- ➡️ "What error states do we need to consider?"

### If you're unsure about PROCESS:
- ➡️ "What's the next smallest step that creates value?"
- ➡️ "What are we blocking by not deciding?"
- ➡️ "What would make this easier to test or verify?"
- ➡️ "How can we get feedback sooner?"

### If you're in CONFLICT with others:
- ➡️ "What are we actually disagreeing about?"
- ➡️ "What data would resolve this disagreement?"
- ➡️ "What's the underlying concern behind each position?"
- ➡️ "What would a neutral third party suggest?"

### If you're MISSING KNOWLEDGE:
- ➡️ "What's the minimum I need to know to proceed?"
- ➡️ "Where would I look for this information?"
- ➡️ "How can I test my understanding quickly?"
- ➡️ "Who could I ask for a 2-minute explanation?"

## Emergency Protocols (When Truly Stuck)

### The 15-Minute Rule
If you've been stuck on the same problem for >15 minutes:
1. **Document** exactly what you've tried and what you know
2. **State** exactly what you need to know or decide
3. **Ask** for help with that specific question
4. **If no help available**, try a completely different approach for 5 minutes
5. **Then** either return to original problem or mark as blocked

### The Perspective Shift
When stuck, try:
- **Explain it to a rubber duck** (or actual colleague)
- **Draw the problem** as a diagram or flowchart
- **Write the ideal solution** first, then work backwards
- **Solve a simpler version** of the problem
- **Consider the opposite** of what you're trying to do

### The Knowledge Source Hierarchy
When seeking information, check in this order:
1. **Project documentation** (README, architecture guides, specs)
2. **Codebase** (similar implementations, comments)
3. **Team knowledge** (ask colleagues with context)
4. **Official documentation** (framework, language, tool docs)
5. **Community resources** (Stack Overflow, GitHub issues, blogs)
6. **Experimentation** (time-boxed spike to learn)

## Maintenance and Evolution

### Keeping This Guide Useful
- **Review monthly**: What's working? What's not?
- **Add patterns**: Document new decision-making heuristics that emerge
- **Remove outdated**: Delete advice that no longer applies
- **Contextualize**: Add project-specific examples and references
- **Link to practice**: Connect to actual decisions made in the project

### Teaching This Framework
- **Model the behavior**: Use this guide visibly in your work
- **Explain your thinking**: Show how you applied the framework
- **Encourage questions**: "What would this guide suggest here?"
- **Celebrate good process**: Recognize when the framework helped

## Final Reminder
This guide is a tool, not a substitute for judgment. The goal is to improve decision-making speed and quality, not to eliminate thoughtful consideration. When in doubt, apply the simplest element of the framework that moves you forward, then refine your approach as you learn more.

Remember: Progress > perfection. Clarity > certainty. Action > analysis paralysis.