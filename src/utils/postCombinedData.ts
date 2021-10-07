import axios from "axios"
import { MovieInput } from "../entities/movie.entity"
const combinedData: {
  [key: string]: {
    tmdb: { id: number; popularity: number }[]
    rating: string
    fsk?: string
    dateSeen?: string
    mm: boolean
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
    const { id } = movieData.tmdb.reduce((pre, cur) => {
      // @todo refactor `if` above reduce so we don't loop through the array if we already know the id
      if (movieName === "Frozen") return pre.id === 44363 ? pre : cur
      return pre.popularity > cur.popularity ? pre : cur
    })
    const dateSeenDMY = movieData.dateSeen?.split(".")
    asyncActions.push(
      axios.post<MovieInput>("http://localhost:3000/api/movie", {
        tmdbID: id,
        rating: { total: +movies[1].rating.trim().replace(",", ".") * 100 },
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
