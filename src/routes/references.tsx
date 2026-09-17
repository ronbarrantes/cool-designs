import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import { ReferenceCard } from '../components/reference-card'
import { EmptyState, MetaList } from '../components/ui'
import { content } from '../lib/content'

export const Route = createFileRoute('/references')({
  component: ReferencesPage,
})

function ReferencesPage() {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState('all')
  const normalizedQuery = query.trim().toLowerCase()
  const kinds = [...new Set(content.references.map((reference) => reference.kind))].sort()
  const tags = [...new Set(content.references.flatMap((reference) => reference.tags))].sort()
  const screenshotCount = content.references.filter((reference) => reference.image_path).length
  const sourceCount = content.references.filter((reference) => reference.source_url).length

  const references = useMemo(() => {
    return content.references.filter((reference) => {
      const matchesKind = kind === 'all' || reference.kind === kind
      const haystack = [
        reference.name,
        reference.kind,
        reference.description,
        reference.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase()
      return matchesKind && (!normalizedQuery || haystack.includes(normalizedQuery))
    })
  }, [kind, normalizedQuery])

  return (
    <div className="page reference-page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Visual reference library</p>
          <h1>Find the pattern before asking AI to invent one.</h1>
          <p className="page-intro">
            Browse real product screens by component or journey. Open a reference to study the
            original flow, the states it handles, and the design choice worth borrowing.
          </p>
        </div>
        <MetaList
          items={[
            `${content.references.length} references`,
            `${screenshotCount} screenshot studies`,
            `${sourceCount} source references`,
          ]}
        />
      </section>

      <section className="toolbar" aria-label="Filter visual references">
        <label>
          <span>What are you looking for?</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try navigation, payment, status, or trust" />
        </label>
        <label>
          <span>Show</span>
          <select value={kind} onChange={(event) => setKind(event.target.value)}>
            <option value="all">All references</option>
            {kinds.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </section>

      <div className="reference-tag-row" aria-label="Reference tags">
        {tags.map((tag) => <button key={tag} type="button" onClick={() => setQuery(tag)}>{tag}</button>)}
      </div>

      {references.length ? (
        <section className="reference-grid" aria-label="Visual references">
          {references.map((reference) => (
            <ReferenceCard key={reference.id} reference={reference} />
          ))}
        </section>
      ) : <EmptyState>No references match that search yet.</EmptyState>}
    </div>
  )
}
