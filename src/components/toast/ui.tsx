import * as ToastPrimitive from '@radix-ui/react-toast'
import {Cross2Icon} from '@radix-ui/react-icons'
import * as React from 'react'

import {Button} from '../button'
import {styled, keyframes} from '~/theme'

const hide = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
})

const slideIn = keyframes({
  from: {
    transform: 'translateX(calc(100% + 25px))',
  },
  to: {
    transform: 'translateX(0)',
  },
})

export const Provider = ToastPrimitive.Provider
export const Title = ToastPrimitive.Title

type ToastProps = React.ComponentProps<typeof StyledRoot>
export function Root({children, ...rootProps}: ToastProps) {
  return (
    <StyledRoot {...rootProps}>
      {children}
      <Close aria-label='close' asChild>
        <Button isCircular isIcon size='small' color='transparent'>
          <Cross2Icon />
        </Button>
      </Close>
    </StyledRoot>
  )
}

const StyledRoot = styled(ToastPrimitive.Root, {
  backgroundColor: '$gray2',
  boxShadow:
    '0 4px 8px -1px hsla(0, 0%, 0%, 0.12), 0 12px 20px 0px hsla(0, 0%, 0%, 0.12)',
  borderRadius: '$2',
  padding: '$4',
  display: 'grid',
  gridTemplateAreas: "'content action close'",
  gridTemplateColumns: 'auto max-content max-content',
  columnGap: 15,
  alignItems: 'center',

  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${hide} 100ms ease-in`,
  },
})

export const Viewport = styled(ToastPrimitive.Viewport, {
  position: 'fixed',
  top: '$4',
  right: '$3',
  display: 'flex',
  flexDirection: 'column',
  padding: '$2',
  gap: '$3',
  width: 390,
  maxWidth: '100vw',
  margin: 0,
  listStyle: 'none',
  zIndex: 1234567,
  outline: 'none',
})

export const Content = styled('div', {
  gridArea: 'content',
})

export const Action = styled(ToastPrimitive.Action, {})

export const Close = styled(ToastPrimitive.Close, {})
