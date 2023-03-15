import express from 'express'
import {
  getAllMovies,
  addMovie,
  getMovieById,
  deleteMovie,
} from './controllers.js'
import { MOVIE, MOVIE_ID } from './routes.js'

const app = express()

app.use(express.json())

app.get(MOVIE, (req, res) => {
  getAllMovies(req, res)
})

app.post(MOVIE, (req, res) => {
  addMovie(req, res)
})

app.get(MOVIE_ID, (req, res) => {
  getMovieById(req, res)
})

app.delete(MOVIE_ID, (req, res) => {
  deleteMovie(req, res)
})

export default app
