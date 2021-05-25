const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/movies/:name', controller.getMovie)

module.exports = router