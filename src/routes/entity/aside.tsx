import {useSnapshot} from 'valtio'
import * as React from 'react'
import {Suspense, useMemo, useState, useCallback, useTransition} from 'react'
import {RocketIcon} from '@radix-ui/react-icons'
import useSWR from 'swr'

import {
  Container,
  DebouncedButton,
  Flex,
  Text,
  ListSelect,
  Stack,
  Toast,
  InlineLoading,
  Loading,
  Reveal,
} from '~/components'

import {createNewEntity, state} from './state'

type AsideProps = {
  isSelectionPending: boolean
  selectedId: string
  onSelectEntity: (id: string) => void
  onCreateEntity: () => Promise<void>
}
export function Aside(props: AsideProps) {
  return (
    <Container
      as='aside'
      color='gray'
      fill='v'
      css={{
        minWidth: 240,
        maxWidth: 320,
      }}>
      <Suspense fallback={<InlineLoading />}>
        <Content {...props} />
      </Suspense>
    </Container>
  )
}

// @TODO add scroll area to deal with lots of entities, this is fairly low priority as it is unlikely ot happen
function Content({
  isSelectionPending,
  selectedId,
  onSelectEntity,
  onCreateEntity,
}: AsideProps) {
  // @TODO IDB will sort by id on entry (I think), but we might want to sort by name. We could also do this with an index. Might get interesting for puts though.
  const {data: entities, mutate} = useSWR(
    'all-entities',
    async () => {
      return await state.getAll()
    },
    {suspense: true}
  )

  // const sortedEntities = useMemo(() => {
  //   return Array.from(entities.values()).sort((a, b) => {
  //     return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  //   })
  // }, [entities])

  const [localSelected, setLocalSelected] = useState(selectedId)
  const onImmediateSelect = useCallback(
    (id: string) => {
      setLocalSelected(id)
      onSelectEntity(id)
    },
    [onSelectEntity]
  )

  return (
    <Stack gap='medium'>
      <Heading onCreateEntity={onCreateEntity} />
      {entities.length === 0 && (
        <DebouncedButton color='neutral' onClick={onCreateEntity}>
          Create new entity
        </DebouncedButton>
      )}
      {entities.length > 0 && (
        <ListSelect.Group
          defaultValue={localSelected}
          value={localSelected}
          onValueChange={onImmediateSelect}>
          {entities.map((entity) => {
            return (
              <ListSelect.Item key={entity.id} value={entity.id}>
                <Flex
                  orientation='h'
                  alignment='center'
                  justify='spread'
                  size='full'>
                  {entity.name}
                  <Reveal
                    isShowing={
                      isSelectionPending && entity.id === localSelected
                    }>
                    <Loading />
                  </Reveal>
                </Flex>
              </ListSelect.Item>
            )
          })}
        </ListSelect.Group>
      )}
    </Stack>
  )
}

type AsideHeadingProps = {
  onCreateEntity: () => Promise<void>
}
function Heading({onCreateEntity}: AsideHeadingProps) {
  return (
    <Flex orientation='h' alignment='center'>
      <Flex size='full'>
        <Text type='listHeading' css={{paddingLeft: '$2'}}>
          Entities
        </Text>
      </Flex>
      <DebouncedButton
        isCircular
        isIcon
        size='small'
        color='neutral'
        onClick={onCreateEntity}>
        <RocketIcon />
      </DebouncedButton>
    </Flex>
  )
}
