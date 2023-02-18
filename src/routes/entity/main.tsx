import {Suspense} from 'react'
import useSWR from 'swr'

import {Container, Text, InlineLoading} from '~/components'

import {state} from './state'

type MainProps = {
  selectedId: string
  onCreateEntity: () => Promise<void>
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
      return await state.get(key)
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
