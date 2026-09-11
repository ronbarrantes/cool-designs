# Design catalog

This directory is the dashboard-facing index for the research library. It turns existing flow records and captures into selectable design references without replacing the raw research.

## Current files

- `design-catalog.json` is a normalized manifest for future dashboard views.
- `README.md` defines the record shape and update rules.

## Record shape

Each catalog record should have a stable `id`, display `name`, `source_urls`, `workflow`, `states`, `pattern`, `recreation`, `quality`, `capture_paths`, `tags`, and `last_verified`.

## Dashboard direction

The eventual dashboard should let Ron browse visual cards, filter by category and interaction pattern, open source-backed detail views, save a shortlist, compare selected references, and link a reference to a recreation or project brief.

The first dashboard should be read-only. Do not build authentication, comments, ratings, or a CMS until the catalog is useful locally.

## Update rule

Raw source records remain authoritative. Update the catalog after adding a flow record or capture. Never invent visual observations from a source that was blocked or never captured. Mark access limitations explicitly.
