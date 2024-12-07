import { useState, useEffect } from "react";
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
import { useMovies } from './hooks/useMovies.js'



export default function App() {

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)
  const { movies, isLoading, error } = useMovies(query)
  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem('watched'))
    return storedValue
  });

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => id === selectedId ? null : id)
  }

  function handleCloseMovie () {
    setSelectedId(null)
  }

  const handleAddWatched = (movie) => {
    setWatched(watched => [...watched, movie])

    // localStorage.setItem('watched', JSON.stringify([...watched, movie]) )
  }

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])


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
          {selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched} /> :
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
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


