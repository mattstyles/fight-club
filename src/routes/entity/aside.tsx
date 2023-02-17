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
  selectedId: string
  setSelectedId: React.Dispatch<React.SetStateAction<string>>
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
type AsideContentProps = {
  selectedId: string
  setSelectedId: React.Dispatch<React.SetStateAction<string>>
}
function Content({selectedId, setSelectedId}: AsideProps) {
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

  // First param is `isPending`, IDB is always fast but we could disable the UI here somehow. Due to startTransition we will show old UI for a bit which will be interative, which _could_ be confusing if slow. This way avoids flashing of a loading spinner though.
  // Probably a good idea to show some sort of spinner (after a delay (which could be done in CSS)) but we would need more control over what happens in the ListItem for that
  const [isPending, startTransition] = useTransition()
  const onSelectEntity = useCallback(
    (id: string) => {
      setLocalSelected(id)
      startTransition(() => {
        setSelectedId(id)
      })
    },
    [setSelectedId]
  )

  const [isOpen, setIsOpen] = Toast.useSingleToastState(false)

  const onCreateEntity = useCallback(async () => {
    const entity = await createNewEntity()
    await mutate()
    setIsOpen(true)
    onSelectEntity(entity.id)
  }, [setIsOpen, setSelectedId])

  return (
    <Stack gap='medium'>
      <CreateEntityToast isOpen={isOpen} setIsOpen={setIsOpen} />
      <Heading onCreateEntity={onCreateEntity} setSelectedId={setSelectedId} />
      {entities.length === 0 && (
        <DebouncedButton color='neutral' onClick={onCreateEntity}>
          Create new entity
        </DebouncedButton>
      )}
      {entities.length > 0 && (
        <ListSelect.Group
          defaultValue={localSelected}
          value={localSelected}
          onValueChange={onSelectEntity}>
          {entities.map((entity) => {
            return (
              <ListSelect.Item key={entity.id} value={entity.id}>
                <Flex
                  orientation='h'
                  alignment='center'
                  justify='spread'
                  size='full'>
                  {entity.name}
                  <Reveal isShowing={isPending && entity.id === localSelected}>
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
  setSelectedId: React.Dispatch<React.SetStateAction<string>>
}
function Heading({onCreateEntity, setSelectedId}: AsideHeadingProps) {
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

//Note that this will disappear when the tab is changed as this root will be destroyed, this is fine, but we could be better about this and have it persist by dropping a toast into a queue and render that queue somewhere more global, probably within shell. Possibly this should be a priority queue to allow us to manipulate toasts. Extracting and just calling a function allows us to be a bit smarter with managing the timeouts rather than force the consumer to do so. Each toast type could represent a toast, you then fire the function with that type and it renders, or we could force passing a component. There is a subtlety though, try clicking the button multiple times and notice the animation fires, this is good, because these are the same message - in our queue we might want the concept of a message group such that newer toasts will replace one in the same group.
function CreateEntityToast({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  return (
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
  )
}
