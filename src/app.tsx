import {useState} from 'react'

import {styled} from '~/theme'
import {
  Stack,
  Text,
  Heading,
  Container,
  Spacer,
  Screen,
  Button,
  Radio,
} from '~/components'

export function App() {
  const [radioSelect, setRadioSelect] = useState<string>('one')
  return (
    <Screen>
      <Container>
        <Heading>Hello world</Heading>
        <Text>Some more text here</Text>
        <Spacer size='medium' />
        <Stack gap='large'>
          <Stack>
            <Text>One</Text>
            <Text>Two</Text>
            <Text>Three</Text>
          </Stack>
          <Stack orientation='h'>
            <Button width='medium' onClick={() => alert('one')}>
              One
            </Button>
            <Button width='medium' onClick={() => alert('two')}>
              Two
            </Button>
          </Stack>
          <Radio.Group value={radioSelect} onValueChange={setRadioSelect}>
            <Radio.Item value='one'>One</Radio.Item>
            <Radio.Item value='two'>Two</Radio.Item>
          </Radio.Group>
        </Stack>
      </Container>
    </Screen>
  )
}
