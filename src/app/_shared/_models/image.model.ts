export interface IImage {
  file_path: string;
}

export class Image {
  path: string;

  constructor(image: IImage) {
    this.path = `https://image.tmdb.org/t/p/original${image.file_path}`;
  }
}