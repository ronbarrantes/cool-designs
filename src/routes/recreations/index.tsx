import { createFileRoute, Link } from '@tanstack/react-router'

import { Card, MetaList, TagList } from '../../components/ui'
import { content, getFlowByRecreation } from '../../lib/content'

export const Route = createFileRoute('/recreations/')({
  component: RecreationsPage,
})

function RecreationsPage() {
  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Practice builds</p>
          <h1>Original recreations.</h1>
        </div>
      </section>

      <section className="card-grid">
        {content.recreations.map((recreation) => {
          const flow = getFlowByRecreation(recreation)

          return (
            <Card key={recreation.id}>
              <h2>
                <Link
                  to="/recreations/$recreationId"
                  params={{ recreationId: recreation.id }}
                >
                  {recreation.title}
                </Link>
              </h2>
              <MetaList items={[recreation.path, flow?.name ?? 'Unlinked']} />
              <TagList tags={recreation.tags} />
            </Card>
          )
        })}
      </section>
    </div>
  )
}
