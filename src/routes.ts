import React from 'react'

import {PageTab} from '~/state/page'

import {EntityRoute} from '~/routes/entity'
import {AgentsRoute} from '~/routes/agents'
import {SimulationRoute} from '~/routes/simulation'
import {ResultsRoute} from '~/routes/results'

type Route = {
  id: string
  trigger: string
  tab: PageTab
  Component: React.ElementType
}
export const routes: Array<Route> = [
  {
    id: 'EntityRoute',
    trigger: 'Entity',
    tab: PageTab.Entity,
    Component: EntityRoute,
  },
  {
    id: 'AgentsRoute',
    trigger: 'Agents',
    tab: PageTab.Agents,
    Component: AgentsRoute,
  },
  {
    id: 'SimulationRoute',
    trigger: 'Simulation',
    tab: PageTab.Simulation,
    Component: SimulationRoute,
  },
  {
    id: 'ResultsRoute',
    trigger: 'Results',
    tab: PageTab.Results,
    Component: ResultsRoute,
  },
]
