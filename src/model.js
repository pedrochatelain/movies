const {Pool} = require('pg') 

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT_DATABASE,
})

function addMovie(req, res) {
  try {
    const name = req.body.name
    const director = req.body.director
    const date = req.body.releaseDate
    pool.query(
      'INSERT INTO moviesv2(name, director, watched, date) VALUES($1, $2, $3, $4)',
      [name, director, false, date]
    );
    res.end()
  } catch (error) {
    console.log(error)
  }
}

module.exports = {addMovie}