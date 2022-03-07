const fs = require("fs/promises")
const path = require("path")
const axios = require("axios")

axios
  .get("https://freunde-mdb-api.herokuapp.com/movie")
  .then(async ({ data }) => {
    const asyncArray = []
    data.forEach(({ _id, __v, id: __id, ...movieData }) => {
      const { _id: ___id, ...rating } = movieData.rating
      movieData.rating = rating
      asyncArray.push(
        fs.writeFile(
          path.join(
            __dirname,
            `/../client/content/movies/${movieData.tmdbID}.json`
          ),
          JSON.stringify(movieData, null, 2)
        )
      )
    })
    await Promise.all(asyncArray)
      .then(() => console.log("all done"))
      .catch(console.error)
  })
