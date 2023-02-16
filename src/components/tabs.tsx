import * as TabsPrimitive from '@radix-ui/react-tabs'

import {styled} from '~/theme'

const StyledRoot = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
})

const StyledList = styled(TabsPrimitive.List, {
  display: 'flex',
  flexShrink: 0,
  // borderBottomColor: '$gray600',
  // borderBottomWidth: '$2',
  // borderBottomStyle: 'solid',
  backgroundColor: '$gray700',
})

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  unset: 'all',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: '$transparent',
  borderWidth: '2px',
  borderStyle: 'solid',
  borderRadius: '$2',
  fontSize: '$m',
  lineHeight: 1,
  color: '$white',
  height: '$7',
  padding: '0 $7',
  margin: '$2',
  position: 'relative',
  userSelect: 'none',
  backgroundColor: '$gray700',

  '&:focus': {
    borderColor: '$gray500',
  },

  '&:hover': {
    backgroundColor: '$gray800',
  },

  '&[data-state="active"]': {
    // borderColor: '$gray700',
    backgroundColor: '$gray100',
    color: '$text',
  },
})

const StyledContent = styled(TabsPrimitive.Content, {})

export const Root = StyledRoot
export const List = StyledList
export const Trigger = StyledTrigger
export const Content = StyledContent
