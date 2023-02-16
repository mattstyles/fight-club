import {useSnapshot} from 'valtio'
import {useMemo, useState} from 'react'
import {RocketIcon} from '@radix-ui/react-icons'

import {
  Container,
  DebouncedButton,
  Button,
  Flex,
  Text,
  ListSelect,
  Stack,
  Toast,
} from '~/components'

import {state, setSelectedEntity, createNewEntity} from './state'

function onSelectEntity(id: string) {
  const entity = state.entities.get(id)
  setSelectedEntity(entity ?? null)
}

function onCreateEntity() {
  createNewEntity()
}

export function Aside() {
  const {entities, selectedEntity} = useSnapshot(state)

  const sortedEntities = useMemo(() => {
    return Array.from(entities.values()).sort((a, b) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
    })
  }, [entities])

  const [isOpen, setIsOpen] = Toast.useSingleToastState(false)

  return (
    <Container
      as='aside'
      color='gray'
      fill='v'
      css={{
        minWidth: 240,
        maxWidth: 320,
      }}>
      <Stack gap='large'>
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
            onClick={() => {
              onCreateEntity()
              setIsOpen(true)
              // This is now wrapped up in the hook
              // setIsOpen(false)
              // setTimeout(() => {
              //   setIsOpen(true)
              // }, 100)
            }}>
            <RocketIcon />
          </DebouncedButton>
        </Flex>
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
        <ListSelect.Group
          defaultValue={selectedEntity?.id ?? ''}
          value={selectedEntity?.id ?? ''}
          onValueChange={onSelectEntity}>
          {sortedEntities.map((entity) => {
            return (
              <ListSelect.Item key={entity.id} value={entity.id}>
                {entity.name}
              </ListSelect.Item>
            )
          })}
        </ListSelect.Group>
      </Stack>
    </Container>
  )
}
