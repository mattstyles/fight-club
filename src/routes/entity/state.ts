import type {Entity} from '~/simulation/entity'

import {create} from '~/simulation/entity'
import {PersistData} from '~/state/persist'

export async function createNewEntity(): Promise<Entity> {
  let entity = create()
  // This could technically create an infinite loop but 8^36 is a big number of possible ids...
  while ((await persistedState.get(entity.id)) != null) {
    entity = create()
  }
  await persistedState.set(entity)
  return entity
}

export const persistedState = new PersistData<Entity>('fight-club', 'entities')
