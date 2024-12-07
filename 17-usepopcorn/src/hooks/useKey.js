import {useEffect} from 'react'

export const useKey = (key, callback) => {
  useEffect(() => {
    const escapeKeyFunc = (e) => {
      if(e.code.toLowerCase() === key.toLowerCase()) {
        callback()
      }
    }

    document.addEventListener('keydown', escapeKeyFunc)

    return () => document.removeEventListener('keydown', escapeKeyFunc)
  }, [callback, key])
}