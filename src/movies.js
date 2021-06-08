const fetch = require('node-fetch');

async function getDirectors(movies) {
  const directors = []
  for (let i = 0; i < movies.length; i++) {
    let directorAdded = false
    const movie = movies[i]
    const id_movie = movie.id
    const response_cast = await fetch(`https://api.themoviedb.org/3/movie/${id_movie}/credits?api_key=${process.env.API_KEY}&language=en-US`)
    const cast = await response_cast.json()
    let j = 0
    while (!directorAdded && j < cast.crew.length) {
      let member = cast.crew[j]
      if (member.job === 'Director') {
        directors.push(member.name)
        directorAdded = true
      }
      j++
    }
    if (!directorAdded) {
      directors.push('UNKNOWN')
    }
  }
  return directors
}

function stringToQuery(string) {
  return string.replace(/ /g, '+')
}

async function getMovies(req, res) {
  const nameMovie = req.params.name
  const query = stringToQuery(nameMovie)
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`
  const movies_response = await fetch(url)
  const movies_object = await movies_response.json()
  const movies = movies_object.results
  formatDate(movies)
  orderByPopularity(movies)
  res.send(movies)
}

function formatDate(movies) {
  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i];
    let date = movie.release_date;
    if (date) {
      const dateParts = date.split("-");
      movie.release_date = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
    }
  }
}

function orderByPopularity(movies) {
  movies.sort(function (a, b) {
    let popularity_a = a.popularity
    let popularity_b = b.popularity
    if (popularity_a < popularity_b) {
      return 1;
    }
    if (popularity_a > popularity_b) {
      return -1;
    }
    // popularity must be equal
    return 0;
  })
}

module.exports = {getDirectors, getMovies}