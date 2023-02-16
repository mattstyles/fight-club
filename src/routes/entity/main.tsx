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
      <Text>{selectedEntity.health}</Text>
      <Stack>
        <Button>Hello world</Button>
        <Button color='white'>White button</Button>
        <Button color='transparent'>Transparent</Button>
        <Button color='primary'>Primary</Button>
        <Button color='neutral'>Neutral</Button>
        <Button color='primary' disabled>
          Primary
        </Button>
      </Stack>
    </Container>
  )
}
