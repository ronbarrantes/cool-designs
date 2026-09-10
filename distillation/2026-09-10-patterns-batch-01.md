# Design and workflow distillation, batch 01

Captured: 2026-09-10
Source inventory: `companies/2026-09-10-company-candidates.md`
Status: working hypotheses for verification, not final research conclusions

This branch begins the distillation pass without altering the raw company inventory. The patterns below identify what to inspect and recreate as learning exercises. Before treating any pattern as fact, capture the actual public flow, screenshots, and source notes.

## Distillation lens

For each company, inspect five layers:

1. **Entry:** how the user arrives and declares intent.
2. **Core loop:** the repeated action that creates value.
3. **State model:** empty, active, waiting, blocked, failed, completed, and archived states.
4. **Handoffs:** where work moves between people, roles, systems, or money.
5. **Trust and momentum:** previews, confirmations, progress, reminders, social proof, and recovery paths.

## B2B batch

### 1. Linear

- Workflow to study: issue intake → triage → prioritization → cycle execution → release.
- Design hypothesis: speed comes from keyboard-first actions, dense hierarchy, predictable shortcuts, and minimal context switching.
- States to capture: inbox, backlog, blocked, in progress, review, completed, canceled, duplicate.
- Recreation exercise: build a tiny issue queue with command palette, keyboard shortcuts, cycles, and a clear blocked state.

### 2. Notion

- Workflow to study: blank workspace → template or page → structured database → shared knowledge.
- Design hypothesis: progressive disclosure lets a flexible tool feel approachable before exposing its full power.
- States to capture: blank page, suggested template, database views, permissions, comments, version history.
- Recreation exercise: create a focused client-workspace shell that starts simple and reveals structure only when needed.

### 3. Airtable

- Workflow to study: define records → choose fields → create views/forms → automate transitions.
- Design hypothesis: the same underlying data becomes approachable when users can switch between table, form, calendar, and filtered views.
- States to capture: first table, field setup, validation error, filtered empty result, automation failure, shared form.
- Recreation exercise: make a lead pipeline that supports table, kanban, and public intake views from one data model.

### 4. Retool

- Workflow to study: connect data → compose internal interface → add actions → authorize and operate.
- Design hypothesis: high-value complexity is hidden behind reusable components, query panels, and action feedback.
- States to capture: loading data, permission denied, stale data, destructive-action confirmation, success toast, failed mutation.
- Recreation exercise: create an operations console for resolving one exception queue with filters, detail drawer, and approval action.

### 5. HubSpot

- Workflow to study: capture lead → qualify → assign → advance pipeline → nurture or close.
- Design hypothesis: pipeline visibility reduces anxiety when every record has an owner, next action, and stage history.
- States to capture: new lead, unassigned, overdue task, stalled deal, won, lost, re-engagement.
- Recreation exercise: build a narrow sales pipeline where the main screen answers “what needs attention today?”

### 6. Intercom

- Workflow to study: user message → routing → agent or automation → resolution → follow-up.
- Design hypothesis: conversation context, suggested actions, and human escalation should coexist in one workspace.
- States to capture: bot greeting, waiting, assigned, snoozed, escalated, resolved, reopened.
- Recreation exercise: build a support inbox with customer context, suggested reply, assignment, snooze, and reopen behavior.

### 7. Zendesk

- Workflow to study: ticket intake → categorization → assignment → escalation → resolution.
- Design hypothesis: operational clarity depends on visible ownership, SLA pressure, macros, and consistent status vocabulary.
- States to capture: unassigned, pending customer, pending internal, escalated, solved, reopened.
- Recreation exercise: create an exception inbox with SLA indicators and one-click response macros.

### 8. Ramp

- Workflow to study: spend request → policy check → approval → transaction → reconciliation.
- Design hypothesis: financial controls feel less hostile when policy feedback appears before submission and approval status is legible.
- States to capture: draft request, policy warning, awaiting approval, approved, declined, receipt missing, reconciled.
- Recreation exercise: build a purchase approval flow with rule explanations and a clean reconciliation queue.

### 9. Stripe

- Workflow to study: account setup → payment collection → billing → dispute or failure recovery.
- Design hypothesis: technical and financial complexity is made manageable through strong defaults, event timelines, and precise failure explanations.
- States to capture: setup incomplete, payment pending, succeeded, failed, refunded, disputed, payout delayed.
- Recreation exercise: make a payment event timeline that gives an operator a clear next action for every failure.

### 10. ServiceTitan

- Workflow to study: request → estimate → schedule → dispatch → field evidence → invoice → follow-up.
- Design hypothesis: the value is in connecting office and field states, not in any single screen.
- States to capture: unscheduled, assigned, en route, on site, needs approval, parts pending, completed, ready to bill, exception.
- Recreation exercise: build a read-only completed-job audit that identifies missing billing evidence.

## B2C batch

### 11. Airbnb

