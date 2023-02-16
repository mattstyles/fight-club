import * as React from 'react'
import {useEffect, useRef, useCallback, useState} from 'react'
import {Button as StyledButton} from './button'

type ButtonProps = React.ComponentProps<typeof StyledButton>

type Props = {
  timeout?: number
} & ButtonProps
export function Button({timeout = 500, onClick, ...buttonProps}: Props) {
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const timeoutRef = useRef(0)
  useEffect(() => {
    console.log('runing useeffect')
    return () => {
      // This doesn't make any sense to set the state here
      // setIsDisabled(false)
      window.clearTimeout(timeoutRef.current)
    }
  }, [])
  const onDebouncedClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick != null) {
        onClick(event)
      }
      setIsDisabled(true)
      timeoutRef.current = window.setTimeout(() => {
        setIsDisabled(false)
      }, timeout)
    },
    [onClick]
  )
  return (
    <StyledButton
      disabled={isDisabled}
      {...buttonProps}
      onClick={onDebouncedClick}
    />
  )
}
