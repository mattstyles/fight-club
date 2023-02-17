import type {FallbackProps} from 'react-error-boundary'

import {Flex} from './flex'
import {Text} from './text'
import {styled} from '~/theme'

export function ErrorFallback({error}: FallbackProps) {
  return (
    <Container role='alert' alignment='center' justify='center' size='full'>
      <Text>Something went wrong:</Text>
      <Text as='pre' type='mono'>
        {error.message}
      </Text>
    </Container>
  )
}

const Container = styled(Flex, {
  backgroundColor: '$gray3',
  color: '$text',
  borderRadius: '$2',
  padding: '$8',
})
