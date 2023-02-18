import {styled} from '~/theme'

export const Input = styled('input', {
  all: 'unset',
  color: '$text',
  background: '$gray3',
  borderRadius: '$1',
  borderColor: 'transparent',
  borderWidth: '2px',
  borderStyle: 'solid',
  transition: 'border 200ms ease-in-out',
  padding: '0 $3',
  height: '$7',

  // Focus and hover states? and placeholder?
  '&:hover': {
    borderColor: '$primary4',
  },

  '&:focus': {
    borderColor: '$primary6',
  },
})
