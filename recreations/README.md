# HTML/CSS/JS recreations

These practice builds are original interface exercises based on observed workflow patterns. They use invented data, copy, and visual treatment. They do not copy product branding, assets, or proprietary UI.

## Rules

- Each sample must run with plain HTML, CSS, and JavaScript only.
- No framework, bundler, backend, analytics, or external asset dependency is required.
- Each folder is independently runnable by opening its `index.html` file or by serving the repository root.

## Run locally

Open either file directly in a browser:

- `recreations/linear-exception-queue/index.html`
- `recreations/stripe-payment-ops/index.html`

Or serve the repository root:

```sh
python3 -m http.server 4173
```

Then browse:

- `http://127.0.0.1:4173/recreations/linear-exception-queue/`
- `http://127.0.0.1:4173/recreations/stripe-payment-ops/`

## Samples

### Linear exception queue

A dense internal work dashboard for product exception triage. It demonstrates table scanning, search and filters, status and priority handling, selected issue context, loading, empty, blocked, and completed states.

### Stripe payment ops

A payment operations dashboard for monitoring invented payment events. It demonstrates summary metrics, event filtering, selected event timelines, succeeded, failed, disputed, and recovering states, plus a recovery action for non-successful payments.
