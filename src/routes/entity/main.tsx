import type {Actions} from './state'
import type {Entity} from '~/simulation/entity'

import {Suspense, useCallback} from 'react'
import useSWR from 'swr'

import {Container, Text, InlineLoading, Button} from '~/components'
import {EditEntity} from '~/components/app/editentity'
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
  const {data: entity, mutate} = useSWR(
    selectedId,
    async (key) => {
      return await state.get(key)
    },
    {suspense: true}
  )
  const update = useCallback(
    async (entity: Entity) => {
      await state.set(entity)
      await mutate(entity)
    },
    [mutate]
  )

  if (entity == null) {
    return (
      <Container size='full'>
        <CTA onClick={actions.onCreateEntity}>Create a new entity</CTA>
      </Container>
    )
  }

  return (
    <Container size='full'>
      <EditEntity entity={entity} update={update} />
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
