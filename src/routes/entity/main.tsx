import type {Actions} from './state'

import {Suspense} from 'react'
import useSWR from 'swr'

import {Container, Text, InlineLoading, Button} from '~/components'
import {styled} from '~/theme'

import {state} from './state'

type MainProps = {
  selectedId: string
  actions: Actions
}
export function Main(props: MainProps) {
  return (
    <Suspense fallback={<InlineLoading />}>
      <Content {...props} />
    </Suspense>
  )
}

function Content({selectedId, actions}: MainProps) {
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
        <CTA onClick={actions.onCreateEntity}>Create a new entity</CTA>
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

const CTA = styled(Button, {
  width: 320,
  height: 240,

  defaultVariants: {
    color: 'primary',
  },
})
