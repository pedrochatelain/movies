async function getDirectors(movies) {
  const directors = []
  for (let i = 0; i < movies.length; i++) {
    let directorAdded = false
    const movie = movies[i]
    const id_movie = movie.id
    const key = await getKeyApi();
    const response_cast = await fetch(`https://api.themoviedb.org/3/movie/${id_movie}/credits?api_key=${key}&language=en-US`)
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

// parses date from YYYY-MM-DD to DD-MM-YYYY
function formatDate(date) {
  const dateParts = date.split("-");
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
}

function stringToQuery(string) {
  return string.replace(/ /g, '+')
}

async function getMovies(name_movie) {
  const query = stringToQuery(name_movie)
  const api_key = await getKeyApi();
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`
  const movies_response = await fetch(url)
  const movies_object = await movies_response.json()
  const movies = movies_object.results
  orderByPopularity(movies)
  return movies
}

async function getKeyApi() {
  const key_response = await fetch('/key_api');
  const key = await key_response.text();
  return key;
}

async function showMovies(movies) {
  const directors = await getDirectors(movies)
  const response = await fetch('templates/cards.ejs')
  const cards_template = await response.text()
  const cards = ejs.render(cards_template, {
    movies: movies,
    directors: directors
  })
  document.querySelector('.js-cards-add-movies').innerHTML = cards
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