import * as React from 'react'

import {globalStyles} from '~/theme'
import {Toast} from '~/components'

export function Shell({children}: {children: React.ReactNode}) {
  globalStyles()
  return (
    <React.StrictMode>
      <Toast.Provider swipeDirection='down'>{children}</Toast.Provider>
    </React.StrictMode>
  )
}
