import contentIndex from '../generated/content-index.json'

export type Flow = (typeof contentIndex.flows)[number]
export type Note = (typeof contentIndex.notes)[number]
export type Recreation = (typeof contentIndex.recreations)[number]

export const content = contentIndex

export function getFlow(id: string) {
  return content.flows.find((flow) => flow.id === id)
}

export function getNote(id: string) {
  return content.notes.find((note) => note.id === id)
}

export function getRecreation(id: string) {
  return content.recreations.find((recreation) => recreation.id === id)
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
