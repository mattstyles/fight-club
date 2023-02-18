import type {Genome} from './genome'

import {uuid} from '~/utils/random'
import {d} from '~/utils/dice'

export type Entity = {
  id: string
  name: string

  health: number
  stamina: number
  mana: number

  genome: Genome
}

export function create(): Entity {
  const id = uuid()
  return {
    id: id,
    name: id,

    health: d(1, 20, 100),
    stamina: d(1, 12, 20),
    mana: d(1, 12, 40),

    genome: [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
    ],
  }
}
