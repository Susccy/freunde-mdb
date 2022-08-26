/* eslint-disable camelcase */
const fs = require("fs/promises")
const path = require("path")
const axios = require("axios")

const tmdbAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDAxYWI5ODRjY2FmYzEzZTMxNzliMDM5NWQ1MTRjYyIsInN1YiI6IjYxMWQwZTU2NmMxOWVhMDAyZDhlMWQ3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.du_io36q27OPuQT6WCQYRMUYXO3FJYZr0LGJqijk2D4`,
  },
  params: { language: "de-DE" },
})

function parseMovieDetailsResponse (response, lean) {
  const { original_title, title, release_date, runtime, genres, poster_path } =
    response

  const parsedResponseLean = {
    title: { original: original_title, ...(title && { german: title }) },
    releaseDate: new Date(release_date),
    genres: genres.map((genre) => genre.name),
    ...(runtime && { runtime }),
    ...(poster_path && { posterURL: poster_path }),
  }

  if (lean) return parsedResponseLean

  const { budget, revenue, tagline, overview } = response

  const parsedResponse = {
    ...parsedResponseLean,
    budget,
    revenue,
    ...(tagline && { tagline }),
    ...(overview && { overview }),
  }

  return parsedResponse
}

const insert = async (doc) => {
  const { tmdbID } = doc

  const tmdbResponse = await tmdbAPI
    .get(`/movie/${tmdbID}`)
    .then(({ data }) => parseMovieDetailsResponse(data, false))
    .catch((e) => {
      console.error(e.response)
      throw e
    })

  const completeDoc = {
    ...doc,
    ...tmdbResponse,
  }

  await fs.writeFile(
    path.join(
      __dirname,
      `/../client/content/movies/${completeDoc.tmdbID}.json`
    ),
    JSON.stringify(completeDoc, null, 2)
  )
}

// insert(

// )

fs.readFile(path.join(__dirname, `/FREUNDE_Filmliste_3.CSV`), "utf-8").then(
  (r) => {
    const lines = r.split(/\r?\n/)
    lines.forEach((line, index) => {
      if (index !== 0) return
      const datas = line.split(";")
      const parsedLine = {
        tmdbID: +datas[1],
        rating: {
          total: parseFloat(datas[datas.length - 1].replace(",", ".")) * 100,
          rt: parseFloat(datas[datas.length - 2].replace(",", ".")) * 100,
          ch: parseFloat(datas[datas.length - 3].replace(",", ".")) * 100,
        },
        dateSeen: datas[2],
        fsk: +datas[3],
      }
      console.log(parseFloat(datas[datas.length - 1]))
      insert(parsedLine)
    })
  }
)
