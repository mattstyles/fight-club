import {proxy} from 'valtio'

export enum PageTab {
  Entity = 'tab_entity',
  Agents = 'tab_agents',
  Simulation = 'tab_simulation',
  Results = 'tab_results',
}

export const page = proxy({
  tab: PageTab.Entity,
})

export function setPageTab(tab: PageTab) {
  page.tab = tab
}
