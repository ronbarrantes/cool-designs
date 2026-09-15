import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const catalogPath = path.join(repoRoot, 'catalog/reference-catalog.json')
const args = parseArgs(process.argv.slice(2))
const required = ['name', 'image', 'kind', 'flow-id', 'tags', 'description']
const missing = required.filter((key) => !args[key])

if (missing.length || !['component', 'flow'].includes(args.kind)) {
  console.error('Usage: npm run reference:add -- --name "Payment form" --image ./screen.webp --kind component --flow-id flow-02 --tags payments,checkout --description "What is useful here"')
  if (missing.length) console.error(`Missing: ${missing.join(', ')}`)
  if (args.kind && !['component', 'flow'].includes(args.kind)) console.error('kind must be component or flow')
  process.exitCode = 1
} else {
  await addReference({
    name: args.name,
    image: args.image,
    kind: args.kind,
    flowId: args['flow-id'],
    tags: args.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    description: args.description,
  })
}

function parseArgs(values) {
  const parsed = {}
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index]
    if (!value.startsWith('--')) continue
    parsed[value.slice(2)] = values[index + 1]
    index += 1
  }
  return parsed
}

async function addReference({ name, image, kind, flowId, tags, description }) {
  const catalog = JSON.parse(await fs.readFile(catalogPath, 'utf8'))
  if (catalog.records.some((record) => record.name.toLowerCase() === name.toLowerCase())) {
    throw new Error(`A reference named "${name}" already exists.`)
  }
  if (!catalog.records.some((record) => record.flow_id === flowId)) {
    throw new Error(`No existing reference uses ${flowId}. Add the flow to catalog/design-catalog.json first.`)
  }

  const sourcePath = path.resolve(process.cwd(), image)
  const extension = path.extname(sourcePath).toLowerCase()
  if (!['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(extension)) {
    throw new Error('image must be a png, jpg, jpeg, webp, or gif file.')
  }

  const slug = slugify(name)
  const relativeImagePath = `captures/imported/${slug}${extension}`
  const destinationPath = path.join(repoRoot, relativeImagePath)
  await fs.mkdir(path.dirname(destinationPath), { recursive: true })
  await fs.copyFile(sourcePath, destinationPath)

  catalog.records.push({
    id: `reference-${slug}`,
    name,
    kind,
    description,
    flow_id: flowId,
    image_path: relativeImagePath,
    tags,
  })
  await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`)
  console.log(`Added ${name}. Run npm run content:build to refresh the app.`)
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
