const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(require('./routes.js'))