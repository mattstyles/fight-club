import {proxy, useSnapshot} from 'valtio'

import {Stack} from '~/components'

import {Aside} from './entity/aside'
import {Main} from './entity/main'

export function EntityRoute() {
  return (
    <Stack orientation='h' gap='large'>
      <Aside />
      <Main />
    </Stack>
  )
}
