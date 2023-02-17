import {styled} from '~/theme'

export const Flex = styled('div', {
  display: 'flex',

  defaultVariants: {
    orientation: 'v',
  },

  variants: {
    // Alignment and justification will need flipping based on orientation, use compound variants
    alignment: {
      center: {
        alignItems: 'center',
      },
    },
    justify: {
      center: {
        justifyContent: 'center',
      },
      spread: {
        justifyContent: 'space-between',
      },
    },
    orientation: {
      h: {
        flexDirection: 'row',
      },
      v: {
        flexDirection: 'column',
      },
    },
    size: {
      full: {
        flex: 1,
      },
      half: {
        flex: 1 / 2,
      },
      third: {
        flex: 1 / 3,
      },
      quarter: {
        flex: 1 / 4,
      },
    },
  },
})
