import { Link } from '@tanstack/react-router'

import type { Reference } from '../lib/content'
import { Badge, Card, TagList } from './ui'

export function ReferenceCard({ reference }: { reference: Reference }) {
  const flowId = reference.flow_id
  const sourceUrl = reference.source_url
  const previewTheme = reference.preview_theme ?? 'system'

  return (
    <Card className="reference-card">
      {reference.image_path ? (
        flowId ? (
          <Link
            to="/flows/$flowId"
            params={{ flowId }}
            className="reference-image-link"
          >
            <img src={`/assets/${reference.image_path}`} alt={reference.name} loading="lazy" />
          </Link>
        ) : (
          <div className="reference-image-link" aria-hidden="true">
            <img src={`/assets/${reference.image_path}`} alt="" loading="lazy" />
          </div>
        )
      ) : sourceUrl ? (
        <a
          className={`reference-preview reference-preview-${previewTheme}`}
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${reference.name}`}
        >
          <span>{reference.kind}</span>
          <strong>{reference.name}</strong>
          <small>{reference.tags.slice(0, 2).join(' / ')}</small>
        </a>
      ) : null}
      <div className="card-topline">
        <Badge>{reference.kind}</Badge>
        <span>{reference.flow?.name ?? (sourceUrl ? 'External source' : '')}</span>
      </div>
      <h2>
        {flowId ? (
          <Link to="/flows/$flowId" params={{ flowId }}>
            {reference.name}
          </Link>
        ) : sourceUrl ? (
          <a href={sourceUrl} target="_blank" rel="noreferrer">
            {reference.name}
          </a>
        ) : (
          reference.name
        )}
      </h2>
      <p>{reference.description}</p>
      <TagList tags={reference.tags} />
      {flowId ? (
        <Link className="card-link" to="/flows/$flowId" params={{ flowId }}>
          Study the related flow →
        </Link>
      ) : sourceUrl ? (
        <a className="card-link external-link" href={sourceUrl} target="_blank" rel="noreferrer">
          Open external source ↗
        </a>
      ) : null}
    </Card>
  )
}
