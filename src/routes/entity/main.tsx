import {Suspense} from 'react'
import {useSnapshot} from 'valtio'
import useSWR from 'swr'

import {styled} from '~/theme'
import {Container, Stack, Text, Button, InlineLoading} from '~/components'

import {persistedState} from './state'

type MainProps = {
  selectedId: string
}
export function Main({selectedId}: MainProps) {
  return (
    <Suspense fallback={<InlineLoading />}>
      <Content selectedId={selectedId} />
    </Suspense>
  )
}

type MainContentProps = {
  selectedId: string
}
function Content({selectedId}: MainContentProps) {
  const {data: entity} = useSWR(
    selectedId,
    async (key) => {
      return await persistedState.get(key)
    },
    {suspense: true}
  )

  if (entity == null) {
    return (
      <Container size='full'>
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
