There are two ways to use a toast.

## Single instance

_Pros_

- Colocates the toast with the trigger
- Specifying the toast manually lets you set it up how you like, this is flexible without having to shift around the codebase to find where you are supposed to update each type of toast you want to emit

_Cons_

- The toast lives with the component it is rendered from, if that is destroyed then the toast will be too which isn't super
- More manual work to setup a toast
- As each toast is unique (with very limited constraints on that) this could lead to divergence of styles over time

This method is a little more manual but the implementation is simpler and allows more flexibility.

Use `Toast.useSingleToastState` to create a hook which defines whether the toast is showing (open) or not.

Then use the `Toast.Root` component anywhere in your render tree, add any trigger, and call `setIsOpen`.

```
 const [isOpen, setIsOpen] = Toast.useSingleToastState(false)

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
```

## Centralised instance

_Pros_

- Very clean API for creating and displaying a toast
- Can manage toast groups

_Cons_

- Requires jumping around the codebase to specify your toast

_Caveats_ We might be able to solve the con here by allowing the consumer to specify what they want their toast to look like, giving the flexibility of the first approach with a cleaner API and more global nature to toasts (if they disappear as the component does this will become painful)
