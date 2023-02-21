import type {Stat, Entity} from '~/simulation/entity'

import {useEffect} from 'react'
import {useSnapshot, proxy} from 'valtio'

import {styled} from '~/theme'
import {Dialog, Text, Stack, Button} from '~/components'
import {FightClub, ActionSelection} from '~/simulation/fight'
import {getMove} from '~/simulation/moves'

type FightDialogProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  fight: FightClub | null
}
export function FightDialog({isOpen, setIsOpen, fight}: FightDialogProps) {
  if (fight == null) {
    return null
  }

  return (
    <Dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Content fight={fight} />
    </Dialog.Dialog>
  )
}

function Content({fight}: {fight: FightClub}) {
  const state = useSnapshot(fight)

  useEffect(() => {
    if (fight == null) {
      return
    }

    // @TODO Start the fight auto-simulating
    // this is a bit nasty
    async function run() {
      await fight.run()
    }
    run()
  }, [fight])

  return (
    <Stack gap='large'>
      <Stack orientation='h' gap='large'>
        <DisplayEntity entity={fight.target} />
        <DisplayEntity entity={fight.agent} />
      </Stack>
      <Stack>
        {state.rounds.map((round, ri) => {
          return round.actions.map((action, ai) => {
            const entity =
              action.initiator == 'target' ? fight.target : fight.agent
            return (
              <DisplayAction
                key={`${ri}:${ai}`}
                action={action}
                name={entity.name}
              />
            )
          })
        })}
      </Stack>
      <Button onClick={async () => await fight.run()}>Run</Button>
    </Stack>
  )
}

function DisplayEntity({entity}: {entity: Entity}) {
  const state = useSnapshot(entity)
  return (
    <Stack>
      <Text type='listHeading'>{state.name}</Text>
      <DisplayStat label='Health' stat={state.health} />
      <DisplayStat label='Stamina' stat={state.stamina} />
      <DisplayStat label='Mana' stat={state.mana} />
    </Stack>
  )
}

function DisplayStat({stat, label}: {stat: Readonly<Stat>; label: string}) {
  return <Text>{`${label}: [${stat[0]}/${stat[1]}]`}</Text>
}

function DisplayAction({
  action,
  name,
}: {
  action: ActionSelection
  name: string
}) {
  const move = getMove(action.move)
  const style = action.initiator == 'target' ? 'primary' : 'neutral'
  return (
    <Container type={style}>
      <Stack orientation='h' alignment='baseline'>
        <Text type='mutedAdditional'>{name}</Text>
        <Text>{move.name}</Text>
      </Stack>
    </Container>
  )
}

const Container = styled('div', {
  color: '$white',
  padding: '$3',
  borderRadius: '$2',
  variants: {
    type: {
      primary: {
        backgroundColor: '$primary3',
      },
      neutral: {
        backgroundColor: '$gray3',
      },
    },
  },
})
