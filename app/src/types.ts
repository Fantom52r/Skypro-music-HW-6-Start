export type TrackType = {
  album: string;
  author: string;
  duration_in_seconds: number;
  genre: string[];
  logo?: unknown;
  name: string;
  release_date: string;
  staredUser: number[];
  track_file: string;
  _id: number;
};

export type Compilation = {
  _id: number;
  name: string;
  items: number[];
  owner: number[];
  __v: number;
};
