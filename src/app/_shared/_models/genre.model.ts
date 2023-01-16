export interface IGenre {
  id: number;
  name: string;
}

export class Genre {
  id: number;
  name: string;

  constructor(genre: IGenre) {
    this.id = genre.id;
    this.name = genre.name;
  }
}