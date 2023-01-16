import { Genre, IGenre } from "./genre.model";

export interface IMovie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  genres: Array<IGenre>;
  id: number;
  runtime: number;
  revenue: number;
  budget: number;
  imdb_id: string;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

export class Movie {
  id: number;
  poster: string;
  isAdult: boolean;
  overview: string;
  releaseDate: string;
  genres?: Array<Genre>;
  originalTitle: string;
  originalLanguage: string;
  title: string;
  backdrop: string;
  popularity: number;
  voteCount: number;
  hasVideo: boolean;
  voteAverage: number;
  runtime: number;
  revenue: number;
  budget: number;
  imdbId: string;

  constructor(movie: IMovie, availableGenres?: Array<Genre>) {
    this.id = movie.id;
    this.poster = `https://image.tmdb.org/t/p/w220_and_h330_face${movie.poster_path}`;
    this.isAdult = movie.adult;
    this.overview = movie.overview;
    this.releaseDate = movie.release_date;

    this.genres = movie.genres
      ? movie.genres.map(a => new Genre(a))
      : movie.genre_ids.map(a => availableGenres?.find(b => b.id === a)!);
    // this.genres = movie.genre_ids; // TODO: fix this based on ones coming in
    this.originalTitle = movie.original_title;
    this.originalLanguage = movie.original_language;
    this.title = movie.title;
    this.backdrop = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`;
    this.popularity = movie.popularity;
    this.voteCount = movie.vote_count;
    this.hasVideo = movie.video;
    this.voteAverage = movie.vote_average;
    this.runtime = movie.runtime;
    this.revenue = movie.revenue;
    this.budget = movie.budget;
    this.imdbId = movie.imdb_id;
  }
}