import * as React from 'react'

import {Flex} from './flex'

export function Center({children}: {children: React.ReactNode}) {
  return (
    <Flex alignment='center' justify='center' size='full'>
      {children}
    </Flex>
  )
}
