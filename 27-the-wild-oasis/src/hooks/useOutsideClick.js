import { useEffect, useRef } from "react"

export function useOutsideClick(handler, listenCapturing = true, exceptionElement = null) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target) &&
        (!exceptionElement || !exceptionElement.contains(e.target))) {
        handler()
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => document.removeEventListener('click', handleClick, true)
  }, [handler, listenCapturing, exceptionElement])

  return ref
}