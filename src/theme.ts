import type * as Stitches from '@stitches/react'
import {createStitches} from '@stitches/react'

export const {styled, config, globalCss} = createStitches({
  theme: {
    colors: {
      primary: 'hotpink',
    },
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