- Workflow to study: browse → compare → trust check → reserve → prepare → stay → review or support.
- Design hypothesis: rich media creates desire while repeated trust signals reduce perceived booking risk.
- States to capture: unavailable dates, identity verification, booking request, payment issue, cancellation, active stay, support case.
- Recreation exercise: design a stay-booking flow with a transparent fee breakdown and a recovery path for failed payment.

### 12. Uber

- Workflow to study: set destination → quote → match → live trip → payment → rating or help.
- Design hypothesis: the interface changes dramatically by state, keeping the current decision visible while hiding irrelevant controls.
- States to capture: locating, searching, matched, driver arriving, in trip, completed, canceled, safety issue.
- Recreation exercise: prototype a location-based service flow with a state machine rather than static pages.

### 13. DoorDash

- Workflow to study: discover → customize → checkout → merchant prep → courier tracking → delivery recovery.
- Design hypothesis: progress and uncertainty management are as important as menu browsing.
- States to capture: item unavailable, substitution, order accepted, delayed, courier assigned, delivered, refund requested.
- Recreation exercise: build an order tracker that communicates delays honestly and offers useful recovery actions.

### 14. Instacart

- Workflow to study: build basket → choose substitutions → shopper picks → approve changes → deliver → refund.
- Design hypothesis: the product turns an inherently uncertain fulfillment process into a series of small approvals.
- States to capture: unavailable item, substitution suggestion, customer approval, partial fulfillment, refund, late delivery.
- Recreation exercise: recreate a substitution approval interaction with explicit price and preference controls.

### 15. Duolingo

- Workflow to study: onboarding → lesson → feedback → streak or progress → reminder → subscription prompt.
- Design hypothesis: immediate feedback, small goals, visible momentum, and emotional rewards make repetition feel meaningful.
- States to capture: first lesson, correct, incorrect, streak at risk, daily goal met, hearts depleted, paywall.
- Recreation exercise: create a five-minute learning loop with progress, recovery, and a non-annoying upgrade moment.

### 16. Strava

- Workflow to study: record activity → summarize → share → compare → challenge → return.
- Design hypothesis: personal utility and social accountability reinforce each other without requiring social interaction every time.
- States to capture: no activity, recording, paused, upload pending, privacy choice, shared, kudos, challenge complete.
- Recreation exercise: design an activity log that makes privacy and sharing choices obvious.

### 17. Robinhood

- Workflow to study: sign up → verify identity → fund account → discover asset → transact → monitor.
- Design hypothesis: visual simplicity lowers friction, but high-consequence actions require careful confirmation and education.
- States to capture: verification pending, deposit pending, market closed, order preview, order filled, failed, withdrawal pending.
- Recreation exercise: build a fictional high-stakes transaction flow with explicit review, confirmation, and post-action status.

### 18. Depop

- Workflow to study: discover → inspect item → message or offer → purchase → ship → rate.
- Design hypothesis: social discovery and commerce are blended, so identity, taste, and trust are part of the conversion path.
- States to capture: saved item, offer sent, offer expired, sold item, shipping pending, dispute, review.
- Recreation exercise: create a peer marketplace listing flow where seller identity and fulfillment status stay visible.

### 19. Rover

- Workflow to study: describe need → find provider → compare trust signals → book → receive updates → review.
- Design hypothesis: matching is only half the product. Confidence comes from profiles, availability, messaging, and care evidence.
- States to capture: no matches, inquiry, booking request, accepted, upcoming, active care, incident, completed.
- Recreation exercise: design a service-provider booking flow with a clear transition from inquiry to confirmed care.

### 20. Turo

- Workflow to study: search vehicle → evaluate host and rules → book → pickup → active rental → return or claim.
- Design hypothesis: marketplace trust depends on making responsibilities, condition, timing, and exceptions explicit.
- States to capture: booking pending, pickup instructions, check-in photos, extension request, late return, damage claim, review.
- Recreation exercise: build a rental check-in and check-out flow with evidence capture and dispute prevention.

## Cross-company patterns to carry forward

- **Exception-first operations:** the valuable screen often answers what is blocked, late, missing, or risky.
- **State-aware interfaces:** good products change the primary action as the workflow advances.
- **Visible ownership:** users need to know who or what is responsible for the next move.
- **Evidence at handoff:** photos, receipts, approvals, notes, and timestamps turn “done” into defensible completion.
- **Progress without false certainty:** delivery, booking, learning, and payments all need honest intermediate states.
- **Progressive disclosure:** powerful systems expose complexity at the moment it becomes useful.
- **Recovery as a first-class flow:** failures, substitutions, refunds, disputes, and reopenings deserve designed paths.
- **Trust before commitment:** identity, pricing, policies, previews, and confirmation reduce perceived risk.

## Next distillation batch

Verify the public flows and capture source-backed notes for the 20 entries above. Then continue with the remaining 30 companies, preserving each batch on its own branch or commit before creating recreations.
