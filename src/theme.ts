import type * as Stitches from '@stitches/react'
import {createStitches} from '@stitches/react'
import {slate, slateDark, purple, blackA, whiteA} from '@radix-ui/colors'

import {fonts, fontSizes, lineHeights} from './theme/typography'
import {
  base as baseColors,
  tokens as tokenColors,
  alphaLight,
} from './theme/colors'
import {space, radii} from './theme/scales'

export const {styled, config, globalCss, keyframes} = createStitches({
  theme: {
    colors: {
      ...baseColors,
      ...slate,
      ...purple,
      ...tokenColors,
      ...alphaLight,
      ...blackA,
      ...whiteA,

      gray1: '$slate1',
      gray2: '$slate2',
      gray3: '$slate3',
      gray4: '$slate4',
      gray5: '$slate5',
      gray6: '$slate6',
      gray7: '$slate7',
      gray8: '$slate8',
      gray9: '$slate9',
      gray10: '$slate10',
      gray11: '$slate11',
      gray12: '$slate12',

      dark1: '$slateDark1',
      dark2: '$slateDark2',
      dark3: '$slateDark3',
      dark4: '$slateDark4',
      dark5: '$slateDark5',
      dark6: '$slateDark6',
      dark7: '$slateDark7',
      dark8: '$slateDark8',
      dark9: '$slateDark9',
      dark10: '$slateDark10',
      dark11: '$slateDark11',
      dark12: '$slateDark12',

      primary1: '$purple1',
      primary2: '$purple2',
      primary3: '$purple3',
      primary4: '$purple4',
      primary5: '$purple5',
      primary6: '$purple6',
      primary7: '$purple7',
      primary8: '$purple8',
      primary9: '$purple9',
      primary10: '$purple10',
      primary11: '$purple11',
      primary12: '$purple12',
    },
    fonts: fonts,
    space: space,
    sizes: space,
    radii: radii,
    fontSizes: fontSizes,
    lineHeights: lineHeights,
  },
})

export type CSS = Stitches.CSS<typeof config>

export const globalStyles = globalCss({
  body: {
    margin: 0,
    padding: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
})
