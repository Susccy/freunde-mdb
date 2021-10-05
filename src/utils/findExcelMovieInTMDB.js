const zlib = require("zlib")
const fs = require("fs")
const axios = require("axios")
console.log("requesting data...")
axios
  .get("http://files.tmdb.org/p/exports/movie_ids_09_28_2021.json.gz", {
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
      const freundeData = fs
        .readFileSync(
          "C:/Users/erik-.DESKTOP-GUCFS2N/code/github/freunde-mdb/FREUNDE_Filmliste_1.csv"
        )
        .toString()
        .split("\n")
        .slice(7, -1)
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
      for (const movie of freundeData) {
        movie.tmdb = dataArray.filter(
          (data) => data.original_title === movie.movieName
        )
      }
      fs.writeFileSync(
        "combinedData.json",
        JSON.stringify(
          freundeData.reduce(
            (obj, { movieName, ...rest }) => ({
              ...obj,
              [movieName]: rest,
            }),
            {}
          ),
          null,
          4
        )
      )
    })
  )
