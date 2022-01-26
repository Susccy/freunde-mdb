const fs = require("fs")
const axios = require("axios")

axios
  .get("http://localhost:3000/api/movie")
  .then((r) => r.data.map(({ id }) => id))
  .then((r) =>
    fs.writeFileSync("allMovieIDs.js", `export default ${JSON.stringify(r)}`)
  )
