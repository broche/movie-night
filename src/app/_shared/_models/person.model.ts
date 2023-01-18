export interface IPerson {
  birthday?: string;
  known_for_department: string;
  deathday?: string;
  id: number;
  name: string;
  also_known_as: string;
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  imdb_id: string;
}

export class Person {
  id: number;
  name: string;
  aka: string;
  gender: string;
  biography: string;
  popularity: number;
  birthplace: string;
  image: string;
  birthday?: string;
  deathday?: string;
  knownFor: string;
  imdbId: string;

  constructor(person: IPerson) {
    this.id = person.id;
    this.image = `https://image.tmdb.org/t/p/w220_and_h330_face${person.profile_path}`;
    this.name = person.name;
    this.aka = person.also_known_as;
    this.gender = person.gender.toString();
    this.biography = person.biography;
    this.birthplace = person.place_of_birth;
    this.birthday = person.birthday;
    this.deathday = person.deathday;
    this.knownFor = person.known_for_department;
    this.popularity = person.popularity;
    this.imdbId = person.imdb_id;
  }
}