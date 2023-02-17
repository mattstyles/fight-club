import {styled, keyframes} from '~/theme'

const show = keyframes({
  '0%': {
    opacity: 0,
  },
  '30%': {
    opacity: 0,
  },
  '60%': {
    opacity: 1,
  },
  '100%': {
    opacity: 1,
  },
})

const StyledReveal = styled('div', {
  opacity: 1,
  animation: `${show} 500ms ease-in 1`,
})

type RevealProps = {
  isShowing: boolean
  children: React.ReactNode
}
// We handle Reveal like this to omit any children from the DOM and then add them when necessary, using CSS to reveal the contents. This does mean the component will 'pop' out of existence though.
export function Reveal({isShowing, children}: RevealProps) {
  if (!isShowing) {
    return null
  }

  return <StyledReveal>{children}</StyledReveal>
}
