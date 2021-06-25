const {Pool} = require('pg') 

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DATABASE,
  ssl: {
    rejectUnauthorized: false
  }
})

async function addMovie(movie) {
  try {
    console.log(movie.date)
    const query = await pool.query(
     `INSERT INTO moviesv2(id, name, director, date, rating, image)
      VALUES($1, $2, $3, $4, $5, $6)`,
      [movie.id, movie.name, movie.director, movie.date, movie.rating, movie.image]
    )
    return query
  } catch (error) {
    return error
  }
}


async function setRating(rating, id) {
  try {
    await pool.query('UPDATE moviesv2 SET rating = $1 WHERE id = $2', [rating, id]);
  } catch (error) {
    console.log(error)
  }
}

function deleteAllMovies() {
  pool.query('DELETE FROM moviesv2');
}

// deleteAllMovies();

async function getMovies() {
  const query = await pool.query(
   `SELECT id, name, director, TO_CHAR(date, 'DD-MM-YYYY') AS date, rating, image
    FROM moviesv2
    ORDER BY id DESC`
  )
  return query.rows
}

async function deleteMovie(id) {
  try {
    await pool.query('DELETE FROM moviesv2 WHERE id = $1', [id])
  } catch(error) {
    console.log(error)
  }
}

module.exports = {addMovie, getMovies, deleteMovie, setRating}