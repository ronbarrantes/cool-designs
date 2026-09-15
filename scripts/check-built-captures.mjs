import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Run after a production build to catch prerendering that rewrites image bytes.
const root = fileURLToPath(new URL('../', import.meta.url))
const output = path.resolve(root, process.argv[2] ?? '.output/public')
const catalog = JSON.parse(await fs.readFile(path.join(root, 'catalog/design-catalog.json'), 'utf8'))
const captures = [...new Set(catalog.records.flatMap((flow) => flow.capture_paths ?? []))]

assert.ok(captures.length > 0, 'Expected catalog captures to verify')
for (const capture of captures) {
  const source = await fs.readFile(path.join(root, capture))
  const built = await fs.readFile(path.join(output, 'assets', capture))
  assert.ok(source.equals(built), `Build changed image bytes: ${capture}`)
}
console.log(`Verified ${captures.length} built captures match their source bytes`)
