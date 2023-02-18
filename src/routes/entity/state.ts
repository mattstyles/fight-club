import type {Entity} from '~/simulation/entity'

import {create} from '~/simulation/entity'
import {PersistData} from '~/state/persist'

export type Actions = {
  onSelectEntity: (id: string) => void
  onCreateEntity: () => Promise<void>
}

export async function createNewEntity(): Promise<Entity> {
  let entity = create()
  // This could technically create an infinite loop but 8^36 is a big number of possible ids...
  while ((await state.get(entity.id)) != null) {
    entity = create()
  }
  await state.set(entity)
  return entity
}

export const state = new PersistData<Entity>('fight-club', 'entities')
