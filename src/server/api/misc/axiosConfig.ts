import axios from "axios"

// axios.defaults.withCredentials = true

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { Authorization: `Bearer ${process.env.PRIVATE__TMDB_API_TOKEN}` },
})

export const images = axios.create({
  baseURL: "https://image.tmdb.org/t/p",
})
