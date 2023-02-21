import {proxy} from 'valtio'

import {Entity} from '~/simulation/entity'

type SimulationConfigState = {
  // The target being evolved
  target: Entity | null
  // Opponents that the target is matched against for fitness
  agents: Entity | null

  // Population size for each generation
  populationSize: number
  // Number of generations to simulate
  generationSize: number
}

export const simulationConfig = proxy<SimulationConfigState>({
  target: null,
  agents: null,

  populationSize: 100,
  generationSize: 50,
})
