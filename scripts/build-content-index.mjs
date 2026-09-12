import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import matter from 'gray-matter'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const generatedPath = path.join(repoRoot, 'src/generated/content-index.json')
const publicAssetsPath = path.join(repoRoot, 'public/assets')

const markdownRoots = [
  'captures',
  'catalog',
  'companies',
  'distillation',
  'flows',
  'index',
  'recreations',
  'templates',
  'websites',
]

const assetRoots = ['captures', 'recreations']

const flowTagMap = new Map([
  ['flow-01', ['b2b', 'operations', 'issue-triage']],
  ['flow-02', ['b2b', 'payments', 'recovery']],
  ['flow-03', ['marketplace', 'booking', 'trust']],
  ['flow-04', ['marketplace', 'live-state']],
  ['flow-05', ['commerce', 'substitution', 'recovery']],
  ['flow-06', ['consumer', 'learning', 'retention']],
  ['flow-07', ['marketplace', 'booking', 'trust']],
  ['flow-08', ['commerce', 'fulfillment', 'operations']],
  ['flow-09', ['research', 'reference-library']],
  ['flow-10', ['discovery', 'interaction']],
  ['flow-11', ['support', 'routing']],
  ['flow-12', ['forms', 'automation']],
  ['flow-13', ['internal-tools', 'operations']],
  ['flow-14', ['collaboration', 'handoff']],
  ['flow-15', ['field-work', 'handoff']],
  ['flow-16', ['construction', 'approval']],
  ['flow-17', ['booking', 'availability']],
  ['flow-18', ['finance', 'transfers']],
  ['flow-19', ['developer-tools', 'deployment']],
  ['flow-20', ['developer-tools', 'triage']],
])

const recreationFlowMap = new Map([
  ['linear-exception-queue', 'flow-01'],
  ['stripe-payment-ops', 'flow-02'],
])

async function main() {
  const catalog = await readJson('catalog/design-catalog.json')
  const markdownPaths = await collectFiles(markdownRoots, '.md')
  const noteStubs = await Promise.all(markdownPaths.map(readNoteStub))
  const noteByPath = new Map(noteStubs.map((note) => [note.path, note]))
  const renderedNotes = []

  for (const note of noteStubs) {
    renderedNotes.push({
      ...note,
      html: await renderMarkdown(note.markdown, note.path, noteByPath),
      markdown: undefined,
    })
  }

  const recreations = await readRecreations()
  const flows = catalog.records.map((record) => {
    const recreationIds = recreations
      .filter((recreation) => recreation.flowId === record.id)
      .map((recreation) => recreation.id)
    const noteIds = renderedNotes
      .filter((note) => note.relatedFlowIds.includes(record.id))
      .map((note) => note.id)

    return {
      ...record,
      tags: unique([...(record.tags ?? []), ...(flowTagMap.get(record.id) ?? [])]),
      capture_paths: record.capture_paths ?? [],
      recreation_ids: recreationIds,
      note_ids: noteIds,
    }
  })

  await copyAssets()
  await fs.mkdir(path.dirname(generatedPath), { recursive: true })
  await fs.writeFile(
    generatedPath,
    `${JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        source_paths: {
          catalog: 'catalog/design-catalog.json',
          markdown: markdownPaths,
          assets: assetRoots,
        },
        flows,
        notes: renderedNotes,
        recreations,
        tags: unique(flows.flatMap((flow) => flow.tags)).sort(),
      },
      null,
      2,
    )}\n`,
  )
}

async function readJson(relativePath) {
  const raw = await fs.readFile(path.join(repoRoot, relativePath), 'utf8')
  return JSON.parse(raw)
}

async function collectFiles(roots, extension) {
  const files = []

  for (const root of roots) {
    await walk(path.join(repoRoot, root), files, extension)
  }

  return files.map(toRelativePath).sort()
}

async function walk(dir, files, extension) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walk(absolutePath, files, extension)
    } else if (entry.isFile() && entry.name.endsWith(extension)) {
      files.push(absolutePath)
    }
  }
}

async function readNoteStub(relativePath) {
  const raw = await fs.readFile(path.join(repoRoot, relativePath), 'utf8')
  const parsed = matter(raw)
  const title = getTitle(parsed.content) ?? titleFromPath(relativePath)
  const id = slugify(relativePath.replace(/\.md$/, ''))
  const tags = unique([
    path.dirname(relativePath).split('/')[0],
    ...normalizeTags(parsed.data.tags),
    ...tagsFromPath(relativePath),
  ]).filter(Boolean)

  return {
    id,
    title,
    path: relativePath,
    href: `/notes/${id}`,
    tags,
    summary: getSummary(parsed.content),
    relatedFlowIds: findRelatedFlowIds(`${relativePath}\n${title}\n${parsed.content}`),
    html: '',
    markdown: parsed.content,
  }
}

