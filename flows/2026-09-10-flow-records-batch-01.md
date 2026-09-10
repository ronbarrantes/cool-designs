# Flow records, batch 01

Captured: 2026-09-10
Status: source-backed reconnaissance; screenshots and hands-on captures are the next layer
Parent discovery list: `websites/2026-09-10-polished-websites-100.md`

These records are intentionally practical. They describe a flow worth opening and studying, the visible state transitions to capture, and a small original recreation target. They are not claims that the listed product is universally best.

## Record 01: Linear issue lifecycle

- **Source:** [Linear workflow documentation](https://linear.app/docs/configuring-workflows)
- **User and job:** product or engineering team moves work from intake to shipped outcome.
- **Flow:** create issue → triage → prioritize → assign → cycle → review → complete.
- **States to capture:** inbox, backlog, started, blocked, canceled, duplicate, completed.
- **Pattern worth studying:** dense information architecture with fast state changes and low context switching.
- **Recreation:** a keyboard-friendly exception queue with status, owner, priority, and cycle.

## Record 02: Stripe payment and recovery

- **Sources:** [Stripe payment processing](https://stripe.com/resources/more/payment-processing-explained), [Stripe Workflows](https://docs.stripe.com/workflows)
- **User and job:** business accepts money and resolves payment or billing exceptions.
- **Flow:** configure account → create payment → authenticate → succeed or fail → settle, refund, or dispute.
- **States to capture:** incomplete setup, pending, succeeded, failed, refunded, disputed, payout delayed.
- **Pattern worth studying:** event timelines and explicit next actions make invisible financial processes legible.
- **Recreation:** an operator payment timeline with failure explanations and recovery actions.

## Record 03: Airbnb reservation

- **Source:** [Airbnb booking help](https://www.airbnb.com/help/article/85)
- **User and job:** traveler chooses a trustworthy place and completes a reservation.
- **Flow:** search → filter → inspect listing → validate dates and rules → price review → reserve → prepare for stay.
- **States to capture:** unavailable dates, request pending, payment failure, cancellation, active trip, support case.
- **Pattern worth studying:** desire-building media is paired with repeated trust, policy, and price signals.
- **Recreation:** a stay-booking flow with transparent fees and a clear failed-payment recovery path.

## Record 04: Uber ride request

- **Source:** [How Uber works](https://www.uber.com/us/en/about/how-does-uber-work/)
- **User and job:** rider gets from a location to a destination with live certainty.
- **Flow:** destination → estimate → request → matching → driver arrival → trip → payment → rating or help.
- **States to capture:** locating, searching, matched, arriving, in trip, completed, canceled, safety issue.
- **Pattern worth studying:** state-aware screens keep only the current decision and status prominent.
- **Recreation:** a service-request state machine where the primary action changes at every stage.

## Record 05: Instacart substitution

- **Sources:** [Instacart replacement help](https://www.instacart.com/help/section/360007902831/360039162252), [replacement documentation](https://docs.instacart.com/storefront/learn_about_your_storefront/cart_and_checkout/replacements/)
- **User and job:** shopper completes an uncertain basket while preserving customer preferences.
- **Flow:** build basket → choose replacement rules → shopper picks → customer approves change → fulfill, refund, or substitute.
- **States to capture:** unavailable item, suggestion, approval pending, approved, partial fulfillment, refund, late delivery.
- **Pattern worth studying:** uncertainty is converted into small, understandable approval decisions.
- **Recreation:** a substitution card with price delta, preference, approve, and refund options.

## Record 06: Duolingo daily learning loop

- **Source:** [Duolingo streak help](https://www.duolingo.com/help/what-is-a-streak)
- **User and job:** learner returns for a short lesson and sees meaningful progress.
- **Flow:** choose goal → lesson → immediate feedback → progress reward → streak reminder → return.
- **States to capture:** first lesson, correct, incorrect, streak at risk, goal met, hearts depleted, upgrade prompt.
- **Pattern worth studying:** progress, emotion, and a tiny repeatable action reinforce retention.
- **Recreation:** a five-minute lesson loop with recovery after failure and a restrained upgrade moment.

## Record 07: Rover care booking

- **Sources:** [Rover](https://www.rover.com/), [become a sitter](https://www.rover.com/become-a-sitter/)
- **User and job:** pet owner finds a trustworthy provider for a specific date and care need.
- **Flow:** describe need → search providers → compare profile and trust signals → inquire → book → receive updates → review.
- **States to capture:** no matches, inquiry, booking request, accepted, upcoming, active care, incident, completed.
- **Pattern worth studying:** matching is supported by identity, availability, messaging, and evidence of care.
- **Recreation:** a service-provider booking flow that makes inquiry-to-confirmation transitions explicit.

## Record 08: Shopify order fulfillment

- **Sources:** [Shopify fulfillment](https://help.shopify.com/en/manual/fulfillment/fulfilling-orders), [order management](https://help.shopify.com/en/manual/fulfillment)
- **User and job:** merchant turns a paid order into a tracked delivery or resolved exception.
- **Flow:** order received → allocate inventory → fulfill → label and ship → track → deliver, return, or refund.
- **States to capture:** unfulfilled, partially fulfilled, in transit, delivered, held, returned, refunded.
- **Pattern worth studying:** operational tables become useful when every row exposes the next action and exception.
- **Recreation:** a fulfillment board that highlights orders at risk rather than showing only volume.

## Record 09: Mobbin flow library

- **Sources:** [Mobbin](https://mobbin.com/), [Mobbin flows](https://mobbin.com/explore/web/flows)
- **User and job:** designer finds real interface examples for a specific user journey.
- **Flow:** choose platform or category → search or browse → open flow → inspect screens → save or compare reference.
- **States to capture:** discovery, filters, empty search, flow detail, screen zoom, saved item, gated content.
- **Pattern worth studying:** the unit of value is a connected flow, not an isolated attractive screen.
- **Recreation:** a local reference browser that links screens into a stateful journey with annotations.

## Record 10: Awwwards interactive discovery

- **Sources:** [Awwwards interactive sites](https://www.awwwards.com/websites/web-interactive/), [interaction design](https://www.awwwards.com/websites/interaction-design/)
- **User and job:** visitor discovers unusual web experiences and evaluates craft.
- **Flow:** browse gallery → filter or open project → experience motion and interaction → inspect studio or case details.
- **States to capture:** gallery, hover, loading, transition, project detail, external visit, reduced-motion behavior.
- **Pattern worth studying:** visual spectacle can be organized into a navigable discovery system.
- **Recreation:** a small gallery with strong transitions but clear navigation and accessible fallback.

## Record 11: Intercom conversation routing

- **Sources:** [Intercom workflows](https://www.intercom.com/help/en/articles/7836459-workflows-explained), [new Messenger conversation](https://www.intercom.com/help/en/articles/4134615-customer-opens-a-new-conversation-in-the-messenger)
- **User and job:** customer gets a useful answer while the business routes work correctly.
- **Flow:** open conversation → collect context → automate or assign → respond → snooze or escalate → resolve or reopen.
- **States to capture:** bot greeting, waiting, assigned, snoozed, escalated, resolved, reopened.
- **Pattern worth studying:** automation and human intervention share one visible conversation context.
- **Recreation:** support inbox with customer context, suggested response, assignment, snooze, and reopen.

## Record 12: Airtable form to automation

- **Sources:** [Airtable forms](https://support.airtable.com/articles/9431794285-building-and-sharing-forms-in-airtable), [form-submitted trigger](https://support.airtable.com/articles/4764749250-airtable-automation-trigger-when-a-form-is-submitted)
- **User and job:** organization turns an external submission into an internal record and action.
- **Flow:** publish form → collect submission → validate → create record → trigger automation → assign or notify.
- **States to capture:** blank form, validation error, submitted, duplicate, automation running, failed, assigned.
- **Pattern worth studying:** a simple front door can feed a structured operator workflow without exposing the database.
- **Recreation:** public intake form that creates an internal exception record with ownership and audit history.

## Record 13: Retool internal operations

- **Source:** [Retool platform walkthrough](https://retool.com/resources/what-can-you-build-with-retool)
- **User and job:** operator investigates a record and safely performs an internal action.
- **Flow:** authenticate → filter records → open detail → inspect related data → act → confirm result.
- **States to capture:** loading, stale data, permission denied, destructive confirmation, mutation success, mutation failure.
- **Pattern worth studying:** high-complexity internal tools can remain approachable when detail and action are colocated.
- **Recreation:** exception console with filterable queue, detail drawer, approval action, and audit log.

## Record 14: Figma collaborative handoff

- **Sources:** [Figma design process](https://www.figma.com/design-process/), [Figma](https://www.figma.com/design/)
- **User and job:** team turns an idea into reviewed, reusable, implementation-ready design.
- **Flow:** create canvas → explore → comment → revise → approve → hand off → reuse component.
- **States to capture:** draft, editing, comment unresolved, comment resolved, review, branch, published library.
- **Pattern worth studying:** collaboration is embedded at the object being discussed instead of separated into another tool.
- **Recreation:** design-review board with object-level comments, status, and handoff checklist.

## Record 15: ServiceTitan field closeout

- **Sources:** [ServiceTitan field workflow reference](https://help.servicetitan.com/v1/docs/servicetitan-max-cross-feature-workflow-reference-guide), [complete work in the field](https://help.servicetitan.com/construction/docs/complete-the-work-in-the-field)
- **User and job:** office and field teams move a service job from request to billable completion.
- **Flow:** request → estimate → schedule → dispatch → technician work → evidence → approval → invoice → follow-up.
- **States to capture:** unscheduled, assigned, en route, on site, needs approval, parts pending, completed, ready to bill, exception.
- **Pattern worth studying:** the important design problem is the handoff between office certainty and field reality.
- **Recreation:** read-only completed-job audit that flags missing time, notes, photos, approvals, or billing status.

## Record 16: Buildertrend construction project

- **Sources:** [Buildertrend product workflow](https://buildertrend.com/product-workflow/), [Buildertrend](https://buildertrend.com/)
- **User and job:** builder, client, and vendors coordinate an evolving project.
- **Flow:** lead → estimate → contract → selections → schedule → budget → change order → build → punch list → warranty.
- **States to capture:** draft, awaiting selection, approval pending, scheduled, delayed, change requested, punch item open, complete.
- **Pattern worth studying:** client trust depends on surfacing project progress without hiding uncertainty or changes.
- **Recreation:** change-order and project-closeout view with version history, approval, and unresolved items.

## Record 17: OpenTable reservation

- **Sources:** [OpenTable](https://opentable.com/), [OpenTable app listing](https://play.google.com/store/apps/details?hl=en_CA&id=com.opentable)
- **User and job:** diner finds a suitable table and commits to a time.
- **Flow:** location and date → browse → filter → inspect restaurant → choose time → confirm → reminder → visit or cancel.
- **States to capture:** no availability, waitlist, reservation held, confirmed, reminder, late arrival, cancellation.
- **Pattern worth studying:** availability is the central interface, while trust and detail support the commitment.
- **Recreation:** reservation picker that handles scarcity, waitlist, confirmation, and cancellation gracefully.

## Record 18: Wise international transfer

- **Sources:** [Wise send money](https://wise.com/us/send-money/), [how to send money](https://wise.com/help/articles/2977959/how-do-i-send-money-with-wise)
- **User and job:** sender understands cost and timing while moving money internationally.
- **Flow:** choose currencies → enter amount → see fee and recipient amount → verify recipient → pay → track delivery.
- **States to capture:** quote, verification pending, payment pending, transfer in progress, delivered, failed, refunded.
- **Pattern worth studying:** transparency is a conversion feature when price, timing, and status are visible before commitment.
- **Recreation:** transfer quote and status tracker with fee breakdown and clear failure recovery.

## Record 19: Vercel deployment

- **Sources:** [Vercel deployment overview](https://vercel.com/docs/deployments/overview), [getting started](https://vercel.com/docs/getting-started-with-vercel/projects-deployments)
- **User and job:** developer moves code to a live environment and diagnoses deployment state.
- **Flow:** connect project → deploy → build → inspect logs → preview → promote or roll back.
- **States to capture:** queued, building, preview ready, failed, canceled, promoted, rolled back.
- **Pattern worth studying:** technical progress is communicated as a timeline with logs and a clear next action.
- **Recreation:** deployment timeline with build stages, failure context, preview link, and rollback action.

## Record 20: Sentry issue triage

- **Sources:** [Sentry](https://sentry.io/), [issue tracking documentation](https://docs.sentry.io/integrations/issue-tracking/)
- **User and job:** developer converts noisy errors into prioritized, assigned, resolved work.
- **Flow:** error arrives → group issue → inspect context → assign → link ticket → resolve → verify regression.
- **States to capture:** new, recurring, ignored, assigned, linked, resolved, regressed.
- **Pattern worth studying:** raw events become useful when grouped, contextualized, and connected to ownership.
- **Recreation:** error triage table with frequency, impact, owner, linked work, and regression signal.

## Synthesis from batch 01

The strongest reusable pattern is not a visual style. It is a **state-and-handoff model**:

- Something enters the system.
- It gains context and an owner.
- It moves through visible states.
- Exceptions become explicit instead of silently disappearing.
- The system records evidence at important handoffs.
- The user always has a sensible next action.

That pattern appears in reservations, payments, field work, learning, support, design review, deployments, and marketplaces. The next pass should add screenshots or browser captures for these records, then turn a few into original recreations.
