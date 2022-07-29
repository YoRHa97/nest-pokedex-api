export interface PokeResponse {
  count: number;
  next: string;
  previous: null;
  results: PokePreview[];
}

export interface PokePreview {
  name: string;
  url: string;
}
