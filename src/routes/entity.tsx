import type {Entity} from '~/simulation/entity'

import {Suspense, useCallback} from 'react'
import useSWR from 'swr'
import {openDB} from 'idb'

import {Stack, Button} from '~/components'

import {Aside} from './entity/aside'
import {Main} from './entity/main'
import {create} from '~/simulation/entity'

export function EntityRoute() {
  return (
    <Suspense fallback={<div>Suspending...</div>}>
      <Stack orientation='h' gap='large'>
        <Aside />
        <Main />
      </Stack>
    </Suspense>
  )
}
