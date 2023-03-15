import { v1 as uuidv1 } from 'uuid'
import { movies } from './movies.js'

export function getAllMovies(req, res) {
  if (movies.length === 0) {
    res.status(200)
    res.send('Movie list is empty')
  } else {
    res.status(200)
    res.json(movies)
  }
}

export function addMovie(req, res) {
  if (
    typeof req.body == 'undefined' ||
    typeof req.body.title == 'undefined' ||
    typeof req.body.director == 'undefined' ||
    typeof req.body.release_date == 'undefined'
  ) {
    res.status(400)
    res.send({
      message:
        'invalid request: make sure title, director and release_date was added',
    })
    return
  }

  const id = uuidv1()
  let movie = {
    id: id,
    title: req.body.title,
    director: req.body.director,
    release_date: req.body.release_date,
  }

  movies.push(movie)
  res.status(200)
  res.send(`Movie with id ${id} is added to the list`)
}

export function getMovieById(req, res) {
  const id = req.params.id

  for (let movie of movies) {
    if (movie.id === id) {
      res.status(200)
      res.json(movie)
      return
    }
  }
  res.status(404).send({ message: 'Movie not found' })
}
export function deleteMovie(req, res) {
  const movieToDelete = movies.find((movie) => movie.id === req.params.id)
  if (typeof movieToDelete == 'undefined') {
    res.status(404)
    res.send('No such a movie')
    return
  }
  movies.splice(movies.indexOf(movieToDelete), 1)
  res.status(200)
  res.send('Movie is deleted')
}
