const express = require('express')
const router = express.Router()

router.get('/', (req, res) => res.sendFile(__dirname + '/views/home.html'))

router.get('/add_movies', (req, res) => res.sendFile(__dirname + '/views/add_movies.html'))

router.get('/my_movies', (req, res) => res.sendFile(__dirname + '/views/my_movies.html'))

module.exports = router