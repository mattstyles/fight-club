import {styled} from '~/theme'

export const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '$1',
  borderColor: '$transparent',
  borderWidth: '$2',
  borderStyle: 'solid',
  padding: '0 $5',
  height: '$7',
  letterSpacing: '-0.2px',
  transition: 'background 200ms ease-in-out',

  '&:disabled': {
    backgroundColor: '$gray5',
    color: '$gray11',
    cursor: 'not-allowed',
    '&:hover': {
      backgroundColor: '$gray5',
    },
  },

  defaultVariants: {
    color: 'neutral',
  },

  variants: {
    color: {
      white: {
        backgroundColor: '$white',
        color: '$text',
        '&:hover': {
          backgroundColor: '$gray4',
        },
        '&:active': {
          backgroundColor: '$gray5',
        },
        '&:focus': {
          borderColor: '$gray7',
        },
      },
      neutral: {
        backgroundColor: '$gray4',
        color: '$text',
        '&:hover': {
          backgroundColor: '$gray5',
        },
        '&:active': {
          backgroundColor: '$gray6',
        },
        '&:focus': {
          borderColor: '$gray7',
        },
      },
      transparent: {
        backgroundColor: '$transparent',
        color: '$text',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        '&:focus': {
          borderColor: 'rgba(0, 0, 0, 0.35)',
        },
      },
      primary: {
        backgroundColor: '$primary3',
        color: '$primary12',
        '&:hover': {
          backgroundColor: '$primary4',
        },
        '&:focus': {
          borderColor: '$primary6',
        },
        '&:active': {
          backgroundColor: '$primary5',
        },
      },
    },
    isCircular: {
      true: {
        borderRadius: '$round',
      },
    },
    width: {
      none: {},
      small: {
        minWidth: 40,
      },
      medium: {
        minWidth: 100,
      },
      large: {
        minWidth: 180,
      },
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
    isIcon: {
      true: {},
    },
  },

  compoundVariants: [
    {
      size: 'small',
      isIcon: true,
      css: {
        width: '$5',
        height: '$5',
        padding: '$2',
      },
    },
    {
      size: 'medium',
      isIcon: true,
      css: {
        width: '$6',
        height: '$6',
        padding: '$2',
      },
    },
    {
      size: 'large',
      isIcon: true,
      css: {
        width: '$8',
        height: '$8',
        padding: '$2',
      },
    },
  ],
})
