import {proxy} from 'valtio'

import {Entity} from '~/simulation/entity'

type SimulationState = {
  entity: Entity | null
}
export const sim = proxy<SimulationState>({
  entity: null,
})

export function setEntityForSimulation(entity: Entity) {
  sim.entity = entity
}
