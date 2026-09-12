import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { BackLink, Card, MetaList, TagList } from '../../components/ui'
import { content, getFlow, getNote } from '../../lib/content'

export const Route = createFileRoute('/notes/$noteId')({
  loader: ({ params }) => {
    const note = getNote(params.noteId)
    if (!note) throw notFound()

    return { note, flows: note.relatedFlowIds.map(getFlow).filter((flow) => flow !== undefined) }
  },
  component: NoteDetailPage,
})

function NoteDetailPage() {
  const { note, flows } = Route.useLoaderData()

  return (
    <div className="page detail-page">
      <BackLink />
      <section className="detail-heading">
        <div>
          <p className="eyebrow">Markdown</p>
          <h1>{note.title}</h1>
        </div>
      </section>

      <Card>
        <MetaList items={[note.path, `${flows.length} linked flows`]} />
        <TagList tags={note.tags} />
        {flows.length ? (
          <div className="inline-links">
            {flows.map((flow) => (
              <Link key={flow.id} to="/flows/$flowId" params={{ flowId: flow.id }}>
                {flow.name}
              </Link>
            ))}
          </div>
        ) : null}
      </Card>

      <article
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: note.html }}
      />

      <section className="section-block">
        <h2>More notes</h2>
        <div className="note-list">
          {content.notes
            .filter((item) => item.id !== note.id)
            .slice(0, 6)
            .map((item) => (
              <Link key={item.id} to="/notes/$noteId" params={{ noteId: item.id }}>
                {item.title}
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
