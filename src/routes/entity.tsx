import {Suspense, useState} from 'react'
import {ErrorBoundary} from 'react-error-boundary'

import {
  Stack,
  Flex,
  Spacer,
  Button,
  ErrorFallback,
  Container,
  InlineLoading,
} from '~/components'

import {Aside} from './entity/aside'
import {Main} from './entity/main'

export function EntityRoute() {
  const [selectedId, setSelectedId] = useState<string>('')
  console.log(selectedId)
  return (
    <Container size='full' padding='none'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<InlineLoading />}>
          <Flex orientation='h'>
            <Aside selectedId={selectedId} setSelectedId={setSelectedId} />
            <Spacer size='large' />
            <Main selectedId={selectedId} />
          </Flex>
        </Suspense>
      </ErrorBoundary>
    </Container>
  )
}
