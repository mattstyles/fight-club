import {useSnapshot} from 'valtio'
import {useCallback, useMemo} from 'react'
import useSWR from 'swr'

import {simulationConfig} from './simulation/state'
import {state as entityState, state} from './entity/state'
import {
  Container,
  Flex,
  Spacer,
  Stack,
  Text,
  Slider,
  Button,
  Select,
  Dialog,
} from '~/components'

export function SimulationRoute() {
  const renderState = useSnapshot(simulationConfig)
  const {data: entities, mutate} = useSWR(
    'all-entities',
    async () => {
      return await entityState.getAll()
    },
    {suspense: true}
  )
  const [isOpen, setIsOpen] = Dialog.useDialogState(false)

  const entitySelection = useMemo(() => {
    return entities.map((entity) => {
      return {
        title: entity.name,
      }
    })
  }, [entities])
  const onEntityChange = useCallback(
    (value: string) => {
      const entity = entities.find((ent) => ent.name === value)
      if (entity == null) {
        console.warn('Can not find entity')
      } else {
        simulationConfig.target = entity
      }
    },
    [renderState.target]
  )
  const agentSelection = useMemo(() => {
    return entities.map((entity) => {
      return {
        title: entity.name,
      }
    })
  }, [entities])
  const onAgentChange = useCallback(
    (value: string) => {
      const agent = entities.find((ent) => ent.name === value)
      if (agent == null) {
        console.warn('Can not find entity')
      } else {
        simulationConfig.agents = agent
      }
    },
    [renderState.agents]
  )
  const onPopulationSizeChange = useCallback(
    (value: number) => {
      simulationConfig.populationSize = value
    },
    [simulationConfig]
  )
  const onGenerationSizeChange = useCallback(
    (value: number) => {
      simulationConfig.generationSize = value
    },
    [simulationConfig]
  )

  const isReady = useMemo(() => {
    return !Boolean(renderState.target && renderState.agents)
  }, [renderState.target, renderState.agents])

  return (
    <Container>
      <Stack gap='large'>
        <Stack>
          <Text type='listHeading'>Simulation</Text>
          <EditSelect
            label='Target'
            placeholder={renderState.target ? '' : 'Select target entity'}
            value={renderState.target?.name}
            onChange={onEntityChange}
            items={entitySelection}
          />
          <EditSelect
            label='Agent'
            placeholder={renderState.agents ? '' : 'Select agent'}
            value={renderState.agents?.name}
            onChange={onAgentChange}
            items={agentSelection}
          />
        </Stack>
        <Stack css={{width: 380}}>
          <Text type='listHeading'>Population</Text>
          <EditSlider
            label='Population size'
            value={renderState.populationSize}
            min={50}
            max={500}
            step={5}
            onChange={onPopulationSizeChange}
          />
          <EditSlider
            label='Generation size'
            value={renderState.generationSize}
            min={10}
            max={100}
            step={2}
            onChange={onGenerationSizeChange}
          />
        </Stack>
        <Stack>
          <Spacer size='large' />
          <Stack orientation='h' justify='right'>
            <Button disabled={isReady} onClick={() => setIsOpen(!isOpen)}>
              Test
            </Button>
            <Button color='primary' disabled={isReady}>
              Simulate
            </Button>
            <Button onClick={() => setIsOpen(!isOpen)}>Dialog test</Button>
          </Stack>
        </Stack>
        <Dialog.Dialog open={isOpen} onOpenChange={setIsOpen}>
          <Text>Hello world</Text>
        </Dialog.Dialog>
      </Stack>
    </Container>
  )
}

type SliderProps = {
  label: string
  onChange: (value: number) => void
  value: number
  min: number
  max: number
  step: number
}
function EditSlider({label, onChange, value, min, max, step}: SliderProps) {
  return (
    <Flex orientation='h' size='full' justify='spread'>
      <Flex orientation='h' size='full'>
        <Text as='label' htmlFor='label'>
          {`${label}: ${value}`}
        </Text>
        <Spacer direction='h' />
      </Flex>
      <Slider
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={onChange}
      />
    </Flex>
  )
}

type SelectProps = {
  label: string
  onChange: (value: string) => void
  value: string | undefined
  items: Array<{title: string}>
  placeholder: string
}
function EditSelect({label, onChange, value, items, placeholder}: SelectProps) {
  return (
    <Flex orientation='h' alignment='center'>
      <Text as='label' htmlFor={label}>
        {label}
      </Text>
      <Spacer direction='h' />
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger id='target' placeholder={placeholder} />
        <Select.Content title='Entity' items={items} />
      </Select.Root>
    </Flex>
  )
}
