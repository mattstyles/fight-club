import {Suspense, useState, useCallback, useTransition} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {mutate} from 'swr'
import {RocketIcon} from '@radix-ui/react-icons'

import {
  Flex,
  Spacer,
  ErrorFallback,
  Container,
  InlineLoading,
  Toast,
  Stack,
  Text,
} from '~/components'

import {Aside} from './entity/aside'
import {Main} from './entity/main'
import {createNewEntity} from './entity/state'

export function EntityRoute() {
  const [selectedId, setSelectedId] = useState<string>('')

  // First param is `isPending`, IDB is always fast but we could disable the UI here somehow. Due to startTransition we will show old UI for a bit which will be interative, which _could_ be confusing if slow. This way avoids flashing of a loading spinner though.
  // Probably a good idea to show some sort of spinner (after a delay (which could be done in CSS)) but we would need more control over what happens in the ListItem for that
  const [isSelectionPending, startSelectionTransition] = useTransition()
  const onSelectEntity = useCallback(
    (id: string) => {
      startSelectionTransition(() => {
        setSelectedId(id)
      })
    },
    [setSelectedId]
  )

  const [isOpen, setIsOpen] = Toast.useSingleToastState(false)

  const onCreateEntity = useCallback(async () => {
    const entity = await createNewEntity()
    await mutate('all-entities')
    setIsOpen(true)
    onSelectEntity(entity.id)
  }, [setIsOpen, setSelectedId])

  return (
    <Container size='full' padding='none'>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<InlineLoading />}>
          <CreateEntityToast isOpen={isOpen} setIsOpen={setIsOpen} />
          <Flex orientation='h'>
            <Aside
              isSelectionPending={isSelectionPending}
              selectedId={selectedId}
              onSelectEntity={onSelectEntity}
              onCreateEntity={onCreateEntity}
            />
            <Spacer size='large' />
            <Main selectedId={selectedId} onCreateEntity={onCreateEntity} />
          </Flex>
        </Suspense>
      </ErrorBoundary>
    </Container>
  )
}

//Note that this will disappear when the tab is changed as this root will be destroyed, this is fine, but we could be better about this and have it persist by dropping a toast into a queue and render that queue somewhere more global, probably within shell. Possibly this should be a priority queue to allow us to manipulate toasts. Extracting and just calling a function allows us to be a bit smarter with managing the timeouts rather than force the consumer to do so. Each toast type could represent a toast, you then fire the function with that type and it renders, or we could force passing a component. There is a subtlety though, try clicking the button multiple times and notice the animation fires, this is good, because these are the same message - in our queue we might want the concept of a message group such that newer toasts will replace one in the same group.
function CreateEntityToast({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) {
  return (
    <Toast.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      type='background'
      duration={3000}>
      <Toast.Content>
        <Stack orientation='h' gap='large' alignment='center'>
          <RocketIcon />
          <Text size='small'>New entity created</Text>
        </Stack>
      </Toast.Content>
    </Toast.Root>
  )
}
