import { createContext, useContext, useState } from "react"

const SoundContext = createContext()

const SoundProvider = ({children}) => {
  
  const [allowSound, setAllowSound] = useState(true)

  return <SoundContext.Provider value={{allowSound, setAllowSound}}>
    {children}
  </SoundContext.Provider>
} 

export {SoundContext, SoundProvider}