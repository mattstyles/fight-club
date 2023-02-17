import {Suspense} from 'react'
import {useSnapshot} from 'valtio'
import useSWR from 'swr'

import {Container, Stack, Text, Button} from '~/components'

import {state, persistedState} from './state'

export function Main() {
  return (
    <Suspense fallback={<div>Main suspending</div>}>
      <Content />
    </Suspense>
  )
}

function Content() {
  const {selectedEntityId} = useSnapshot(state)
  const {data: entity} = useSWR(
    selectedEntityId,
    async (key) => {
      return await persistedState.get(key)
    },
    {suspense: true}
  )

  if (entity == null) {
    return (
      <Container>
        <Text>
          Use the list to select an entity to edit, or create a new one.
        </Text>
      </Container>
    )
  }

  return (
    <Container>
      <Text>{entity.id}</Text>
      <Text>{entity.name}</Text>
      <Text>{entity.health}</Text>
    </Container>
  )
}
