import { createFileRoute, Link } from '@tanstack/react-router'

import { Badge } from '../components/ui'
import { content } from '../lib/content'

export const Route = createFileRoute('/captures')({
  component: CapturesPage,
})

function CapturesPage() {
  const capturedFlows = content.flows.filter((flow) => flow.capture_paths.length)

  return (
    <div className="page">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Screenshots</p>
          <h1>Captured source material.</h1>
        </div>
      </section>

      <section className="capture-grid capture-grid-large">
        {capturedFlows.flatMap((flow) =>
          flow.capture_paths.map((capturePath) => (
            <Link key={capturePath} to="/flows/$flowId" params={{ flowId: flow.id }}>
              <img src={`/assets/${capturePath}`} alt="" loading="lazy" />
              <span>{capturePath}</span>
              <Badge>{flow.name}</Badge>
            </Link>
          )),
        )}
      </section>
    </div>
  )
}
