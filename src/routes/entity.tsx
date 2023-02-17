import type {FallbackProps} from 'react-error-boundary'

import {Suspense, useCallback} from 'react'
import useSWR from 'swr'
import {openDB} from 'idb'
import {ErrorBoundary} from 'react-error-boundary'

import {Stack, Button, ErrorFallback} from '~/components'

import {Aside} from './entity/aside'
import {Main} from './entity/main'

export function EntityRoute() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div>Suspending...</div>}>
        <Stack orientation='h' gap='large'>
          <Aside />
          <Main />
        </Stack>
      </Suspense>
    </ErrorBoundary>
  )
}
