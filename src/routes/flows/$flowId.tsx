import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { BackLink, Card, EmptyState, MetaList, TagList } from '../../components/ui'
import {
  formatTag,
  getFlow,
  getFlowRelations,
  researchStatus,
  splitJourney,
  splitSituations,
} from '../../lib/content'

export const Route = createFileRoute('/flows/$flowId')({
  loader: ({ params }) => {
    const flow = getFlow(params.flowId)
    if (!flow) throw notFound()

    return { flow, relations: getFlowRelations(flow) }
  },
  component: FlowDetailPage,
})

function FlowDetailPage() {
  const { flow, relations } = Route.useLoaderData()

  return (
    <div className="page detail-page">
      <BackLink />
      <section className="detail-heading">
        <div>
          <p className="eyebrow">Product example · {researchStatus(flow.quality)}</p>
          <h1>{flow.name}</h1>
          <p className="detail-intro">A breakdown of the full experience and the decisions its design has to support.</p>
        </div>
      </section>

      <section className="lesson-card">
        <p className="card-kicker">The useful idea</p>
        <h2>{flow.pattern}</h2>
        <p>This is the main reason this example belongs in the library.</p>
      </section>

      <section className="detail-grid">
        <Card className="span-2 journey-card">
          <p className="card-kicker">How it works</p>
          <h2>The journey from start to finish</h2>
          <ol className="journey-list">
            {splitJourney(flow.workflow).map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Card>
        <Card>
          <p className="card-kicker">What you can borrow</p>
          <h2>A project inspired by this example</h2>
          <p>{flow.recreation}</p>
          <TagList tags={flow.tags} format={formatTag} />
        </Card>
        <Card className="span-3">
          <p className="card-kicker">What can happen along the way</p>
          <h2>The design needs to handle each of these situations</h2>
          <p>
            These are conditions a person may encounter while using the product. Each one may
            need different information, choices, or help.
          </p>
          <ul className="situation-list">
            {splitSituations(flow.states).map((situation) => (
              <li key={situation}>{situation}</li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="card-kicker">See the real product</p>
            <h2>Screenshots</h2>
          </div>
          <p>Open an image to inspect it at full size.</p>
        </div>
        {flow.capture_paths.length ? (
          <div className="capture-grid">
            {flow.capture_paths.map((capturePath) => (
              <a key={capturePath} href={`/assets/${capturePath}`}>
                <img src={`/assets/${capturePath}`} alt={`${flow.name} reference screenshot`} loading="lazy" />
                <span>{flow.name} · View full-size screenshot</span>
              </a>
            ))}
          </div>
        ) : (
          <EmptyState>We have researched this journey, but we do not have a screenshot yet.</EmptyState>
        )}
      </section>

      <section className="section-block">
        <h2>Research behind this example</h2>
        <div className="related-grid">
          <Card>
            <h3>Original sources</h3>
            <ul className="link-list">
              {flow.source_urls.map((url) => (
                <li key={url}>
                  <a href={url}>Read {new URL(url).hostname}</a>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3>Research notes</h3>
            {relations.notes.length ? (
              <ul className="link-list">
                {relations.notes.map((note) => (
                  <li key={note.id}>
                    <Link to="/notes/$noteId" params={{ noteId: note.id }}>
                      {note.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No research notes are linked yet.</p>
            )}
          </Card>
          <Card>
            <h3>Practice builds</h3>
            {relations.recreations.length ? (
              <ul className="link-list">
                {relations.recreations.map((recreation) => (
                  <li key={recreation.id}>
                    <Link
                      to="/recreations/$recreationId"
                      params={{ recreationId: recreation.id }}
                    >
                      {recreation.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No practice build has been made from this example yet.</p>
            )}
          </Card>
        </div>
      </section>

      <MetaList items={[`Sources checked ${flow.last_verified}`, flow.id]} />
    </div>
  )
}
