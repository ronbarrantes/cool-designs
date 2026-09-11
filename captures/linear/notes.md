# Linear homepage and embedded product preview

- **Source:** https://linear.app/
- **Captured:** 2026-09-10
- **Surface:** public marketing page with embedded product previews
- **Capture:** `home.png`

## Observed flow

The page moves from a focused product promise into an embedded workspace preview. The preview exposes a left navigation, issue list, status columns, activity stream, labels, priority, assignee, cycle, release, and an agent handoff. The page then continues into feature sections for intake, integrations, planning, and building.

## Useful pattern

The marketing page does not only show decorative mockups. It demonstrates a plausible operational state with populated records and visible transitions. The visitor can understand the product by reading the workflow itself.

## States and handoffs visible in the preview

- backlog, todo, in progress, and done;
- issue creation and assignment;
- priority and labels;
- activity history;
- review and agent delegation;
- release association;
- intake from conversations and customer feedback.

## Recreation note

Build a small issue-triage board whose marketing page shows a real-looking state transition. Preserve the density and hierarchy, but use original data, copy, and visual treatment.

The runnable example in `recreations/linear-exception-queue/` is an original practice build based on observed workflow patterns. It is not a copy of Linear branding, assets, data, or proprietary UI.
