import {useState, useRef, useEffect} from 'react'
import {proxy} from 'valtio'
import {proxyMap} from 'valtio/utils'

// Single toast state, for use in-situ.
// Requires a little more manual effort but colocates the toast with the trigger and allows flexibility to add whatever contents you want
// Handles the slight delay which allows animations to work
export function useSingleToastState(
  value: boolean
): [boolean, (value: boolean) => void] {
  const timeoutRef = useRef(0)

  useEffect(() => {
    return window.clearTimeout(timeoutRef.current)
  }, [])
  const [isOpen, setIsOpen] = useState<boolean>(value)

  return [
    isOpen,
    (value: boolean) => {
      window.clearTimeout(timeoutRef.current)
      setIsOpen(false)

      if (value === false) {
        return
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsOpen(true)
      }, 100)
    },
  ]
}