function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value.map(String)
  }

  if (typeof value === 'string') {
    return value.split(',').map((tag) => tag.trim())
  }

  return []
}

function tagsFromPath(relativePath) {
  if (relativePath.includes('distillation')) return ['patterns']
  if (relativePath.includes('capture')) return ['captures']
  if (relativePath.includes('flow')) return ['flows']
  if (relativePath.includes('recreation')) return ['recreations']
  return []
}

function findRelatedFlowIds(text) {
  const lower = text.toLowerCase()
  const matches = []

  for (const [flowId, names] of [
    ['flow-01', ['linear']],
    ['flow-02', ['stripe', 'payment']],
    ['flow-03', ['airbnb']],
    ['flow-04', ['uber']],
    ['flow-05', ['instacart']],
    ['flow-06', ['duolingo']],
    ['flow-07', ['rover']],
    ['flow-08', ['shopify']],
    ['flow-09', ['mobbin']],
    ['flow-10', ['awwwards']],
    ['flow-11', ['intercom']],
    ['flow-12', ['airtable']],
    ['flow-13', ['retool']],
    ['flow-14', ['figma']],
    ['flow-15', ['servicetitan']],
    ['flow-16', ['buildertrend']],
    ['flow-17', ['opentable']],
    ['flow-18', ['wise']],
    ['flow-19', ['vercel']],
    ['flow-20', ['sentry']],
  ]) {
    if (names.some((name) => lower.includes(name))) {
      matches.push(flowId)
    }
  }

  return matches
}

async function renderMarkdown(markdown, fromPath, noteByPath) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(rewriteLinks, { fromPath, noteByPath })
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown)

  return String(result)
}

function rewriteLinks({ fromPath, noteByPath }) {
  return (tree) => {
    visit(tree, ['link', 'image'], (node) => {
      if (!node.url || isExternalUrl(node.url) || node.url.startsWith('#')) {
        return
      }

      const [targetPath, hash = ''] = String(node.url).split('#')
      const normalizedPath = normalizeReferencePath(fromPath, targetPath)
      const note = noteByPath.get(normalizedPath)

      if (note) {
        node.url = `${note.href}${hash ? `#${hash}` : ''}`
        return
      }

      if (assetRoots.some((root) => normalizedPath.startsWith(`${root}/`))) {
        node.url = `/assets/${normalizedPath}${hash ? `#${hash}` : ''}`
      }
    })
  }
}

function normalizeReferencePath(fromPath, targetPath) {
  if (targetPath.startsWith('/')) {
    return targetPath.replace(/^\/+/, '')
  }

  return path
    .normalize(path.join(path.dirname(fromPath), targetPath))
    .replaceAll(path.sep, '/')
}

async function readRecreations() {
  const dir = path.join(repoRoot, 'recreations')
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const recreations = []

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    const id = entry.name
    const htmlPath = path.join(dir, id, 'index.html')
    try {
      await fs.access(htmlPath)
    } catch {
      continue
    }

    const flowId = recreationFlowMap.get(id) ?? null
    recreations.push({
      id,
      title: titleFromPath(id),
      path: `recreations/${id}/index.html`,
      href: `/recreations/${id}`,
      assetHref: `/assets/recreations/${id}/index.html`,
      flowId,
      tags: unique(['recreation', ...(flowId ? flowTagMap.get(flowId) ?? [] : [])]),
    })
  }

  return recreations.sort((a, b) => a.title.localeCompare(b.title))
}

async function copyAssets() {
  await fs.rm(publicAssetsPath, { recursive: true, force: true })
  await fs.mkdir(publicAssetsPath, { recursive: true })

  for (const root of assetRoots) {
    await fs.cp(path.join(repoRoot, root), path.join(publicAssetsPath, root), {
      recursive: true,
      filter(source) {
        const relative = toRelativePath(source)
        return !relative.includes('/README.md')
      },
    })
  }
}

function isExternalUrl(url) {
  return /^[a-z][a-z\d+.-]*:/i.test(url) || url.startsWith('//')
}

function getTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m)
  return match?.[1]?.trim()
}

function getSummary(markdown) {
  const withoutHeading = markdown.replace(/^#\s+.+$/m, '').trim()
  const paragraph = withoutHeading
    .split(/\n{2,}/)
    .find((block) => block.trim() && !block.trim().startsWith('|'))

  return stripMarkdown(paragraph ?? '').slice(0, 180)
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^[-*]\s+/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function titleFromPath(value) {
  return value
    .split('/')
    .at(-1)
    .replace(/\.(md|html)$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

function toRelativePath(absolutePath) {
  return path.relative(repoRoot, absolutePath).replaceAll(path.sep, '/')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
