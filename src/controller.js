const model = require('./model.js')

async function showMyMovies(req, res) {
  const movies = await model.getMovies()
  console.log(movies)
  res.render('my_movies.ejs', {movies: movies})
}

function addMovie(req, res) {
  const movie = {
    'name': req.body.name.trim(),
    'director': req.body.director.trim(),
    'date': req.body.date,
    'rating': req.body.rating,
    'image': req.body.image
  }
  model.addMovie(movie)
  res.end()
}

module.exports = {showMyMovies, addMovie}