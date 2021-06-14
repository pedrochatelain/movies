const model = require('./model.js')

async function showMyMovies(req, res) {
  const movies = await model.getMovies()
  res.render('my_movies.ejs', {movies: movies})
}

function isValidDate(date) {
  return date !== 'UNKNOWN';
}

function addMovie(req, res) {
  let date = req.body.releaseDate;
  if (! isValidDate(date)) {
    date = null;
  }
  const movie = {
    'name': req.body.name.trim(),
    'director': req.body.director.trim(),
    'date': date,
    'rating': null,
    'image': req.body.image
  }
  model.addMovie(movie)
  res.end()
}

function deleteMovie(req, res) {
  const id_movie = req.body.id
  model.deleteMovie(id_movie)
  res.end()
}

function setRating(req, res) {
  model.setRating(req.body.rating, req.body.id);
  res.end();
}

module.exports = {showMyMovies, addMovie, deleteMovie, setRating}