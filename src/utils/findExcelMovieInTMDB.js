const zlib = require("zlib")
const fs = require("fs")
const axios = require("axios")
const fixUnknownMovieNames = require("./fixUnknownMovieNamesInCSV.js")
console.log("requesting data...")
axios
  .get("http://files.tmdb.org/p/exports/movie_ids_10_08_2021.json.gz", {
    responseType: "arraybuffer",
  })
  .then((res) =>
    zlib.gunzip(res.data, (err, value) => {
      if (err) return console.error(err)
      console.log("received data, processing...")
      const dataArray = value
        .toString()
        .split("\n")
        .filter((v) => !!v)
        .map((data) => {
          let result
          try {
            result = JSON.parse(data)
          } catch (e) {
            console.error({ data }, e)
            throw new Error("json parse failed")
          }
          return result
        })
      fixUnknownMovieNames()
      const freundeData1 = fs
        .readFileSync("FREUNDE_Filmliste_1_EDITED.csv")
        .toString()
        .split("\n")
        .map((movie) => {
          const dataArray = movie.split(";")
          return {
            movieName: dataArray[1],
            rating: dataArray[7],
            fsk: dataArray[4] === "?" ? undefined : dataArray[4],
            dateSeen: dataArray[6] === "?" ? undefined : dataArray[6],
            mm: /\(mm\)/i.test(dataArray[0]),
          }
        })
      for (const movie of freundeData1) {
        movie.tmdb = dataArray.filter(
          (data) => data.original_title === movie.movieName
        )
      }
      const freundeData2 = fs
        .readFileSync("FREUNDE_Filmliste_2_EDITED.csv")
        .toString()
        .split("\n")
        .map((movie) => {
          const dataArray = movie.split(";")
          if (!dataArray[0] || dataArray[0] === "???") return null
          return {
            movieName: dataArray[0],
            rating: { total: dataArray[8], ch: dataArray[6], rt: dataArray[7] },
            fsk: dataArray[3] === "?" ? undefined : dataArray[3],
            dateSeen: dataArray[5] === "?" ? undefined : dataArray[5],
          }
        })
      for (const movie of freundeData2) {
        if (movie)
          movie.tmdb = dataArray.filter(
            (data) => data.original_title === movie.movieName
          )
      }
      fs.writeFileSync(
        "combinedData.json",
        JSON.stringify(
          {
            ...freundeData1.reduce(
              (obj, { movieName, ...rest }) => ({
                ...obj,
                [movieName]: rest,
              }),
              {}
            ),
            ...freundeData2.reduce((obj, movie) => {
              if (!movie) return obj
              const { movieName, ...rest } = movie
              return {
                ...obj,
                [movieName]: rest,
              }
            }, {}),
          },
          null,
          4
        )
      )
    })
  )
