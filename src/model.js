const {Pool} = require('pg') 

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DATABASE,
})

function addMovie(movie) {
  try {
    pool.query(
     `INSERT INTO moviesv2(name, director, date, rating, image)
      VALUES($1, $2, $3, $4, $5)`,
      [movie.name, movie.director, movie.date, movie.rating, movie.image]
    );
  } catch (error) {
    console.log(error)
  }
}

async function getMovies() {
  const query = await pool.query(
   `SELECT name, director, TO_CHAR(date, 'DD-MM-YYYY') AS date, rating, image
    FROM moviesv2`
  )
  return query.rows
}

module.exports = {addMovie, getMovies}