import type {Entity} from '~/simulation/entity'

import {useCallback} from 'react'

import {Checkbox, Slider, Stack, Text, Spacer, Flex} from '~/components'
import {isInMask} from '~/utils/bit'
import {Moveset, getMove} from '~/simulation/moves'

type Props = {
  entity: Entity
  update: (entity: Entity) => void
}
export function EditGenome({entity, update}: Props) {
  return (
    <Flex size='full'>
      <Stack gap='large'>
        <EditGene moveId={Moveset.Rest} update={update} entity={entity} />
        <EditGene moveId={Moveset.Parry} update={update} entity={entity} />
        <EditGene moveId={Moveset.Block} update={update} entity={entity} />
        <EditGene moveId={Moveset.Strike} update={update} entity={entity} />
        <EditGene moveId={Moveset.Bash} update={update} entity={entity} />
        <EditGene moveId={Moveset.Weaken} update={update} entity={entity} />
        <EditGene moveId={Moveset.Taunt} update={update} entity={entity} />
        <EditGene moveId={Moveset.Zap} update={update} entity={entity} />
      </Stack>
    </Flex>
  )
}

type EditGeneProps = {
  update: (entity: Entity) => void
  entity: Entity
  moveId: Moveset
}
function EditGene({entity, update, moveId}: EditGeneProps) {
  const move = getMove(moveId)
  const onSelect = useCallback(
    (isActive: boolean) => {
      if (isActive) {
        entity.genomeMask = move.mask | entity.genomeMask
      } else {
        entity.genomeMask = entity.genomeMask ^ move.mask
      }
      update(entity)
    },
    [update, entity]
  )
  const onEdit = useCallback(
    (value: number) => {
      if (value < 0 || value > 1) {
        throw new Error('Attempting to set genetic value outside of 0..1 range')
      }
      entity.genome[move.gene] = value
      update(entity)
    },
    [update, entity]
  )
  const isActive = isInMask(move.mask, entity.genomeMask)
  const value = entity.genome[move.gene]

  return (
    <Flex size='full' orientation='h' justify='spread'>
      <Stack orientation='h'>
        <Checkbox id={move.name} checked={isActive} onChange={onSelect} />
        <Text as='label' htmlFor={move.name}>
          {move.name}
        </Text>
      </Stack>
      <Slider
        defaultValue={value}
        min={0}
        max={1}
        step={0.05}
        onChange={onEdit}
      />
    </Flex>
  )
}
