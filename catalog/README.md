# Design catalog

This directory is the structured index for the product design field guide. It turns research notes and screenshots into examples people can search, understand, and use.

## Current files

- `design-catalog.json` is a normalized manifest for future dashboard views.
- `README.md` defines the record shape and update rules.

## Record shape

Each catalog record should have a stable `id`, display `name`, `source_urls`, `workflow`, `states`, `pattern`, `recreation`, `quality`, `capture_paths`, `tags`, and `last_verified`.

The field names are kept short for the data file. The site explains them in plain language:

- `workflow` becomes the ordered journey from start to finish.
- `states` becomes the situations a design must handle along the way.
- `pattern` becomes the main idea worth learning from the example.
- `recreation` becomes a small project that could test that idea.
- `quality` tells the site whether a real screenshot is available.

## Product direction

The field guide should help Ron start with a product problem, find a similar example, understand the full journey, notice the situations the design handles, and leave with an idea he can use. Screenshots, research notes, and practice builds support that lesson.

Keep the field guide read-only. Do not build authentication, comments, ratings, or a CMS until the research itself calls for them.

## Update rule

Raw source records remain authoritative. Update the catalog after adding a flow record or capture. Never invent visual observations from a source that was blocked or never captured. Mark access limitations explicitly.
