import { createFileRoute, Link } from '@tanstack/react-router'

import { Card, MetaList, TagList } from '../../components/ui'
import { content, formatTag, getFlowByRecreation } from '../../lib/content'

export const Route = createFileRoute('/recreations/')({
  component: RecreationsPage,
})

function RecreationsPage() {
  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Ideas put into practice</p>
          <h1>Small builds based on lessons from real products.</h1>
          <p className="page-intro">
            These are working experiments. Each one tests whether a useful design idea still
            works in a different product.
          </p>
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
              <p>
                {flow
                  ? `Built to test an idea from ${flow.name}.`
                  : 'This build has not been connected to a research example yet.'}
              </p>
              <MetaList items={[flow?.name ?? 'No linked example']} />
              <TagList tags={recreation.tags} format={formatTag} />
            </Card>
          )
        })}
      </section>
    </div>
  )
}
