import {useSnapshot} from 'valtio'
import {useMemo} from 'react'

import {Container, Button, Stack, Text, ListSelect} from '~/components'
import {Entity} from '~/simulation/entity'

import {state, setSelectedEntity} from './state'

function onSelectEntity(id: string) {
  const entity = state.entities.get(id)
  setSelectedEntity(entity ?? null)
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
      <Text type='listHeading' css={{paddingLeft: '$2'}}>
        Entities
      </Text>
      <ListSelect.Group
        defaultValue={selectedEntity?.id ?? ''}
        onValueChange={onSelectEntity}>
        {sortedEntities.map((entity) => {
          return (
            <ListSelect.Item key={entity.id} value={entity.id}>
              {entity.name}
            </ListSelect.Item>
          )
        })}
      </ListSelect.Group>
    </Container>
  )
}
