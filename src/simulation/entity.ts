import type {Genome} from './genome'

import {uuid} from '~/utils/random'
import {d} from '~/utils/dice'

// [Current, Max]
export type Stat = [number, number]
export type Entity = {
  id: string
  name: string

  health: Stat
  stamina: Stat
  mana: Stat
  block: number

  genome: Genome
  genomeMask: number
}

export function create(): Entity {
  const id = uuid()
  const health = d(1, 20, 100)
  const stamina = d(1, 12, 20)
  const mana = d(1, 12, 40)
  return {
    id: id,
    name: id,

    health: [health, health],
    stamina: [stamina, stamina],
    mana: [mana, mana],
    block: 0,

    genome: [
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
      Math.random(),
    ],
    genomeMask: 0,
  }
}
