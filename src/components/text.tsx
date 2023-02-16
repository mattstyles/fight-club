import {styled} from '~/theme'

export const Text = styled('span', {
  defaultVariants: {
    type: 'text',
    size: 'medium',
    color: 'highContrast',
  },

  variants: {
    type: {
      text: {},
      listHeading: {
        color: '$textLowContrast',
        letterSpacing: 1.2,
        fontSize: '$m',
        lineHeight: '$m',
        fontWeight: 700,
        fontVariantCaps: 'all-small-caps',
      },
    },
    color: {
      highContrast: {
        color: '$text',
      },
      lowContrast: {
        color: '$textLowContrast',
      },
    },
    size: {
      small: {
        fontSize: '$s',
        lineHeight: '$s',
      },
      medium: {
        fontSize: '$m',
        lineHeight: '$m',
      },
      large: {
        fontSize: '$l',
        lineHeight: '$l',
      },
    },
  },
})
