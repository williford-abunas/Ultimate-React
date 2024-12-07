import { useEffect, useRef } from 'react'
import {useKey} from '../hooks/useKey.js'

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null)
  const searchCallback = () => {
    if (document.activeElement === inputEl.current) return
      inputEl.current.focus()
      setQuery("")
  }
  useKey('Enter', searchCallback)


  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}
