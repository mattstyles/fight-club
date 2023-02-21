/**
 * We can use enums better here. We're using enums to get the compiler to check callsites rather than validating strings or object keys, but this is currently a bit of a mess with a lot of repetition and is not scalable.
 */

import {Entity} from './entity'
import {isInMask} from '~/utils/bit'

export type Move = {
  type: Moveset
  gene: MoveGene
  mask: MoveMask
  name: string
}

export enum MoveMask {
  // Does not block or attack, but regains a lot of stamina
  Rest = 1,
  // Weak block move, but regains a little stamina
  Parry = 2,
  // Block some incoming direct damage, uses stamina
  Block = 4,
  // Weak direct attack, uses some stamina
  Strike = 8,
  // Strong direct attack, uses a lot of stamina
  Bash = 16,
  // Applies a weakness debuff to opponent, uses some mana
  Weaken = 32,
  // Applies a vulnerable debuff to opponent, use some mana
  Taunt = 64,
  // Moderate magical attack, uses a lot of mana
  Zap = 128,
}

export enum MoveGene {
  Rest = 0,
  Parry = 1,
  Block = 2,
  Strike = 3,
  Bash = 4,
  Weaken = 5,
  Taunt = 6,
  Zap = 7,
}

export enum Moveset {
  Rest,
  Parry,
  Block,
  Strike,
  Bash,
  Weaken,
  Taunt,
  Zap,
}

export const movesetArr = [
  Moveset.Rest,
  Moveset.Parry,
  Moveset.Block,
  Moveset.Strike,
  Moveset.Bash,
  Moveset.Weaken,
  Moveset.Taunt,
  Moveset.Zap,
]

export function getMove(moveId: Moveset): Move {
  switch (moveId) {
    case Moveset.Rest:
      return {
        type: Moveset.Rest,
        gene: MoveGene.Rest,
        mask: MoveMask.Rest,
        name: 'Rest',
      }
    case Moveset.Parry:
      return {
        type: Moveset.Parry,
        gene: MoveGene.Parry,
        mask: MoveMask.Parry,
        name: 'Parry',
      }
    case Moveset.Block:
      return {
        type: Moveset.Block,
        gene: MoveGene.Block,
        mask: MoveMask.Block,
        name: 'Block',
      }
    case Moveset.Strike:
      return {
        type: Moveset.Strike,
        gene: MoveGene.Strike,
        mask: MoveMask.Strike,
        name: 'Strike',
      }
    case Moveset.Bash:
      return {
        type: Moveset.Bash,
        gene: MoveGene.Bash,
        mask: MoveMask.Bash,
        name: 'Bash',
      }
    case Moveset.Weaken:
      return {
        type: Moveset.Weaken,
        gene: MoveGene.Weaken,
        mask: MoveMask.Weaken,
        name: 'Weaken',
      }
    case Moveset.Taunt:
      return {
        type: Moveset.Taunt,
        gene: MoveGene.Taunt,
        mask: MoveMask.Taunt,
        name: 'Taunt',
      }
    case Moveset.Zap:
      return {
        type: Moveset.Zap,
        gene: MoveGene.Zap,
        mask: MoveMask.Zap,
        name: 'Zap',
      }
  }
}

export function getAvailableMoveset(entity: Entity): Set<Moveset> {
  const moveset = new Set<Moveset>()
  movesetArr.forEach((move) => {
    const m = getMove(move)
    if (isInMask(m.mask, entity.genomeMask)) {
      moveset.add(m.type)
    }
  })
  return moveset
}
