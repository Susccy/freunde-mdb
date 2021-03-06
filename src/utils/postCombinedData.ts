import axios from "axios"
import { MovieInput } from "../entities/movie.entity"
const combinedData: {
  [key: string]: {
    tmdb: { id: number; popularity: number }[]
    rating: string | { total: string; ch: string; rt: string }
    fsk?: string
    dateSeen?: string
    mm?: boolean
  }
} = require("../../combinedData.json")

export default function () {
  const asyncActions = []
  for (const movies of Object.entries(combinedData)) {
    const [movieName, movieData] = [movies[0], movies[1]]
    if (!movieData.tmdb.length) {
      console.log("No data for " + movieName)
      continue
    }
    let id: number
    if (movieName === "Frozen") id = 44363
    else
      id = movieData.tmdb.reduce((pre, cur) => {
        return pre.popularity > cur.popularity ? pre : cur
      }).id
    const dateSeenDMY = movieData.dateSeen?.split(".")
    const formatRating = (rating: string) =>
      +rating.trim().replace(",", ".") * 100
    const rating =
      typeof movies[1].rating === "string"
        ? { total: formatRating(movies[1].rating) }
        : {
            total: formatRating(movies[1].rating.total),
            ch: formatRating(movies[1].rating.ch),
            rt: formatRating(movies[1].rating.rt),
          }
    asyncActions.push(
      axios.post<MovieInput>("http://localhost:3000/api/movie", {
        tmdbID: id,
        rating,
        dateSeen:
          dateSeenDMY &&
          new Date(+dateSeenDMY[2], +dateSeenDMY[1] - 1, +dateSeenDMY[0]),
        fsk:
          movieData.fsk === undefined || movieData.fsk === "N.E."
            ? undefined
            : +movieData.fsk,
        mm: movieData.mm,
      } as MovieInput)
    )
  }

  Promise.allSettled(asyncActions).then((r) =>
    console.log(
      "done! rejected:",
      r.filter((v) => v.status === "rejected")
    )
  )
}
