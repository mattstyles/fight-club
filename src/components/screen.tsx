import {styled} from '~/theme'

export const Screen = styled('div', {
  height: '100vh',
  width: '100vw',
  // minHeight: '100vh',
  // minWidth: '100vw',

  defaultVariants: {
    color: 'white',
    display: 'block',
  },

  variants: {
    color: {
      white: {
        backgroundColor: '$white',
      },
      app: {
        backgroundColor: '$gray1',
      },
      subtle: {
        backgroundColor: '$gray2',
      },
    },
    display: {
      block: {
        display: 'block',
      },
      flex: {
        display: 'flex',
      },
    },
  },
})
