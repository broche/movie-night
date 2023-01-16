export interface SortByOption {
    label: string;
    value: string;
}

export const SORT_BY_OPTIONS: Array<SortByOption> = [
    { label: 'Most Popular', value: 'popularity.desc' },
    { label: 'Least Popular', value: 'popularity.asc' },
    { label: 'Highest Rated', value: 'vote_average.desc' },
    { label: 'Lowest Rated', value: 'vote_average.asc' },
    { label: 'Newest', value: 'primary_release_date.desc' },
    { label: 'Oldest', value: 'primary_release_date.asc' },
    { label: 'A to Z', value: 'original_title.asc' },
    { label: 'Z to A', value: 'original_title.desc' },
    { label: 'Cash Cow', value: 'revenue.desc' },
    { label: 'Bomb', value: 'revenue.asc' },
    { label: 'Most Votes', value: 'vote_count.desc' },
    { label: 'Least Votes', value: 'vote_count.asc' },
];
