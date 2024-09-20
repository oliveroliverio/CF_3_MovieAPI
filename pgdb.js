const { Client } = require('pg')
// import uuid package
const { v4: uuidv4 } = require('uuid')

const client = new Client({
	host: 'localhost',
	port: 5432,
	user: 'postgres',
	password: 'coolman2341!',
	database: 'myFlixDB',
})

client.connect()

const movies = require('./movies.json')

const showAllDirectors = () => {
	client.query(`SELECT * FROM directors`, (err, res) => {
		if (!err) {
			console.log(res.rows)
		} else {
			console.error(err)
		}
		client.end()
	})
}

// update data from movies.json to myFlixDB
const updateMovies = (movies) => {
	movies.forEach((movie) => {
		client.query(
			`UPDATE movies SET director = $1, genre = $2 WHERE Title = $3`,
			[movie.director, movie.genre.name, movie.title],
			(err, res) => {
				if (!err) {
					console.log(res.rows)
				} else {
					console.error(err)
				}
			}
		)
	})
}

// update the directors table with data from movies.json
const updateDirectorsTable = (movies) => {
	movies.forEach((movie) => {
		client.query(
			`INSERT INTO directors (name, bio, birthyear, deathyear)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (name)
             DO UPDATE SET bio = EXCLUDED.bio, birthyear = EXCLUDED.birthyear, deathyear = EXCLUDED.deathyear`,
			[
				movie.director,
				movie.director_info.biography,
				movie.director_info.birth_year,
				movie.director_info.death_year,
			],
			(err, res) => {
				if (!err) {
					console.log(res.rows)
				} else {
					console.error(err)
				}
			}
		)
	})
}

updateDirectorsTable(movies)
