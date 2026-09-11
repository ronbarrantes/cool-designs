# Design Library Dashboard

Static, read-only dashboard for `catalog/design-catalog.json`.

Serve from the repository root so the dashboard can fetch the catalog and screenshots:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/dashboard/`.
