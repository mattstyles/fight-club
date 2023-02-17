import {useSnapshot} from 'valtio'
import * as React from 'react'
import {Suspense, useMemo, useState, useCallback, useTransition} from 'react'
import {RocketIcon} from '@radix-ui/react-icons'
import useSWR from 'swr'

import {
  Container,
  DebouncedButton,
  Button,
  Flex,
  Text,
  ListSelect,
  Stack,
  Toast,
  InlineLoading,
} from '~/components'

import {createNewEntity, persistedState} from './state'

type AsideProps = {
  selectedId: string
  setSelectedId: React.Dispatch<React.SetStateAction<string>>
}
export function Aside({selectedId, setSelectedId}: AsideProps) {
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
        <Content selectedId={selectedId} setSelectedId={setSelectedId} />
      </Suspense>
    </Container>
  )
}

// @TODO add scroll area to deal with lots of entities, this is fairly low priority as it is unlikely ot happen
type AsideContentProps = {
  selectedId: string
  setSelectedId: React.Dispatch<React.SetStateAction<string>>
}
function Content({selectedId, setSelectedId}: AsideContentProps) {
  // @TODO IDB will sort by id on entry (I think), but we might want to sort by name. We could also do this with an index. Might get interesting for puts though.
  const {data: entities, mutate} = useSWR(
    'all-entities',
    async () => {
      return await persistedState.getAll()
    },
    {suspense: true}
  )

  // const sortedEntities = useMemo(() => {
  //   return Array.from(entities.values()).sort((a, b) => {
  //     return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  //   })
  // }, [entities])

  const onUpdate = useCallback(async () => {
    await mutate()
  }, [mutate])

  // First param is `isPending`, IDB is always fast but we could disable the UI here somehow. Due to startTransition we will show old UI for a bit which will be interative, which _could_ be confusing if slow. This way avoids flashing of a loading spinner though.
  const [_, startTransition] = useTransition()
  const onSelectEntity = useCallback(
    (id: string) => {
      startTransition(() => {
        setSelectedId(id)
      })
    },
    [setSelectedId]
  )

  return (
    <Stack gap='large'>
      <Heading onUpdate={onUpdate} setSelectedId={setSelectedId} />
      <ListSelect.Group
        defaultValue={selectedId}
        value={selectedId}
        onValueChange={onSelectEntity}>
        {entities.map((entity) => {
          return (
            <ListSelect.Item key={entity.id} value={entity.id}>
              {entity.name}
            </ListSelect.Item>
          )
        })}
      </ListSelect.Group>
    </Stack>
  )
}

type AsideHeadingProps = {
  onUpdate: () => Promise<void>
  setSelectedId: React.Dispatch<React.SetStateAction<string>>
}
function Heading({onUpdate, setSelectedId}: AsideHeadingProps) {
  const [isOpen, setIsOpen] = Toast.useSingleToastState(false)

  const [_, startTransition] = useTransition()
  const onCreateEntity = useCallback(async () => {
    const entity = await createNewEntity()
    await onUpdate()
    setIsOpen(true)
    startTransition(() => {
      setSelectedId(entity.id)
    })
  }, [setIsOpen, setSelectedId, onUpdate])

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
      {/** Note that this will disappear when the tab is changed as this root will be destroyed, this is fine, but we could be better about this and have it persist by dropping a toast into a queue and render that queue somewhere more global, probably within shell. Possibly this should be a priority queue to allow us to manipulate toasts. Extracting and just calling a function allows us to be a bit smarter with managing the timeouts rather than force the consumer to do so. Each toast type could represent a toast, you then fire the function with that type and it renders, or we could force passing a component. There is a subtlety though, try clicking the button multiple times and notice the animation fires, this is good, because these are the same message - in our queue we might want the concept of a message group such that newer toasts will replace one in the same group. */}
      <Toast.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        type='background'
        duration={3000}>
        <Toast.Content>
          <Stack orientation='h' gap='large' alignment='center'>
            <RocketIcon />
            <Text size='small'>New entity created</Text>
          </Stack>
        </Toast.Content>
      </Toast.Root>
    </Flex>
  )
}
