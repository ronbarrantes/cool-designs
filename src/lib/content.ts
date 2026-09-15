import contentIndex from '../generated/content-index.json'

export type Flow = (typeof contentIndex.flows)[number]
export type Note = (typeof contentIndex.notes)[number]
export type Recreation = (typeof contentIndex.recreations)[number]
export type Reference = (typeof contentIndex.references)[number]

export const content = contentIndex

export function splitJourney(value: string) {
  return value
    .replace(/\.$/, '')
    .split('→')
    .map((step) => step.trim())
}

export function splitSituations(value: string) {
  return value
    .replace(/\.$/, '')
    .split(',')
    .map((item) => item.trim())
}

export function formatTag(value: string) {
  const labels: Record<string, string> = {
    b2b: 'business software',
    commerce: 'online shopping',
    consumer: 'consumer apps',
    deployment: 'software releases',
    discovery: 'browsing and discovery',
    fulfillment: 'shipping and delivery',
    handoff: 'handing work to others',
    'issue-triage': 'sorting incoming work',
    'live-state': 'live updates',
    operations: 'business operations',
    recovery: 'fixing failures',
    retention: 'repeat use',
    routing: 'assigning work',
    substitution: 'replacements',
    triage: 'sorting problems',
  }

  return labels[value] ?? value.replaceAll('-', ' ')
}

export function researchStatus(quality: string) {
  return quality === 'captured' ? 'Screenshot available' : 'Research only'
}

export function getFlow(id: string) {
  return content.flows.find((flow) => flow.id === id)
}

export function getNote(id: string) {
  return content.notes.find((note) => note.id === id)
}

export function getRecreation(id: string) {
  return content.recreations.find((recreation) => recreation.id === id)
}

export function getReference(id: string) {
  return content.references.find((reference) => reference.id === id)
}

export function getFlowRelations(flow: Flow) {
  return {
    notes: content.notes.filter((note) => flow.note_ids.includes(note.id)),
    recreations: content.recreations.filter((recreation) =>
      flow.recreation_ids.includes(recreation.id),
    ),
  }
}

export function getFlowByRecreation(recreation: Recreation) {
  return recreation.flowId ? getFlow(recreation.flowId) : undefined
}
