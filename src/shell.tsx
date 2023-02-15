import * as React from 'react'

import {globalStyles} from './theme'

export function Shell({children}: {children: React.ReactNode}) {
  globalStyles()
  return <React.StrictMode>{children}</React.StrictMode>
}
