# Capture batch 01 observations

Captured: 2026-09-10
Branch: `research/captures-batch-01`

## Stripe

- **Source:** https://stripe.com/
- **Capture:** `stripe/home.png`
- **Observed:** The public page combines a focused “get started” entry point with product-family navigation, business-model recommendations, customer stories, integration paths, and a product recommendation form.
- **Workflow pattern:** visitor intent → business context → recommended product path → no-code, platform, or custom integration → support and services.
- **Notable state language:** the form explains the information it needs, provides a character limit, and shows input-strength criteria.
- **Study target:** how a very broad platform turns a visitor into a guided path without forcing them to understand the whole catalog first.

## Airbnb

- **Source:** https://www.airbnb.com/
- **Capture:** `airbnb/home.png`
- **Observed:** The primary interaction is a compact search flow with tabs for Homes, Experiences, and Services, followed by location, dates, guests, and search. The page also exposes inspiration categories and hosting/support routes.
- **Workflow pattern:** choose intent category → enter minimum trip context → search → browse inspiration or results → reserve or host.
- **Notable state language:** search inputs are named by the question they answer, such as Where, When, and Who.
- **Study target:** how a marketplace makes a complex search feel like a short conversational form.

## Instacart

- **Source:** https://www.instacart.com/
- **Capture:** `instacart/home.png`
- **Result:** the worker browser received a CloudFront 403 page rather than the application.
- **Research note:** retain the blocked capture as an access-state example, but do not treat it as an Instacart UI observation. Use the public replacement documentation for the workflow record until another access route is available.

## Duolingo

- **Source:** https://www.duolingo.com/
- **Result:** the browser session timed out before a capture was saved.
- **Research note:** no visual claim is made. Retry later with a fresh session or use a public help page as a source-backed workflow entry point.
