import type * as Stitches from '@stitches/react'
import {createStitches} from '@stitches/react'

import {fonts, fontSizes, lineHeights} from './theme/typography'
import {
  base as baseColors,
  grays,
  tokens as tokenColors,
  alphaLight,
} from './theme/colors'
import {space, radii} from './theme/scales'

export const {styled, config, globalCss} = createStitches({
  theme: {
    colors: {
      ...baseColors,
      ...grays,
      ...tokenColors,
      ...alphaLight,
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
