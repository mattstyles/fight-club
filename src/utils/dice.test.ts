import {describe, test, expect} from 'vitest'

import {d, dice, diceString} from './dice'

// Size denotes the 'breadth' of the sample size
// n denotes the number of rolls
function generateStatTest(
  fn: () => number,
  size: number = 10,
  n: number = 1e4
): Array<number> {
  const sample = Array.from({length: size}).map((_) => 0)
  while (--n > 0) {
    let result = fn()
    let total = sample[result]
    sample[result] = total + 1
  }
  return sample
}

describe('Dice functions', () => {
  // We will generate a sample of dice rolls for various inputs and ensure that that sample generates numbers only within a specified range. We will not check variance.
  test('Dice function should handle returning values for different configurations of dice', () => {
    const tests: Array<{
      fixture: [number, number, number]
      expectedRange: [number, number]
    }> = [
      {
        fixture: [1, 6, 0],
        expectedRange: [1, 6],
      },
      {
        fixture: [1, 4, 2],
        expectedRange: [3, 6],
      },
      {
        fixture: [2, 6, 0],
        expectedRange: [2, 12],
      },
    ]

    for (let t of tests) {
      let sample = generateStatTest(() => dice(...t.fixture), 20)
      // There should be no samples outside of the given expected range
      // We only check 1 place outside, we _could_ ensure that no dice rolls land outside though but it seems overkill
      let [min, max] = t.expectedRange
      if (min > 0) {
        expect(sample[min - 1]).toBe(0)
      }
      if (max + 1 < sample.length) {
        expect(sample[max + 1]).toBe(0)
      }

      // Ensure that each value within the range has been hit
      for (let m = min; m < max; m++) {
        expect(sample[m] > 0).toBe(true)
      }
    }
  })

  test('Testing validity of the dice string::good cases', () => {
    const nValues = [0, 1, 10, 100]
    const mValues = [0, 6, 10, 100]
    const modValues = [0, 2, 10, 100]

    // Test 2 part i.e. 1d6
    for (let n of nValues) {
      for (let m of mValues) {
        expect(() => diceString(`${n}d${m}`)).not.toThrow()
      }
    }

    // Test 3 part i.e. 1d6+2
    for (let n of nValues) {
      for (let m of mValues) {
        for (let mod of modValues) {
          expect(() => diceString(`${n}d${m}+${mod}`)).not.toThrow()
        }
      }
    }
  })

  test('Testing the validity of the dice string::bad cases', () => {
    const fixtures = [
      '1dd4',
      '1',
      'd1d6',
      '1d7d',
      '1d7++0',
      '7+0',
      '20dd0+z',
      'zalgo',
    ]

    for (let str of fixtures) {
      expect(() => diceString(str)).toThrow()
    }
  })

  test('Test that the dice string does return something decent', () => {
    const tests: Array<{
      fixture: string
      expectedRange: [number, number]
    }> = [
      {
        fixture: '1d6+0',
        expectedRange: [1, 6],
      },
      {
        fixture: '1d4+2',
        expectedRange: [3, 6],
      },
      {
        fixture: '2d6+1',
        expectedRange: [3, 13],
      },
    ]

    for (let t of tests) {
      let sample = generateStatTest(() => diceString(t.fixture), 20)
      // There should be no samples outside of the given expected range
      // We only check 1 place outside, we _could_ ensure that no dice rolls land outside though but it seems overkill
      let [min, max] = t.expectedRange
      if (min > 0) {
        expect(sample[min - 1]).toBe(0)
      }
      if (max + 1 < sample.length) {
        expect(sample[max + 1]).toBe(0)
      }

      // Ensure that each value within the range has been hit
      for (let m = min; m < max; m++) {
        expect(sample[m] > 0).toBe(true)
      }
    }
  })

  test('d function parameters', () => {
    const res1 = d(1, 6, 1)
    expect(res1 > 1 && res1 <= 7).toBe(true)

    const res2 = d('1d6+1')
    expect(res2 > 1 && res2 <= 7).toBe(true)
  })
})
