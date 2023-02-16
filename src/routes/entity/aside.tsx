import {useSnapshot} from 'valtio'
import {useMemo} from 'react'
import {RocketIcon} from '@radix-ui/react-icons'

import {
  Container,
  DebouncedButton,
  Button,
  Flex,
  Text,
  ListSelect,
  Stack,
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
            onClick={() => onCreateEntity()}>
            <RocketIcon />
          </DebouncedButton>
        </Flex>
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
