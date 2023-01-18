import { Genre } from "../../_shared/_models/genre.model";

export interface IFindMovieFilters {
    genres: Array<number>,
    excludedGenres: Array<number>,
    watchProviders: Array<number>,
    yearMin: number,
    yearMax: number,
    ratingMin: number,
    ratingMax: number,
    runtimeMin: number,
    runtimeMax: number,
    minimumVoteCount: number,
    includeAdult: boolean,
    sortBy: string
}

export interface TMDBDiscoverRequest {
    page: number | undefined;
    sort_by: string;
    'primary_release_date.gte': string;
    'primary_release_date.lte': string;
    with_release_type?: string; // TODO: be able to filter by release type (theaters, streaming, ect)
    'vote_average.gte': number;
    'vote_average.lte': number;
    with_genres: string;
    without_genres: string;
    'with_runtime.gte': number;
    'with_runtime.lte': number;
    'vote_count.gte': number;
    with_watch_providers: string;
    watch_region: string;
}