import { useEffect, useRef } from "react"

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setTimeout(() => handler(), 0)
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => document.removeEventListener('click', handleClick, true)
  }, [handler, listenCapturing])

  return ref
}