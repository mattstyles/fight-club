import {useState, useRef, useEffect} from 'react'

// Handles the slight delay which allows animations to work
export function useDialogState(
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
