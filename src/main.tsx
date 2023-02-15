import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'

import {globalStyles} from './theme'
import {Shell} from './shell'
import {App} from './app'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Shell>
    <App />
  </Shell>
)
