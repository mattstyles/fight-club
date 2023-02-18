import type {Entity} from '~/simulation/entity'

import {mutate} from 'swr'
import {ChangeEventHandler, ChangeEvent, useCallback} from 'react'

import {Input, Stack, Text, Spacer} from '~/components'
import {EditGenome} from './editgenome'

type Props = {
  entity: Entity
  update: (entity: Entity) => void
}
export function EditEntity({entity, update}: Props) {
  const onEditName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event?.target.value
      entity.name = value
      update(entity)
      // We need this to update the side bar, this is a bit of a crap side effect rather than the sidebar updating reactively
      mutate('all-entities')
    },
    [update, mutate]
  )
  const onEditHealth = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      const nValue = parseInt(value) || 0
      entity.health = nValue
      update(entity)
    },
    [update]
  )
  const onEditStamina = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      const nValue = parseInt(value) || 0
      entity.stamina = nValue
      update(entity)
    },
    [update]
  )
  const onEditMana = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      const nValue = parseInt(value) || 0
      entity.mana = nValue
      update(entity)
    },
    [update]
  )
  return (
    <Stack css={{maxWidth: 320}}>
      <Text type='mutedAdditional'>{entity.id}</Text>
      <Spacer size='small' />
      <form>
        <Stack>
          <Text type='listHeading'>Entity</Text>
          <Stack gap='large'>
            <EditString label='Name' value={entity.name} onEdit={onEditName} />
            <EditNumber
              label='Health'
              value={entity.health + ''}
              onEdit={onEditHealth}
            />
            <EditNumber
              label='Stamina'
              value={entity.stamina + ''}
              onEdit={onEditStamina}
            />
            <EditNumber
              label='Mana'
              value={entity.mana + ''}
              onEdit={onEditMana}
            />
          </Stack>
          <Spacer size='medium' />
          <Text type='listHeading'>Moveset</Text>
          <div />
          <EditGenome entity={entity} update={update} />
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
