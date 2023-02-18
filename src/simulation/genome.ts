/**
 * The genome refers to modifiers that can be applied to actions, effectively we are trying to evolve some 'intelligence' over which move an entity selects for each round of play. Each potential move is evaluated based on simulation conditions and then the modifier is applied to that evaluation. For example, a healing move might be preferred based on low health, but the modifier for an entity might be really low which means that this move will not be selected and another played instead.
 * Each value represents 0...1 as a modifier.
 */

// We will use a tuple as give TS more hints about what we are using it for, although I think we might need a more complex structure here
export type Genome = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
]

export enum Moveset {
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
