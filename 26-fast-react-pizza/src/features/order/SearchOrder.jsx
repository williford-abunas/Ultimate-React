import {useNavigate} from "react-router-dom"
import {useState} from "react"

function SearchOrder() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if(!query) return
    navigate(`order/${query}`)
    setQuery("")
  }

  return (
    <form onSubmit={handleSubmit}>
    <input placeholder="Search order #" value={query} onChange = {(e) => setQuery(e.target.value)}/>
    </form>
  )
}

export default SearchOrder