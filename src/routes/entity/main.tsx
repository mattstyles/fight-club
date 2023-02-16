import {useSnapshot} from 'valtio'

import {Container, Stack, Text, Button} from '~/components'

import {state} from './state'

export function Main() {
  const {selectedEntity} = useSnapshot(state)

  if (selectedEntity == null) {
    return (
      <Container>
        <Text>
          Use the list to select an entity to edit, or create a new one.
        </Text>
      </Container>
    )
  }

  return (
    <Container>
      <Text>{selectedEntity.id}</Text>
      <Text>{selectedEntity.name}</Text>
      <Text>{selectedEntity.health}</Text>
    </Container>
  )
}
