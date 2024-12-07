import {useState, useEffect} from 'react'
import {useKey} from '../hooks/useKey.js'
import StarRating from './StarRating.jsx'
import Loader from './Loader.jsx'
import ErrorMessage from './ErrorMessage.jsx'

const apiKey = process.env.REACT_APP_API_KEY

export default function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movieDetail, setMovieDetail] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')
  const [error, setError] = useState(null)
  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movieDetail

  const handleAddWatched = (movie) => {
    const newWatchedMovie = {
      imdbID: selectedId, title, year, poster, imdbRating: Number(imdbRating), runtime: Number(runtime.split(' ')[0]), userRating
    }
    onAddWatched(newWatchedMovie)
    onCloseMovie()
  }

  useKey('Escape', onCloseMovie)


  useEffect(() => {
    const controller = new AbortController()
    const getMovieDetails = async () => {
    try {
        setIsLoading(true)
        const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`, {signal: controller.signal})
        if (!res.ok) {throw new Error(`Server error: ${res.status}`)}
        const data = await res.json()
        if (data.Response === 'False') {throw new Error('Movie not found')}
        setMovieDetail(data)
      }
      catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err.message)
          setError(err.message)
        }
      } finally {
        setIsLoading(false)
      }
    } 
      
    getMovieDetails()
    return () => {controller.abort()}
  }, [selectedId])

  useEffect(() => {
    if (!title) return
    document.title = `Movie | ${title}`;

    return () => document.title = "usePopcorn"
  }, [title])

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating

  return <div className="details">
    {isLoading && <Loader />}
    {!isLoading && error && <ErrorMessage nessage={error} />}
    {!isLoading && !error && <><header>
      <div className="btn-back" onClick={onCloseMovie}>&larr;</div>
      <img src={poster} alt={`Poster of ${movieDetail}`} />
      <div className="details-overview">
        <h2>{title}</h2>
        <p>{released} &bull; {runtime}</p>
        <p>{genre}</p>
        <p><span>⭐</span>{imdbRating} IMDb rating</p>
      </div>
    </header>
      <section>
        <div className="rating">
          {!isWatched ? <>
            <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
            {userRating > 0 && <button className="btn-add" onClick={handleAddWatched}>+ Add to list</button>}
          </>
          : <p>You have rated this movie {watchedUserRating} <span>⭐</span></p>}
            
        </div>
        <p><em>{plot}</em></p>
        <p> Starring {actors}</p>
        <p> Directed by {director}</p>
      </section>
    </>}
  </div>
}