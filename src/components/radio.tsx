import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import {Flex} from './flex'
import {Spacer} from './spacer'
import {styled} from '~/theme'

export const Group = RadioGroupPrimitive.Root

const StyledRadio = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: '$white',
  width: '$5',
  height: '$5',
  borderRadius: '$round',
  borderColor: '$gray6',
  borderWidth: '2px',
  borderStyle: 'solid',
  '&:hover': {
    backgroundColor: '$gray1',
  },
  '&:focus': {
    borderColor: '$gray5',
  },
})

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: 11,
    height: 11,
    borderRadius: '$round',
    backgroundColor: '$primary3',
  },
})

const Label = styled('label', {
  fontSize: '$m',
  lineHeight: '$3',
  userSelect: 'none',
  flex: 1,

  defaultVariants: {
    color: 'primary',
  },

  variants: {
    color: {
      primary: {
        color: '$text',
      },
    },
  },
})

function Container({children}: {children: React.ReactNode}) {
  return (
    <Flex
      alignment='center'
      orientation='h'
      css={{paddingTop: '$1', paddingBottom: '$1'}}>
      {children}
    </Flex>
  )
}

type ItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>

type Props = {
  children: string
} & ItemProps

export function Item({children, value, ...itemProps}: Props) {
  return (
    <Container>
      <StyledRadio value={value} id={value} {...itemProps}>
        <StyledIndicator />
      </StyledRadio>
      <Spacer size='small' direction='h' />
      <Label htmlFor={value}>{children}</Label>
    </Container>
  )
}
