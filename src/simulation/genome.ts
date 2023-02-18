/**
 * The genome refers to modifiers that can be applied to actions, effectively we are trying to evolve some 'intelligence' over which move an entity selects for each round of play. Each potential move is evaluated based on simulation conditions and then the modifier is applied to that evaluation. For example, a healing move might be preferred based on low health, but the modifier for an entity might be really low which means that this move will not be selected and another played instead.
 * Each value represents 0...1 as a modifier.
 */

// We will use a tuple as give TS more hints about what we are using it for, although I think we might need a more complex structure here
export type Genome = [number, number, number, number, number]
