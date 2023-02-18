import type {Entity} from '~/simulation/entity'

import {mutate} from 'swr'
import {ChangeEventHandler} from 'react'

import {Input, Stack, Text, Spacer} from '~/components'

type Props = {
  entity: Entity
  onEdit: (entity: Entity) => void
}
export function EditEntity({entity, onEdit}: Props) {
  return (
    <Stack>
      <Text type='mutedAdditional'>{entity.id}</Text>
      <Spacer size='medium' />
      <form>
        <Stack gap='large'>
          <EditString
            label='Name'
            value={entity.name}
            onEdit={(event) => {
              const value = event.target.value
              entity.name = value
              onEdit(entity)
              /// This is a bit crap as its an unusual side effect
              mutate('all-entities')
            }}
          />
          <EditNumber
            label='Health'
            value={entity.health + ''}
            onEdit={(event) => {
              const value = event.target.value
              const nValue = parseInt(value) || 0
              entity.health = nValue
              onEdit(entity)
            }}
          />
          <EditNumber
            label='Stamina'
            value={entity.stamina + ''}
            onEdit={(event) => {
              const value = event.target.value
              const nValue = parseInt(value) || 0
              entity.stamina = nValue
              onEdit(entity)
            }}
          />
        </Stack>
      </form>
    </Stack>
  )
}

type EditProps = {
  label: string
  value: string
  onEdit: ChangeEventHandler<HTMLInputElement>
}
function EditString({label, value, onEdit}: EditProps) {
  return (
    <Stack>
      <Text as='label' htmlFor={label}>
        {label}
      </Text>
      <Input id={label} value={value} onChange={onEdit} />
    </Stack>
  )
}

function EditNumber({label, value, onEdit}: EditProps) {
  return (
    <Stack>
      <Text as='label' htmlFor={label}>
        {label}
      </Text>
      <Input id={label} type='number' value={value} onChange={onEdit} />
    </Stack>
  )
}
