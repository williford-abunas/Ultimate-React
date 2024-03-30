import { useState } from 'react'
import { tempMovieData, tempWatchedData } from './data.ts'
import { movieModel, watchedMovieModel } from './models.ts'
import React from 'react'

const average = (arr: number[]) =>
  arr.reduce(
    (acc: number, cur: number, i: number, arr: number[]) =>
      acc + cur / arr.length,
    0
  )

function NavBar({ movies }) {
  return (
    <>
      <nav className="nav-bar">
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </nav>
    </>
  )
}

function Search() {
  const [query, setQuery] = useState('')

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

function ListBox({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true)

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && <MovieList movies={movies} />}
    </div>
  )
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie: movieModel) => (
        <MovieItem movie={movie} />
      ))}
      <li>X</li>
    </ul>
  )
}

function MovieItem({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function WatchedMovies() {
  const [isOpen2, setIsOpen2] = useState(true)
  const [watched, setWatched] = useState(tempWatchedData)

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedSummaryList watched={watched} />
        </>
      )}
    </div>
  )
}

function WatchedSummaryList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie: watchedMovieModel) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  )
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
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
  )
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie: { imdbRating: number }) => movie.imdbRating)
  )
  const avgUserRating = average(
    watched.map((movie: { userRating: number }) => movie.userRating)
  )
  const avgRuntime = average(
    watched.map((movie: { runtime: number }) => movie.runtime)
  )
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length}</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime}</span>
        </p>
      </div>
    </div>
  )
}

function Main({ movies }) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedMovies />
    </main>
  )
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData)

  return (
    <>
      <NavBar movies={movies} />
      <Main movies={movies} />
    </>
  )
}
