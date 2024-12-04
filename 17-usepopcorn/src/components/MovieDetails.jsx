import {useState, useEffect} from 'react'
import StarRating from './StarRating.jsx'
import Loader from './Loader.jsx'

const apiKey = process.env.REACT_APP_API_KEY

export default function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movieDetail, setMovieDetail] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')
  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movieDetail

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

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating

  return <div className="details">
    {isLoading ? <Loader /> : <><header>
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