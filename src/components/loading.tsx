import {ReloadIcon} from '@radix-ui/react-icons'

import {Center} from './center'

import {styled, keyframes} from '~/theme'

export function Loading() {
  return (
    <Center>
      <Spinner>
        <ReloadIcon />
      </Spinner>
    </Center>
  )
}

export function InlineLoading() {
  return (
    <LoadingContainer>
      <Loading />
    </LoadingContainer>
  )
}

const spin = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
})

const Spinner = styled('div', {
  animation: `${spin} 600ms linear infinite`,
})

const LoadingContainer = styled('div', {
  padding: '$6',
  minWidth: 320,
})
