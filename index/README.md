# Cool Designs research index

The repository is organized as a funnel:

1. `websites/` and `companies/` hold discovery candidates.
2. `flows/` holds source-backed records of complete workflows.
3. `patterns/` holds cross-record design principles.
4. `captures/` holds screenshots and raw observations.
5. `recreations/` holds original practice builds.
6. `templates/` defines the minimum structure for new records.

## Current canonical research line

The consolidated working branch is `research/design-lab`. It contains the history from the initial company inventory, the 100-site discovery map, the first pattern distillation, and the first 20 flow records.

## Record quality levels

- **Candidate:** name, URL, and reason to inspect.
- **Reconnaissance:** workflow outline, states, handoffs, source links, and recreation idea.
- **Captured:** reconnaissance plus dated screenshots or browser observations.
- **Distilled:** repeated pattern supported by multiple captured records.
- **Recreated:** original implementation with notes about what was learned.

Do not promote a candidate to a distilled pattern based on a landing page alone. Prefer one complete flow and its non-happy-path states.

## Run summaries and design cache

A broad review is allowed when establishing the current state, but every meaningful design-research run must leave behind a compact cache for the next run. The cache is a decision record, not a transcript.

At the end of a research or analysis run, create or update a dated summary under `analysis/`, for example `analysis/2026-09-10-run-summary.md`. Include:

- run ID, date, scope, branch, and commit;
- records, captures, and source files inspected;
- verified observations with links to supporting records or screenshots;
- design hypotheses, confidence, contradictions, and access limitations;
- patterns promoted, rejected, or still unproven;
- open questions and the next one to three actions;
- a `Read next` list naming only the files needed for follow-up.

Future runs must read the latest run summary first, then only the files in its `Read next` list or files changed since the recorded commit. Do not reread the full repository unless the cache is missing, stale, or contradictory. Preserve raw captures and source links, but do not copy large pages or model transcripts into the cache.

Use bounded passes:

1. inspect the summary and changed records;
2. perform only the targeted capture, comparison, or distillation needed;
3. update one compact run summary and the catalog when appropriate;
4. verify the summary, catalog, and diff before committing or opening a PR.

## Branch convention

Use one canonical branch for accumulated research. Use short-lived branches only for risky experiments or independent batches. Merge or cherry-pick useful work into `research/design-lab` after verification. Keep `main` as the stable baseline.
