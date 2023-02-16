import {proxy} from 'valtio'
import {proxyMap} from 'valtio/utils'

import {Entity} from '~/simulation/entity'

const defaultState = proxyMap<string, Entity>()
for (let i = 0; i < 2; i++) {
  let ent = new Entity()
  defaultState.set(ent.id, ent)
}

type EntityListState = {
  // List of all possible entities
  entities: Map<string, Entity>

  // The currently selected entity, which is a reference to the list item
  selectedEntity: Entity | null
}
export const state = proxy<EntityListState>({
  entities: defaultState,
  selectedEntity: null,
})

export function setSelectedEntity(entity: Entity | null) {
  state.selectedEntity = entity
}

export function createNewEntity() {
  let entity = new Entity()
  // This could technically create an infinite loop but 8^36 is a big number of possible ids...
  while (state.entities.has(entity.id)) {
    entity = new Entity()
  }
  state.entities.set(entity.id, entity)
  setSelectedEntity(entity)
}
