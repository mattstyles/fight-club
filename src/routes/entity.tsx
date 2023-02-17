import type {FallbackProps} from 'react-error-boundary'

import {Suspense, useCallback} from 'react'
import useSWR from 'swr'
import {openDB} from 'idb'
import {ErrorBoundary} from 'react-error-boundary'

import {
  Stack,
  Flex,
  Spacer,
  Button,
  ErrorFallback,
  Container,
} from '~/components'

import {Aside} from './entity/aside'
import {Main} from './entity/main'

export function EntityRoute() {
  return (
    <Container size='full' padding='none'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Suspending...</div>}>
          <Flex orientation='h'>
            <Aside />
            <Spacer size='large' />
            <Main />
          </Flex>
        </Suspense>
      </ErrorBoundary>
    </Container>
  )
}
