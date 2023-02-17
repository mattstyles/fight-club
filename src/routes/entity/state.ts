import type {Entity} from '~/simulation/entity'

import {proxy} from 'valtio'
import {proxyMap} from 'valtio/utils'

import {create} from '~/simulation/entity'
import {PersistData} from '~/state/persist'

type EntityListState = {
  // The currently selected entity, which is a reference to the list item
  selectedEntityId: string | null
}
//  Shame that we can not treat valtio and persisted state as the same thing, just with some persisted and some not. There may be a way to do that, although for now as it affects data fetching and immediacy we will leave them separate.
export const state = proxy<EntityListState>({
  selectedEntityId: null,
})

export function setSelectedEntity(id: string | null) {
  state.selectedEntityId = id
}

export async function createNewEntity(): Promise<Entity> {
  let entity = create()
  // This could technically create an infinite loop but 8^36 is a big number of possible ids...
  while ((await persistedState.get(entity.id)) != null) {
    entity = create()
  }
  await persistedState.set(entity)
  setSelectedEntity(entity.id)

  return entity
}

export const persistedState = new PersistData<Entity>('fight-club', 'entities')
