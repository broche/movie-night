export interface IWatchProviderResponse {
  id: number;
  results: { 
    US: {
      buy: Array<IWatchProvider>,
      flatrate: Array<IWatchProvider>,
      rent: Array<IWatchProvider>
    }
  }
}
// export interface IWatchProvider {
//   link: string;
//   buy: Array<
// }
export interface IWatchProvider {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export class WatchProvider {
  id: number;
  name: string;
  logo: string;
  priority: number;

  constructor(watchProvider: IWatchProvider) {
    this.id = watchProvider.provider_id;
    this.name = watchProvider.provider_name;    
    this.logo = `https://image.tmdb.org/t/p/original${watchProvider.logo_path}`;
    this.priority = watchProvider.display_priority;
  }
}