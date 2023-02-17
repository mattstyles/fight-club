import random from 'just-random-integer'

const memo = new Map<string, () => number>()

// We could do this with a funky reduce function but its probably quicker imperitively
export function dice(num: number, sides: number, mod: number): number {
  var total = mod
  for (let i = 0; i < num; i++) {
    total = total + random(1, sides)
  }
  return total
}

const rePart2 = /(?<n>^[0-9]+)d(?<m>[0-9]+$)/
const rePart3 = /(?<n>^[0-9]+)d(?<m>[0-9]+)\+(?<mod>[0-9]+$)/
export function diceString(str: string): number {
  if (rePart2.test(str)) {
    const match = str.match(rePart2)
    if (match == null) {
      throw new Error('Error parsing dice string')
    }
    const n = parseInt(match[1])
    const m = parseInt(match[2])
    if (Number.isNaN(n) || Number.isNaN(m)) {
      throw new Error('Error parsing dice string')
    }
    return dice(n, m, 0)
  }

  if (rePart3.test(str)) {
    const match = str.match(rePart3)
    if (match == null) {
      throw new Error('Error parsing dice string')
    }
    const n = parseInt(match[1])
    const m = parseInt(match[2])
    const mod = parseInt(match[3])
    if (Number.isNaN(n) || Number.isNaN(m) || Number.isNaN(mod)) {
      throw new Error('Error parsing dice string')
    }
    return dice(n, m, mod)
  }

  throw new Error('Can not parse dice string')
}

// General purpose dice function
export function d(n: string): number
export function d(n: number, m: number, mod?: number): number
export function d(n: number | string, m?: number, mod?: number): number {
  if (typeof n === 'string') {
    return diceString(n)
  }

  return dice(n, m ?? 1, mod ?? 0)
}
