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
const users = require('./users.json')
//--------------------------Test Functions--------------------------

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

// ---------------------Part 1-------------------

// create Movies, Directors, Genres, and Users-Movies tables
const createTables = () => {
	client.query(
		`CREATE TABLE IF NOT EXISTS movies (
            movieid SERIAL PRIMARY KEY,
            title VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            genre VARCHAR(100) NOT NULL,
            director VARCHAR(100) NOT NULL
        )`,
		(err, res) => {
			if (!err) {
				console.log(res)
			} else {
				console.error(err)
			}
		}
	)

	client.query(
		`CREATE TABLE IF NOT EXISTS directors (
            directorid SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            bio TEXT NOT NULL,
            birthyear INTEGER NOT NULL,
            deathyear INTEGER
        )`,
		(err, res) => {
			if (!err) {
				console.log(res)
			} else {
				console.error(err)
			}
		}
	)

	client.query(
		`CREATE TABLE IF NOT EXISTS genres (
            genreid SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT NOT NULL
        )`,
		(err, res) => {
			if (!err) {
				console.log(res)
			} else {
				console.error(err)
			}
		}
	)

	client.query(
		`CREATE TABLE IF NOT EXISTS users_movies (
            id SERIAL PRIMARY KEY,
            userid VARCHAR(100) NOT NULL,
            movieid INTEGER NOT NULL
        )`,
		(err, res) => {
			if (!err) {
				console.log(res)
			} else {
				console.error(err)
			}
		}
	)
	// create uers table
	client.query(
		`CREATE TABLE IF NOT EXISTS users (
            userid SERIAL PRIMARY KEY,
            username VARCHAR(100) NOT NULL,
            password VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            birthday DATE
        )`,
		(err, res) => {
			if (!err) {
				console.log(res)
			} else {
				console.error(err)
			}
		}
	)
}

// add new movies from movies.json to myFlixDB (skipping duplicates already in db)
const addNewMovies = (movies) => {
	movies.forEach((movie) => {
		client.query(
			`INSERT INTO movies (title, description, genre, director)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (title)
             DO NOTHING`,
			[movie.title, movie.description, movie.genre.name, movie.director],
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

//------------------------------other functions-----------------------

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

// add genre function that adds genre name, description, and genreid (integer)
const addActionGenre = () => {
	let genre = {
		name: 'Action',
		description:
			'Action movies are characterized by physical action, including fighting, chases, and explosions.',
		genreid: 4,
	}
	client.query(
		`INSERT INTO genres (name, description, genreid)
         VALUES ($1, $2, $3)
         ON CONFLICT (name)
         DO NOTHING`,
		[genre.name, genre.description, genre.genreid],
		(err, res) => {
			if (!err) {
				console.log(res.rows)
			} else {
				console.error(err)
			}
		}
	)
}

// populate users table with data from users.json
const addUsersFromJsonFile = () => {
	users.forEach((user) => {
		client.query(
			`INSERT INTO users (username, password, email, birthday)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (username)
             DO NOTHING`,
			[user.username, user.password, user.email, user.birthday],
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

//---------------------Part 2----------------

const getGenreID = (genre) => {
	client.query(
		`SELECT genreid FROM genres WHERE name = $1`,
		[genre],
		(err, res) => {
			if (!err) {
				console.log(res.rows)
			} else {
				console.error(err)
			}
		}
	)
}

// getGenreID('Action')

const getAllMoviesOfGenre = (genre) => {
	client.query(`SELECT * FROM movies WHERE genre = $1`, [genre], (err, res) => {
		if (!err) {
			console.log(res.rows)
		} else {
			console.error(err)
		}
	})
}

// getAllMoviesOfGenre('Sci-Fi')

const updateUserEmail = (username, email) => {
	client.query(
		`UPDATE users SET email = $1 WHERE username = $2`,
		[email, username],
		(err, res) => {
			if (!err) {
				console.log(res.rows)
				console.log('Email updated successfully')
			} else {
				console.error(err)
			}
		}
	)
}

// updateUserEmail('johndoe', 'johndoe_modified2@example.com')

const deleteMovie = (title) => {
	client.query(`DELETE FROM movies WHERE title = $1`, [title], (err, res) => {
		if (!err) {
			console.log(res.rows)
			console.log(`${title} deleted successfully`)
		} else {
			console.error(err)
		}
	})
}

// deleteMovie('Silence of the Lambs')
// --------------------Run------------------

// updateDirectorsTable(movies)
// addNewMovies(movies)
