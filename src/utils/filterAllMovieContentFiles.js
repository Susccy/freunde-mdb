const fs = require("fs/promises")
const path = require("path")
const urlSlug = require("url-slug")

const MOVIE_CONTENT_PATH = path.join(__dirname, `/../client/content/movies`)

fs.readdir(MOVIE_CONTENT_PATH).then(async (allMovieFiles) => {
  const writingFiles = []
  const generatedSlugs = []
  for (const fileName of allMovieFiles) {
    const movieFileJSON = JSON.parse(
      await fs.readFile(`${MOVIE_CONTENT_PATH}/${fileName}`)
    )
    let i = 0
    let newSlug
    do {
      newSlug = encodeURIComponent(
        urlSlug(movieFileJSON.title.original) + (i ? `-${i + 1}` : "")
      )
      i++
    } while (newSlug !== "" && generatedSlugs.includes(newSlug))
    generatedSlugs.push(newSlug)
    movieFileJSON.slug = newSlug
    writingFiles.push(() =>
      fs.writeFile(
        `${MOVIE_CONTENT_PATH}/${fileName}`,
        JSON.stringify(movieFileJSON, null, 2)
      )
    )
  }
  Promise.all(writingFiles.map((fsStub) => fsStub()))
    .then(() => console.log("all done"))
    .catch(console.error)
})
