const { Client } = require('pg')
// import uuid package
const { v4: uuidv4 } = require('uuid')

const client = new Client({
	host: 'localhost',
	port: 5432,
	user: 'postgres',
	password: 'password1!',
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
            movieid UUID PRIMARY KEY,
            title VARCHAR(100) NOT NULL UNIQUE,
            description TEXT NOT NULL,
            genre VARCHAR(100) NOT NULL,
            director VARCHAR(100) NOT NULL,
            directorid UUID NOT NULL,
            CONSTRAINT fk_director
                FOREIGN KEY(directorid)
                REFERENCES directors(directorid)
        )`,
		(err, res) => {
			if (!err) {
				console.log(res)
			} else {
				console.error(err)
				console.log('Error creating movies table')
			}
		}
	)

	client.query(
		`CREATE TABLE IF NOT EXISTS directors (
            directorid UUID PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            bio TEXT NOT NULL,
            birthyear INTEGER NOT NULL,
            deathyear INTEGER
        )`,
		(err, res) => {
			if (!err) {
				console.log(res)
			} else {
				console.error(err)
				console.log('Error creating directors table')
			}
		}
	)

	client.query(
		`CREATE TABLE IF NOT EXISTS genres (
            genreid UUID PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            description TEXT NOT NULL
        )`,
		(err, res) => {
			if (!err) {
				console.log(res)
			} else {
				console.error(err)
				console.log('Error creating genres table')
			}
		}
	)

	client.query(
		`CREATE TABLE IF NOT EXISTS users_movies (
            id UUID PRIMARY KEY,
            userid UUID NOT NULL,
            movieid UUID NOT NULL,
            CONSTRAINT fk_user
                FOREIGN KEY(userid)
                REFERENCES users(userid),
            CONSTRAINT fk_movie
                FOREIGN KEY(movieid)
                REFERENCES movies(movieid)
        )`,
		(err, res) => {
			if (!err) {
				console.log(res)
			} else {
				console.error(err)
				console.log('Error creating users_movies table')
			}
		}
	)

	// create users table
	client.query(
		`CREATE TABLE IF NOT EXISTS users (
            userid UUID PRIMARY KEY,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            birthday DATE
        )`,
		(err, res) => {
			if (!err) {
				console.log(res)
			} else {
				console.error(err)
				console.log('Error creating users table')
			}
		}
	)
}

// createTables()

// populate movies table with data from movies.json
const populateMoviesTable = (movies) => {
	movies.forEach((movie) => {
		client.query(
			`INSERT INTO movies (movieid, title, description, genre, director)
			 VALUES ($1, $2, $3, $4, $5)
			 ON CONFLICT (title)
			 DO NOTHING`,
			[
				uuidv4(),
				movie.title,
				movie.description,
				movie.genre.name,
				movie.director,
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

// populateMoviesTable(movies)

//------------------------------other functions-----------------------

// update the directors table with data from movies.json
const populateDirectorsTable = (movies) => {
	movies.forEach((movie) => {
		client.query(
			`INSERT INTO directors (directorid, name, bio, birthyear, deathyear)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (directorid)
             DO UPDATE SET bio = EXCLUDED.bio, birthyear = EXCLUDED.birthyear, deathyear = EXCLUDED.deathyear`,
			[
				uuidv4(), // Generate a new UUID for directorid
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

// populateDirectorsTable(movies)

// populate genres table with data from movies.json
const populateGenresTable = (movies) => {
	movies.forEach((movie) => {
		client.query(
			`INSERT INTO genres (genreid, name, description)
			 VALUES ($1, $2, $3)
			 ON CONFLICT (name)
			 DO NOTHING`,
			[uuidv4(), movie.genre.name, movie.genre.description],
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

// populateGenresTable(movies)

// add genre function that adds genre name, description, and genreid (integer)
const addActionGenre = () => {
	let genre = {
		name: 'Action',
		description:
			'Action movies are characterized by physical action, including fighting, chases, and explosions.',
		genreid: uuidv4(),
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
				console.log('Action genre added successfully')
			} else {
				console.error(err)
			}
		}
	)
}

// addActionGenre()

// populate users table with data from users.json
const populateUsersTable = () => {
	users.forEach((user) => {
		client.query(
			`INSERT INTO users (userid, username, password, email, birthday)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (username)
             DO NOTHING`,
			[uuidv4(), user.username, user.password, user.email, user.birthday],
			(err, res) => {
				if (!err) {
					console.log(res.rows)
					console.log('Users added successfully')
				} else {
					console.error(err)
				}
			}
		)
	})
}

// populateUsersTable()

// select all users from the users table and store into array "usersArray"
let usersArray = []
client.query(`SELECT * FROM users`, (err, res) => {
	if (!err) {
		usersArray = res.rows
		// console log only the userid part of the usersArray
		console.log(usersArray.map((user) => user.userid))
	} else {
		console.error(err)
	}
})

// Function to populate the users_movies table
const populateUsersMoviesTable = () => {
	// Fetch users from the users table
	client.query(`SELECT * FROM users`, (err, userRes) => {
		if (err) {
			console.error('Error fetching users:', err)
			return
		}

		const users = userRes.rows

		// Fetch movies from the movies table
		client.query(`SELECT * FROM movies`, (err, movieRes) => {
			if (err) {
				console.error('Error fetching movies:', err)
				return
			}

			const movies = movieRes.rows

			// Populate users_movies table with userid and movieid from both the users and movies table
			users.forEach((user) => {
				movies.forEach((movie) => {
					client.query(
						`INSERT INTO users_movies (id, userid, movieid)
                         VALUES ($1, $2, $3)
                         ON CONFLICT (id)
                         DO NOTHING`,
						[uuidv4(), user.userid, movie.movieid],
						(err, res) => {
							if (!err) {
								console.log(
									`Inserted user_movie: ${user.userid} - ${movie.movieid}`
								)
							} else {
								console.error(err)
							}
						}
					)
				})
			})
		})
	})
}

// populateUsersMoviesTable()

// function to create a view that aggregates the movie titles for each director:
const createViewDirectorMovies = () => {
	client.query(
		`CREATE VIEW director_movies AS
		SELECT d.directorid, d.name, d.bio, d.birthyear, d.deathyear, array_agg(m.title) AS movies
		FROM directors d
		LEFT JOIN movies m ON d.directorid = m.directorid
		GROUP BY d.directorid;`,
		(err, res) => {
			if (!err) {
				console.log(res)
				console.log('View created successfully')
			} else {
				console.error(err)
			}
		}
	)
}

createViewDirectorMovies()

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
