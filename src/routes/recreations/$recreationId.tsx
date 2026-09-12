import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { BackLink, Card, MetaList, TagList } from '../../components/ui'
import { getFlowByRecreation, getRecreation } from '../../lib/content'

export const Route = createFileRoute('/recreations/$recreationId')({
  loader: ({ params }) => {
    const recreation = getRecreation(params.recreationId)
    if (!recreation) throw notFound()

    return { recreation, flow: getFlowByRecreation(recreation) }
  },
  component: RecreationDetailPage,
})

function RecreationDetailPage() {
  const { recreation, flow } = Route.useLoaderData()

  return (
    <div className="page detail-page">
      <BackLink to="/recreations" />
      <section className="detail-heading">
        <div>
          <p className="eyebrow">Recreation</p>
          <h1>{recreation.title}</h1>
        </div>
      </section>

      <Card>
        <MetaList
          items={[
            recreation.path,
            flow ? (
              <Link key={flow.id} to="/flows/$flowId" params={{ flowId: flow.id }}>
                {flow.name}
              </Link>
            ) : (
              'Unlinked'
            ),
          ]}
        />
        <TagList tags={recreation.tags} />
      </Card>

      <iframe
        className="recreation-frame"
        src={recreation.assetHref}
        title={recreation.title}
      />
    </div>
  )
}
