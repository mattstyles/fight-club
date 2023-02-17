import * as TabsPrimitive from '@radix-ui/react-tabs'

import {styled} from '~/theme'

const StyledRoot = styled(TabsPrimitive.Root, {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  // display: 'block',
  height: '100%',
})

const StyledList = styled(TabsPrimitive.List, {
  display: 'flex',
  flexShrink: 0,
  borderBottomColor: '$gray6',
  borderBottomWidth: '$2',
  borderBottomStyle: 'solid',
  backgroundColor: '$gray1',
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
  color: '$text',
  height: '$7',
  padding: '0 $7',
  margin: '$2',
  position: 'relative',
  userSelect: 'none',
  backgroundColor: 'transparent',
  transition: 'background 200ms ease-in-out',

  '&:focus': {
    borderColor: '$primary7',
  },

  '&:hover': {
    backgroundColor: '$primary4',
    color: '$primary12',
  },

  '&[data-state="active"]': {
    backgroundColor: '$primary5',
    color: '$primary12',
  },
})

const StyledContent = styled(TabsPrimitive.Content, {
  display: 'flex',
  flex: 1,

  '&[data-state="inactive"]': {
    flex: 0,
  },
})

export const Root = StyledRoot
export const List = StyledList
export const Trigger = StyledTrigger
export const Content = StyledContent
