import {styled} from '~/theme'

export const Stack = styled('div', {
  display: 'grid',

  defaultVariants: {
    gap: 'small',
    orientation: 'v',
  },

  variants: {
    gap: {
      small: {
        gridGap: '$2',
      },
      medium: {
        gridGap: '$3',
      },
      large: {
        gridGap: '$5',
      },
    },
    orientation: {
      h: {
        gridAutoFlow: 'column',
        justifyContent: 'start',
      },
      v: {
        gridAutoFlow: 'row',
      },
    },
    alignment: {
      center: {
        alignItems: 'center',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },
    spread: {
      true: {
        justifyContent: 'space-between',
      },
    },
    justify: {
      spread: {
        justifyContent: 'space-between',
      },
      right: {
        justifyContent: 'flex-end',
      },
    },
  },
})
