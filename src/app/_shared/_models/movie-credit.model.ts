export interface IMovieCreditResponse {
  id: number;
  cast: Array<IMovieCredit>;
  crew: Array<IMovieCredit>;
}

export interface IMovieCredit {
  known_for_department: string;
  name: string;
  profile_path: number;
  department: string;
  job: string;
  credit_id: string;
  popularity: number;
}

export class MovieCredit {
  id: string;
  knownForDepartment: string;
  name: string;
  image: string;
  department: string;
  job: string;
  popularity: number;

  constructor(movieCredit: IMovieCredit) {
    this.knownForDepartment = movieCredit.known_for_department;
    this.name = movieCredit.name;    
    this.image = `https://image.tmdb.org/t/p/original${movieCredit.profile_path}`;
    this.department = movieCredit.department;
    this.job = movieCredit.job;    
    this.id = movieCredit.credit_id;
    this.popularity = movieCredit.popularity;
  }
}