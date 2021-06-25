const model = require('./model.js');

async function showMyMovies(req, res) {
  const movies = await model.getMovies();
  res.render('my_movies.ejs', { movies: movies });
}

function isValidDate(date) {
  return date !== 'UNKNOWN';
}

async function addMovie(req, res) {
  try {
    let date = formatDate(req.body.releaseDate);
    const movie = {
      id: req.body.id,
      name: req.body.name.trim(),
      director: req.body.director.trim(),
      date: date,
      rating: null,
      image: req.body.image,
    };
    const response = await model.addMovie(movie);
    res.send(response)
  } catch (e) {
    console.log(e)
  }
}

function formatDate(date) {
  if (!isValidDate(date)) {
    return null
  }
  const dateAsInteger = date.split('-').join('');
  const day = dateAsInteger.substring(0, 2);
  const month = dateAsInteger.substring(2, 4);
  const year = dateAsInteger.substring(4, 8);
  return `${year}-${month}-${day}`
}

function deleteMovie(req, res) {
  const id_movie = req.body.id;
  model.deleteMovie(id_movie);
  res.end();
}

function setRating(req, res) {
  model.setRating(req.body.rating, req.body.id);
  res.end();
}

module.exports = { showMyMovies, addMovie, deleteMovie, setRating };
