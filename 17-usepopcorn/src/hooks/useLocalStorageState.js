import {useEffect, useState} from 'react'
export const useLocalStorageState = (initialState, key) => {

  const [value, setValue] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem(key))
    return storedValue
  });

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(value))
  }, [value, key])

  return [value, setValue]

} 