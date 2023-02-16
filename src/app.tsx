import {useState} from 'react'
import {TinyComponentRouter} from 'tiny-component-router'
import {useSnapshot} from 'valtio'

import {Screen, Container, Text, Tabs} from '~/components'
import {PageTab, setPageTab} from '~/state/page'
import {page} from '~/state'
import {routes} from '~/routes'

export function App() {
  const {tab} = useSnapshot(page)
  return (
    <Screen>
      <Tabs.Root
        defaultValue={page.tab}
        onValueChange={(value: string) => {
          // This is actually ok as we only ever pass in the enum, its just that we can not type the tabs component to understand the enum
          setPageTab(value as PageTab)
        }}>
        <Tabs.List>
          {routes.map(({trigger, tab, id}) => {
            return (
              <Tabs.Trigger key={id} value={tab}>
                {trigger}
              </Tabs.Trigger>
            )
          })}
        </Tabs.List>
        {routes.map(({id, tab, Component}) => {
          return (
            <Tabs.Content key={id} value={tab}>
              <Component />
            </Tabs.Content>
          )
        })}
      </Tabs.Root>
    </Screen>
  )
}
