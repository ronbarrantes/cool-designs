import { Link } from '@tanstack/react-router'
import type { PropsWithChildren, ReactNode } from 'react'

type CardProps = PropsWithChildren<{
  className?: string
}>

export function Card({ children, className = '' }: CardProps) {
  return <section className={`card ${className}`}>{children}</section>
}

export function Badge({ children }: PropsWithChildren) {
  return <span className="badge">{children}</span>
}

export function TagList({ tags }: { tags: readonly string[] }) {
  if (!tags.length) return null

  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  )
}

export function EmptyState({ children }: PropsWithChildren) {
  return <div className="empty-state">{children}</div>
}

export function MetaList({ items }: { items: readonly ReactNode[] }) {
  return (
    <div className="meta-list">
      {items.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </div>
  )
}

export function BackLink({ to = '/' }: { to?: string }) {
  return (
    <Link className="back-link" to={to}>
      Back
    </Link>
  )
}
