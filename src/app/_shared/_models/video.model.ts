export interface IVideo {
  file_path: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export class Video {
  file_path: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;

  constructor(video: IVideo) {
    this.file_path = video.file_path;
    this.iso_639_1 = video.iso_639_1;
    this.iso_3166_1 = video.iso_3166_1;
    this.name = video.name;
    this.key = video.key;
    this.site = video.site;
    this.size = video.size;
    this.type = video.type;
    this.official = video.official;
    this.published_at = video.published_at;
    this.id = video.id;
  }
}