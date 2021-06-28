const fetch = require('node-fetch');

async function getDirectors(movies) {
  const directors = [];
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const id_movie = movie.id;
    const response_cast = await fetch(
      `https://api.themoviedb.org/3/movie/${id_movie}/credits?api_key=${process.env.API_KEY}&language=en-US`
    );
    const cast = await response_cast.json();
    let j = 0;
    let directorAdded = false;
    while (!directorAdded && j < cast.crew.length) {
      let member = cast.crew[j];
      if (member.job === 'Director') {
        directors.push(member.name);
        directorAdded = true;
      }
      j++;
    }
    if (!directorAdded) {
      directors.push('UNKNOWN');
    }
  }
  return directors;
}

function stringToQuery(string) {
  return string.replace(/ /g, '+');
}

async function getMovies(req, res) {
  const nameMovie = req.params.name;
  const query = stringToQuery(nameMovie);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}&language=es`;
  const response = await fetch(url);
  const movies_object = await response.json();
  const movies = movies_object.results;
  orderByPopularity(movies);
  res.send(movies);
}

async function getMovie(req, res) {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=es`;
  const response = await fetch(url);
  const movieInfo = await response.json();
  formatDate(movieInfo);
  const director = await getDirector(id);
  let name = movieInfo.title;
  if (movieInfo.original_language === 'es' || movieInfo.original_language === 'en') {
    name = movieInfo.original_title
  }
  const movie = {
    'id': movieInfo.id,
    'name': name,
    'director': director,
    'releaseDate': movieInfo.release_date,
    'image': movieInfo.poster_path
  }
  res.send(movie);
}

async function getDirector(id_movie) {
  const url = `https://api.themoviedb.org/3/movie/${id_movie}/credits?api_key=${process.env.API_KEY}`;
  const response = await fetch(url);
  const credits = await response.json();
  let crew = credits.crew;
  for (let i = 0; i < crew.length; i++) {
    let member = crew[i];
    if (member.job === 'Director') {
      return member.name;
    }
  }
  return 'UNKNOWN';
}

function formatDate(movie) {
  let date = movie.release_date;
  if (date) {
    const dateParts = date.split('-');
    movie.release_date = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }
}

function orderByPopularity(movies) {
  movies.sort(function (a, b) {
    let popularity_a = a.popularity;
    let popularity_b = b.popularity;
    if (popularity_a < popularity_b) {
      return 1;
    }
    if (popularity_a > popularity_b) {
      return -1;
    }
    // popularity must be equal
    return 0;
  });
}

module.exports = { getDirectors, getMovies, getMovie };
