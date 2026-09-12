import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { BackLink, Badge, Card, EmptyState, MetaList, TagList } from '../../components/ui'
import { getFlow, getFlowRelations } from '../../lib/content'

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
          <p className="eyebrow">{flow.id}</p>
          <h1>{flow.name}</h1>
        </div>
        <Badge>{flow.quality}</Badge>
      </section>

      <section className="detail-grid">
        <Card className="span-2">
          <h2>Flow</h2>
          <p>{flow.workflow}</p>
          <h3>States</h3>
          <p>{flow.states}</p>
        </Card>
        <Card>
          <h2>Pattern</h2>
          <p>{flow.pattern}</p>
          <TagList tags={flow.tags} />
        </Card>
        <Card>
          <h2>Recreation target</h2>
          <p>{flow.recreation}</p>
        </Card>
      </section>

      <section className="section-block">
        <h2>Captures</h2>
        {flow.capture_paths.length ? (
          <div className="capture-grid">
            {flow.capture_paths.map((capturePath) => (
              <a key={capturePath} href={`/assets/${capturePath}`}>
                <img src={`/assets/${capturePath}`} alt="" loading="lazy" />
                <span>{capturePath}</span>
              </a>
            ))}
          </div>
        ) : (
          <EmptyState>No captures yet.</EmptyState>
        )}
      </section>

      <section className="section-block">
        <h2>Related</h2>
        <div className="related-grid">
          <Card>
            <h3>Sources</h3>
            <ul className="link-list">
              {flow.source_urls.map((url) => (
                <li key={url}>
                  <a href={url}>{new URL(url).hostname}</a>
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3>Notes</h3>
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
              <p>No linked notes.</p>
            )}
          </Card>
          <Card>
            <h3>Recreations</h3>
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
              <p>No linked recreation.</p>
            )}
          </Card>
        </div>
      </section>

      <MetaList items={[`Verified ${flow.last_verified}`, flow.name]} />
    </div>
  )
}
