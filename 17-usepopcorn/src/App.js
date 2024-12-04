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

const apiKey = process.env.REACT_APP_API_KEY


export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [query, setQuery] = useState("smile");
  const [selectedId, setSelectedId] = useState(null)

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => id === selectedId ? null : id)
  }

  const handleCloseMovie = () => {
    setSelectedId(null)
  }

  const handleAddWatched = (movie) => {
    setWatched(watched => [...watched, movie])
  }

  useEffect(() => {

    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        setError("")
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`)
        if (!res.ok) throw new Error("Something went wrong!");
        const data = await res.json()
        if (data.Response === 'False') throw new Error('Movie not found!')
        setMovies(data.Search)
      } catch (err) {
        console.error(err.message)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (query.length < 3) {
      setMovies([])
      setError("")
      return
    }

    fetchMovies()
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
              <WatchedMoviesList watched={watched} />
            </>}
        </Box>
      </Main>
    </>
  );
}


function ErrorMessage({ message }) {
  return <p className='error'><span>❗</span>{message}</p>
}

function Main({ children }) {

  return <main className="main">
    {children}
  </main>
}


