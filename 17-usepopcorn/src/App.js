import { useState, useEffect } from "react";
import StarRating from './components/StarRating.jsx'
import Navbar from './components/Navbar.jsx'
import Search from './components/Search.jsx'
import NumResults from './components/NumResults.jsx'
import Box from './components/Box.jsx'
import MovieDetails from './components/MovieDetails.jsx'
import Loader from './components/Loader.jsx'
import WatchedSummary from './components/WatchedSummary.jsx'
import MovieList from './components/MovieList.jsx'
import WatchedMoviesList from './components/WatchedMoviesList.jsx' 
import ErrorMessage from "./components/ErrorMessage.jsx"

const apiKey = process.env.REACT_APP_API_KEY


export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)
  
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem('watched'))
    return storedValue
  });

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => id === selectedId ? null : id)
  }

  const handleCloseMovie = () => {
    setSelectedId(null)
  }

  const handleAddWatched = (movie) => {
    setWatched(watched => [...watched, movie])

    // localStorage.setItem('watched', JSON.stringify([...watched, movie]) )
  }

  const handleDeleteWatched  = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched) )
  }, [watched])

  useEffect(() => {
    const controller = new AbortController()
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        setError("")
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`, {signal: controller.signal})
        if (!res.ok) throw new Error("Something went wrong!");
        const data = await res.json()
        if (data.Response === 'False') throw new Error('Movie not found!')
        setMovies(data.Search)
        setError("")
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message)
          console.error(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setMovies([])
      setError("")
      return
    }

    handleCloseMovie()
    fetchMovies()

    return () => {controller.abort()}
  }, [query])

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched}/> :
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched}/>
            </>}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">
    {children}
  </main>
}


