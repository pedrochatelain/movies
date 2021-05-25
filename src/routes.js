const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => res.render('home.ejs'))

router.get('/add_movies', (req, res) => res.render('add_movies.ejs'))

router.get('/my_movies', (req, res) => res.render('my_movies.ejs'))

module.exports = router