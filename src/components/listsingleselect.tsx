import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'

import {Flex} from '~/components'
import {styled} from '~/theme'

export const Group = RadioGroupPrimitive.Root

const StyledRadio = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'left',
  padding: '$2 $2',
  width: '100%',
  backgroundColor: 'transparent',
  borderRadius: '$2',
  color: '$text',

  '&:hover': {
    backgroundColor: '$primary4',
    color: '$primary12',
  },

  '&[data-state="checked"]': {
    backgroundColor: '$primary5',
    color: '$primary12',
  },
})

const Label = styled('label', {
  fontSize: '$m',
  lineHeight: '$3',
  userSelect: 'none',
  color: 'inherit',
})

type ItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>

type Props = {
  children: string
} & ItemProps

export function Item({children, value, ...itemProps}: Props) {
  return (
    <Flex
      alignment='center'
      orientation='h'
      css={{paddingTop: '$1', paddingBottom: '$1'}}>
      <StyledRadio value={value} id={value} {...itemProps}>
        <Label htmlFor={value}>{children}</Label>
      </StyledRadio>
    </Flex>
  )
}
