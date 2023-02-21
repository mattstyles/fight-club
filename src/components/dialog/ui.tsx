import * as DialogPrimitive from '@radix-ui/react-dialog'
import {Cross2Icon} from '@radix-ui/react-icons'
import * as React from 'react'

import {Button} from '../button'
import {styled, keyframes} from '~/theme'

type DialogProps = React.ComponentProps<typeof StyledRoot>
export function Dialog({children, ...rootProps}: DialogProps) {
  return (
    <StyledRoot {...rootProps}>
      <DialogPrimitive.Portal>
        <StyledOverlay />
        <StyledContent>
          {children}
          <DialogPrimitive.Close asChild aria-label='close'>
            <StyledCloseButton>
              <Button isCircular isIcon size='small' color='transparent'>
                <Cross2Icon />
              </Button>
            </StyledCloseButton>
          </DialogPrimitive.Close>
        </StyledContent>
      </DialogPrimitive.Portal>
    </StyledRoot>
  )
}

const hide = keyframes({
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0,
  },
})

const hideSlide = keyframes({
  from: {
    opacity: 0,
    transform: 'translate(-50%, -48%) scale(0.96)',
  },
  to: {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
})

const StyledRoot = styled(DialogPrimitive.Root, {})
const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$blackA9',
  position: 'fixed',
  inset: 0,
  animation: `${hide} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})
const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: '$white',
  borderRadius: '$2',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: 680,
  maxHeight: '85vh',
  padding: '$5',
  animation: `${hideSlide} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
})
const StyledCloseButton = styled('div', {
  position: 'absolute',
  top: '$4',
  right: '$4',
})
