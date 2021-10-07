import {
  Movie,
  MovieVirtuals,
  RatingTotal,
  RatingIndividual,
} from "../server/api/models/movie.model"

export type MovieInput = Pick<Movie, "tmdbID" | "dateSeen" | "fsk" | "mm"> & {
  rating: RatingTotal | RatingIndividual
}

/**
 * @todo genres als array?
 * ^^^^^^^^^^^^^^^^^
 * fsk?: number | undefined;
 * mm?: boolean | undefined;
 * genres?: string[] | undefined;
 * releaseDate?: string | undefined;
 * runtime?: number | undefined;
 * budget?: number | undefined;
 * revenue?: number | undefined;
 * dateSeen?: string;
 * "rating.ch"?: number;
 * "rating.rt"?: number;
 * "title.original"?: string;
 * "title.german"?: string;
 */
export type MoviePartial = Omit<
  Movie,
  | "rating"
  | "dateSeen"
  | "tmdbID"
  | "title"
  | "posterURL"
  | "tagline"
  | "overview"
> & {
  dateSeen?: string
  "rating.ch"?: number
  "rating.rt"?: number
  "title.original"?: string
  "title.german"?: string
}

export type MovieResponse = Movie & MovieVirtuals

export type MovieResponseJSON = Omit<
  MovieResponse,
  "dateSeen" | "releaseDate"
> & { dateSeen?: string; releaseDate: string }
