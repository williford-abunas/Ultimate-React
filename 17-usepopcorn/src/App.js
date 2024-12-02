import { useState, useEffect } from "react";
import { tempMovieData, tempWatchedData } from "./movieData.js";
import StarRating from './StarRating.js'

const apiKey = process.env.REACT_APP_API_KEY
const titleQuery = 'smile'

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

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
    if (query.length < 3){
      setMovies([])
      setError("")
      return
    }

    fetchMovies()
  }, [query])

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          { selectedId ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched}/> : 
          <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
          </>}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className='loader'>Loading...</p>
}

function ErrorMessage({ message }) {
  return <p className='error'><span>❗</span>{message}</p>
}
function Navbar({ children }) {

  return <nav className="nav-bar">
    <Logo />

    {children}
  </nav>
}

function Logo() {
  return <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
}

function Search({query, setQuery}) {

  return <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
}

function NumResults({ movies }) {
  return <p className="num-results">
    Found <strong>{movies.length}</strong> results
  </p>
}

function Main({ children }) {


  return <main className="main">
    {children}
  </main>
}


function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
    {isOpen &&
      children
    }
  </div>
}

function MovieList({ movies, onSelectMovie }) {

  return <ul className="list list-movies">
    {movies?.map((movie) => (
      <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>
    ))}
  </ul>
}

function Movie({ movie, onSelectMovie }) {
  return <li onClick={() => onSelectMovie(movie.imdbID)}>
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
}

function MovieDetails({selectedId, onCloseMovie, onAddWatched}) {
  const [movieDetail, setMovieDetail] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')
  const {Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre} = movieDetail

  const handleAddWatched = (movie) => {
    const newWatchedMovie = {
      imdbID: selectedId, title, year, poster, imdbRating: Number(imdbRating), runtime: Number(runtime.split(' ')[0]), userRating
    }
    onAddWatched(newWatchedMovie)
    onCloseMovie()
  }

useEffect(() => {
  const getMovieDetails = async () => {
  setIsLoading(true)
  const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`)
  const data = await res.json()
  setMovieDetail(data)
  setIsLoading(false)
}

  getMovieDetails()
  }, [selectedId])

  return <div className="details">
    {isLoading ? <Loader /> : <><header>
    <div className="btn-back" onClick={onCloseMovie}>&larr;</div>
    <img src={poster} aslt = {`Poster of ${movieDetail}`} />
    <div className="details-overview">
      <h2>{title}</h2>
      <p>{released} &bull; {runtime}</p>
      <p>{genre}</p>
      <p><span>⭐</span>{imdbRating} IMDb rating</p>
    </div>
    </header>
    <section>
      <div className="rating">
      <StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
      {userRating > 0 && <button className="btn-add" onClick={handleAddWatched}>+ Add to list</button>}
      </div>
      <p><em>{plot}</em></p>
      <p> Starring {actors}</p>
      <p> Directed by {director}</p>

    </section>
    </>}
    </div>
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating.toFixed(1)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating.toFixed(1)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>
}

function WatchedMoviesList({ watched }) {
  return <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie movie={movie} key={movie.imdbID} />
    ))}
  </ul>
}

function WatchedMovie({ movie }) {
  return <li >
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
    </div>
  </li>
}

