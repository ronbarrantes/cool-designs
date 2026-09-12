import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import { Badge, Card, EmptyState, MetaList, TagList } from '../components/ui'
import { content } from '../lib/content'

export const Route = createFileRoute('/')({
  component: LibraryPage,
})

function LibraryPage() {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('all')
  const normalizedQuery = query.trim().toLowerCase()

  const flows = useMemo(() => {
    return content.flows.filter((flow) => {
      const matchesTag = tag === 'all' || flow.tags.includes(tag)
      const haystack = [
        flow.name,
        flow.workflow,
        flow.states,
        flow.pattern,
        flow.quality,
        flow.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase()

      return matchesTag && (!normalizedQuery || haystack.includes(normalizedQuery))
    })
  }, [normalizedQuery, tag])

  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Research library</p>
          <h1>Browse workflow examples.</h1>
        </div>
        <MetaList
          items={[
            `${content.flows.length} flows`,
            `${content.notes.length} notes`,
            `${content.recreations.length} recreations`,
          ]}
        />
      </section>

      <section className="toolbar" aria-label="Browse controls">
        <label>
          <span>Search</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="payment, handoff, booking"
          />
        </label>
        <label>
          <span>Tag</span>
          <select value={tag} onChange={(event) => setTag(event.target.value)}>
            <option value="all">All tags</option>
            {content.tags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </section>

      {flows.length ? (
        <section className="card-grid" aria-label="Flows">
          {flows.map((flow) => (
            <Card key={flow.id}>
              <div className="card-topline">
                <Badge>{flow.quality}</Badge>
                <span>{flow.id}</span>
              </div>
              <h2>
                <Link to="/flows/$flowId" params={{ flowId: flow.id }}>
                  {flow.name}
                </Link>
              </h2>
              <p>{flow.pattern}</p>
              <MetaList
                items={[
                  `${flow.capture_paths.length} captures`,
                  `${flow.recreation_ids.length} recreations`,
                  `${flow.source_urls.length} sources`,
                ]}
              />
              <TagList tags={flow.tags.slice(0, 4)} />
            </Card>
          ))}
        </section>
      ) : (
        <EmptyState>No matching flows.</EmptyState>
      )}
    </div>
  )
}
