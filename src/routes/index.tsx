import { createFileRoute, Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import { ReferenceCard } from '../components/reference-card'
import { Badge, Card, EmptyState, MetaList, TagList } from '../components/ui'
import { content, formatTag, researchStatus, splitJourney } from '../lib/content'

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
        flow.recreation,
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
          <p className="eyebrow">Product design field guide</p>
          <h1>Find a better way to design a tricky product journey.</h1>
          <p className="page-intro">
            Pick a product with a problem like yours. See the full journey, the things that can
            go wrong, and the design idea worth borrowing.
          </p>
        </div>
        <MetaList
          items={[
            `${content.flows.length} product examples`,
            `${content.flows.filter((flow) => flow.capture_paths.length).length} with screenshots`,
            `${content.references.length} visual references`,
          ]}
        />
      </section>

      <section className="how-to-use" aria-label="How to use this library">
        <span>1. Find a similar problem</span>
        <span>2. Follow the journey</span>
        <span>3. Borrow the useful idea</span>
      </section>

      <section className="toolbar" aria-label="Find a product example">
        <label>
          <span>What are you designing?</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try payment, booking, support, or delivery"
          />
        </label>
        <label>
          <span>Choose a topic</span>
          <select value={tag} onChange={(event) => setTag(event.target.value)}>
            <option value="all">All topics</option>
            {content.tags.map((item) => (
              <option key={item} value={item}>
                {formatTag(item)}
              </option>
            ))}
          </select>
        </label>
      </section>

      {flows.length ? (
        <section className="card-grid" aria-label="Product examples">
          {flows.map((flow) => (
            <Card key={flow.id}>
              <div className="card-topline">
                <Badge>{researchStatus(flow.quality)}</Badge>
                <span>{splitJourney(flow.workflow).length} steps</span>
              </div>
              <h2>
                <Link to="/flows/$flowId" params={{ flowId: flow.id }}>
                  {flow.name}
                </Link>
              </h2>
              <p className="card-kicker">Why study it</p>
              <p>{flow.pattern}</p>
              <MetaList
                items={[
                  `${flow.capture_paths.length} screenshots`,
                  `${flow.source_urls.length} sources`,
                ]}
              />
              <TagList tags={flow.tags.slice(0, 4)} format={formatTag} />
              <Link className="card-link" to="/flows/$flowId" params={{ flowId: flow.id }}>
                Study this example →
              </Link>
            </Card>
          ))}
        </section>
      ) : (
        <EmptyState>No examples match that search yet.</EmptyState>
      )}

      <section className="section-block" aria-labelledby="visual-reference-gallery">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Visual references</p>
            <h2 id="visual-reference-gallery">Visual reference gallery</h2>
            <p>
              Study reusable screenshots and patterns separately from the product example journeys.
            </p>
          </div>
          <Link className="card-link" to="/references">
            See the full gallery →
          </Link>
        </div>

        <div className="reference-grid">
          {content.references.map((reference) => (
            <ReferenceCard key={reference.id} reference={reference} />
          ))}
        </div>
      </section>
    </div>
  )
}
