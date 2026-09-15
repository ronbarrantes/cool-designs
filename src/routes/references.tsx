import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import { Badge, Card, EmptyState, MetaList, TagList } from '../components/ui'
import { content } from '../lib/content'

export const Route = createFileRoute('/references')({
  component: ReferencesPage,
})

function ReferencesPage() {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<'all' | 'component' | 'flow'>('all')
  const normalizedQuery = query.trim().toLowerCase()
  const tags = [...new Set(content.references.flatMap((reference) => reference.tags))].sort()

  const references = useMemo(() => {
    return content.references.filter((reference) => {
      const matchesKind = kind === 'all' || reference.kind === kind
      const haystack = [reference.name, reference.description, reference.tags.join(' ')].join(' ').toLowerCase()
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
        <MetaList items={[`${content.references.length} references`, `${content.flows.length} journeys`]} />
      </section>

      <section className="toolbar" aria-label="Filter visual references">
        <label>
          <span>What are you looking for?</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try navigation, payment, status, or trust" />
        </label>
        <label>
          <span>Show</span>
          <select value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}>
            <option value="all">Components and flows</option>
            <option value="component">Components</option>
            <option value="flow">Flows</option>
          </select>
        </label>
      </section>

      <div className="reference-tag-row" aria-label="Reference tags">
        {tags.map((tag) => <button key={tag} type="button" onClick={() => setQuery(tag)}>{tag}</button>)}
      </div>

      {references.length ? (
        <section className="reference-grid" aria-label="Visual references">
          {references.map((reference) => (
            <Card key={reference.id} className="reference-card">
              <Link to="/flows/$flowId" params={{ flowId: reference.flow_id }} className="reference-image-link">
                <img src={`/assets/${reference.image_path}`} alt={reference.name} loading="lazy" />
              </Link>
              <div className="card-topline"><Badge>{reference.kind}</Badge><span>{reference.flow?.name}</span></div>
              <h2>{reference.name}</h2>
              <p>{reference.description}</p>
              <TagList tags={reference.tags} />
              <Link className="card-link" to="/flows/$flowId" params={{ flowId: reference.flow_id }}>Study the full journey →</Link>
            </Card>
          ))}
        </section>
      ) : <EmptyState>No references match that search yet.</EmptyState>}
    </div>
  )
}
