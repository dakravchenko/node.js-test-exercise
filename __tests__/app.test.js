import app from '../app.js'

import supertest from 'supertest'

const request = supertest(app)

describe('get all movies', () => {
  it('should respond with 200 when there are movies added in the list', async () => {
    const res = await request.get('/movie')

    expect(res.statusCode).toBe(200)
  })
})

describe('add a movie', () => {
  it('should respond with 200 when we add all required fields (title, director, release_date)', async () => {
    const res = await request.post('/movie').send({
      title: 'dfgsdfgd',
      director: 'new director',
      release_date: '2020-20-20',
    })
    expect(res.statusCode).toBe(200)
  })
  it("should respond with 400 if we don't add a title", async () => {
    const res = await request.post('/movie').send({
      director: 'new director',
      release_date: '2020-20-20',
    })
    expect(res.statusCode).toBe(400)
  })
  it("should respond with 400 if we don't add a director", async () => {
    const res = await request.post('/movie').send({
      title: 'new director',
      release_date: '2020-20-20',
    })
    expect(res.statusCode).toBe(400)
  })
  it("should respond with 400 if we don't add a release_date", async () => {
    const res = await request.post('/movie').send({
      director: 'new director',
      title: '2020-20-20',
    })
    expect(res.statusCode).toBe(400)
  })
})

describe('get a movie by id', () => {
  it('should respond with 200 when there is a movie with this id', async () => {
    const id = '1'

    const res = await request.get(`/movie/${id}`)

    expect(res.statusCode).toBe(200)
  })
  it('should respond with 404 if there is no movie with this id', async () => {
    const id = '3'

    const res = await request.get(`/movie/${id}`)

    expect(res.statusCode).toBe(404)
  })
})

describe('delete a movie', () => {
  it('should respond with 200 when movie is deleted', async () => {
    const id = '1'

    const res = await request.delete(`/movie/${id}`)

    expect(res.statusCode).toBe(200)
  })
  it('should respond with 404 if there is no movie with this id', async () => {
    const id = '3'

    const res = await request.delete(`/movie/${id}`)

    expect(res.statusCode).toBe(404)
  })
})
