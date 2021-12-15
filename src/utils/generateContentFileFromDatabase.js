const fs = require("fs")
const path = require("path")
const axios = require("axios")

axios
  .get("http://localhost:3030/movie")
  .then((r) => r.data)
  .then((r) =>
    fs.writeFileSync(
      path.join(__dirname, "/../client/content/movies.json"),
      JSON.stringify(r)
    )
  )
