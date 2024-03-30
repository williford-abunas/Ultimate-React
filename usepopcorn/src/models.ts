export interface movieModel  {
    imdbID: string,
    Title: string,
    Year: string,
    Poster: string,
  }


export interface watchedMovieModel {
    imdbID: string,
    Title: string,
    Year: string,
    Poster:
    string,
    runtime: number,
    imdbRating: number,
    userRating: number
  }