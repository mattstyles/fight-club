import {Entity} from './entity'
import {Moveset, getMove, getAvailableMoveset} from './moves'
import {d} from '~/utils/dice'
import delay from 'delay'

export type FightClubOptions = {
  delay: number
}
export type Initiator = 'target' | 'agent'
export type ActionSelection = {
  initiator: Initiator
  move: Moveset
}
export type FightRound = {
  actions: Array<ActionSelection>
}
export class FightClub {
  target: Entity
  agent: Entity
  options: FightClubOptions
  rounds: Array<FightRound> = []

  constructor(target: Entity, agent: Entity, options: FightClubOptions) {
    this.target = target
    this.agent = agent
    this.options = options
  }

  async run() {
    // while (target || agent is alive) {
    //   reset transient values (i.e. block should be 0 to start the round)
    //   create fight round (select moves)
    //   record fight round (push to round stack)
    //   apply fight round (play each move)
    // }

    // Check exit condition on the way in here
    if (this.target.health[0] <= 0 || this.agent.health[0] <= 0) {
      return
    }

    // Resets
    this.target.block = 0

    // Select actions
    const round: FightRound = {
      actions: [
        {
          initiator: 'target',
          move: chooseMove(this.target, this.agent),
        },
        {
          initiator: 'agent',
          move: chooseMove(this.agent, this.target),
        },
      ],
    }

    // Record actions
    this.rounds.push(round)

    // Apply actions
    round.actions.forEach((action) => {
      const t = action.initiator === 'target' ? this.target : this.agent
      const a = action.initiator === 'target' ? this.agent : this.target
      applyMove(t, a, action.move)
    })

    // Go next
    await delay(this.options.delay)
    await this.run()
  }
}

function chooseMove(target: Entity, agent: Entity): Moveset {
  // Build map of potential moves and their preferences
  const moves = new Map<Moveset, number>()

  // Get the available moveset
  getAvailableMoveset(target).forEach((move) => {
    switch (move) {
      case Moveset.Rest:
        // More attractive as stamina drops
        let pref = 1 - target.stamina[0] / target.stamina[1]
        // But never if stamina is high
        if (pref < 0.15) {
          pref = 0
        }
        moves.set(Moveset.Rest, pref)
        return
      case Moveset.Strike:
        // If stamina is too low then do not select
        if (target.stamina[0] < 5) {
          moves.set(Moveset.Strike, 0)
          return
        }
        moves.set(Moveset.Strike, 0.5)
        return
      default:
        throw new Error('Not implemented yet ' + move)
    }
  })

  // Apply genetic predisposition to moveset
  moves.forEach((value, move) => {
    const m = getMove(move)
    const multiplier = target.genome[m.gene]
    moves.set(move, value * multiplier)
  })

  // Now select one
  // Just select the highest value move for now (no randomness)
  let selectedMove: Moveset = Moveset.Rest
  let highest = 0
  moves.forEach((value, move) => {
    if (value > highest) {
      highest = value
      selectedMove = move
    }
  })
  return selectedMove
}

function applyMove(target: Entity, agent: Entity, move: Moveset) {
  switch (move) {
    case Moveset.Rest:
      target.stamina[0] = Math.max(
        target.stamina[0] + d(1, 10),
        target.stamina[1]
      )
      return
    case Moveset.Strike:
      target.stamina[0] = Math.min(target.stamina[0] - 5)
      agent.health[0] = Math.max(agent.health[0] - d(1, 6, 2), 0)
      return
    default:
      throw new Error('Not implemented yet:: ' + move)
  }
}
