const express = require('express')
const router = express.Router()
const controller = require('./controller.js')

router.get('/', (req, res) => res.render('home.ejs'))

router.get('/add_movies', (req, res) => res.render('add_movies.ejs'))

router.get('/my_movies', controller.showMyMovies)

router.post('/my_movies', controller.addMovie)

router.delete('/my_movies', controller.deleteMovie)

router.patch('/my_movies', controller.setRating)

router.get('/key_api', (req, res) => res.send(process.env.API_KEY));

module.exports = router