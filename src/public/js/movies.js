async function getDirectors(movies) {
    const directors = []
    for (let i = 0; i < movies.length; i++) {
        let directorAdded = false
        const movie = movies[i]
        const id_movie = movie.id
        const response_cast = await fetch(`https://api.themoviedb.org/3/movie/${id_movie}/credits?api_key=${config.api_key}&language=en-US`)
        const cast = await response_cast.json()
        let j = 0
        while ( ! directorAdded && j < cast.crew.length ) {
            let member = cast.crew[j]
            if (member.job === 'Director') {
                directors.push(member.name)
                directorAdded = true
            }
            j++
        }
        if ( ! directorAdded ) {
            directors.push('UNKNOWN')
        }
    }
    console.log(directors)
    return directors
}

function stringToQuery(string) {
    return string.replace(/ /g, '+')
}

async function getMovies(input_search_movie) {
    const query = stringToQuery(input_search_movie.value)
    const api_key = config.api_key
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&language=es`
    const movies_response = await fetch(url)
    const movies = await movies_response.json()
    const cards_response = await fetch('templates/cards.ejs') 
    const cards_template = await cards_response.text()
    const directors = await getDirectors(movies.results)
    console.log(movies)

    const cards = ejs.render(cards_template, {
        movies : movies.results,
        directors : directors
    })
    document.querySelector('.js-cards-add-movies').innerHTML = cards
}