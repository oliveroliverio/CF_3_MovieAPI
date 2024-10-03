//-----------------------------Setup-------------------------------
const mongoose = require('mongoose')
const Models = require('./models.js')
const { user } = require('pg/lib/defaults.js')
const swaggerUi = require('swagger-ui-express')
const apiDocs = require('./api-docs.js')

const Movies = Models.Movie
const Users = Models.User

const express = require('express'),
	morgan = require('morgan'),
	fs = require('fs'), // import built in node modules fs and path
	path = require('path'),
	app = express()

apiDocs(app)

mongoose.connect('mongodb://localhost:27017/myFlixMongoDB', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {
	flags: 'a',
})

// setup the logger
app.use(morgan('common', { stream: accessLogStream }))
// needed for body-parser
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// serve documentation.html from public folder
app.use(express.static('public'))

let auth = require('./auth')(app)
const passport = require('passport')
require('./passport')

// listen for requests
app.listen(8080, () => {
	console.log('Your app is listening on port 8080.')
	console.log(`Swagger UI available at http://localhost:8080/api-docs`)
})

// ----------------------------------Begin API Logic----------------------------------

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.get(
	'/movies',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		await Movies.find()
			.then((movies) => {
				res.status(201).json(movies)
			})
			.catch((err) => {
				console.log(err)
				res.status(500).send('Error: ' + err)
			})
	}
)

app.get('/movies/genres', async (_, res) => {
	// using the Movies model and mongoose, console log all genres
	Movies.find().then((movies) => {
		let genres = movies.map((movie) => movie.genre.name)
		res.json(genres)
	})
})

// returns all movies of a specific genre in json format
app.get('/movies/genres/:genreName', async (req, res) => {
	try {
		let { genreName } = req.params
		let genre = await Movies.find({ 'genre.name': genreName })

		if (genre.length > 0) {
			return res.status(200).json(genre)
		} else {
			return res.status(400).send(`Genre, ${req.params.genreName} not found`)
		}
	} catch (err) {
		console.error(err)
		return res.status(500).send('Error: ' + err)
	}
})
app.get('/movies/:title', async (req, res) => {
	try {
		let { title } = req.params
		let movie = await Movies.find({ title: title })

		if (movie) {
			return res.status(200).json(movie)
		} else {
			res.status(400).send(`Movie, ${req.params.title} not found`)
		}
	} catch (err) {
		console.error(err)
	}
})

// return the genre of a movie by title
app.get('/movies/:title/genre', async (req, res) => {
	try {
		let { title } = req.params
		let genre = await Movies.findOne({ title: title }, 'genre')
		if (genre) {
			return res.status(200).json(genre)
		}
	} catch (err) {
		console.error(err)
	}
})

// return the director of a movie by title
app.get('/movies/:title/director', async (req, res) => {
	try {
		let { title } = req.params
		let director = await Movies.findOne({ title: title }, 'director')
		if (director) {
			return res.json(director)
		}
	} catch (err) {
		console.error(err)
	}
})

// return the bio of a director by name
app.get('/directors/:name', async (req, res) => {
	try {
		let { name } = req.params
		let directorInfo = await Movies.findOne({ director: name }, 'director_info')
		if (directorInfo) {
			return res.json(directorInfo)
		}
	} catch (err) {
		console.error(err)
	}
})

// add new movie to list of movies
app.post('/movies', async (req, res) => {
	try {
		let newMovie = await Movies.create({
			title: req.body.title,
			description: req.body.description,
			genre: req.body.genre,
			director: req.body.director,
			actors: req.body.actors,
			ImagePath: req.body.ImagePath,
			Featured: req.body.Featured,
		})
		// console log "new movie, ${movie.title} added"
		console.log(`new movie, ${newMovie.title} added`)
		res.status(201).json(newMovie)
	} catch (err) {
		console.error(err)
	}
})

//------------------------------------------User Logic------------------------------------------

// get all users in json format
app.get('/users', async (req, res) => {
	await Users.find().then((users) => res.json(users))
})

//Add a user
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post('/users', async (req, res) => {
	await Users.findOne({ username: req.body.username })
		.then((user) => {
			if (user) {
				return res.status(400).send(req.body.username + 'already exists')
			} else {
				Users.create({
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
					birthday: req.body.birthday,
					favoriteMovies: req.body.favoriteMovies,
				})
					.then((user) => {
						res.status(201).json(user)
					})
					.catch((error) => {
						console.error(error)
						res.status(500).send('Error: ' + error)
					})
			}
		})
		.catch((error) => {
			console.error(error)
			res.status(500).send('Error: ' + error)
		})
})
// get a user by username

app.get('/users/:username', async (req, res) => {
	let user = await Users.findOne({ username: req.params.username })
	if (user) {
		res.json(user)
	} else {
		res.status(404).send('User not found')
	}
})

// add new favorite movie to user
// movie format
// {
// 	title: String,
// 	description: String,
// 	genre: String,
// 	director: String,
// 	actors: [String],
// 	ImagePath: String,
// 	Featured: Boolean,
// }

// this needs to first check if the movie exists in database, if not, then create it,
// get the movie ID and add it to the user's favoriteMovies array

// Also be sure to add to the movies database
app.post('/users/:username/movies', async (req, res) => {
	let user = await Users.findOne({ username: req.params.username })
	if (user) {
		let movie = await Movies.findOne({ title: req.body.title })
		if (movie) {
			user.favoriteMovies.push(movie._id)
			res.status(201).send('Movie added to favorites')
		}
	} else {
		res.status(404).send('User not found')
	}
})

// get favorite movies from a user

app.get('/users/:username/movies', async (req, res) => {
	let user = await Users.findOne({ username: req.params.username })
	if (user) {
		res.json(user.favoriteMovies)
	}
})

// remove a favorite movie from a user
app.delete('/users/:username/favoriteMovies/:movieTitle', async (req, res) => {
	try {
		let user = await Users.findOne({ username: req.params.username }).populate(
			'favoriteMovies'
		)
		if (!user) {
			return res.status(404).send('User not found')
		}

		let movie = await Movies.findOne({ title: req.params.movieTitle })
		if (!movie) {
			return res.status(404).send('Movie not found')
		}

		let movieIndex = user.favoriteMovies.findIndex((favMovie) =>
			favMovie._id.equals(movie._id)
		)
		if (movieIndex !== -1) {
			user.favoriteMovies.splice(movieIndex, 1)
			await user.save()
			return res
				.status(200)
				.send(`Movie, ${req.params.movieTitle} removed from favorites`)
		} else {
			return res.status(404).send('Movie not found in user favorites')
		}
	} catch (err) {
		console.error(err)
		return res.status(500).send('Error: ' + err)
	}
})

app.delete('/users/:username', async (req, res) => {
	let userIndex = await Users.findIndex({ username: req.params.username })
	if (userIndex !== -1) {
		users[userIndex].email = null // or use '' to set it to an empty string
		res.status(200).send('User email removed')
	} else {
		res.status(404).send('User not found')
	}
})

// update user info
app.put(
	'/users/:username',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		// CONDITION TO CHECK ADDED HERE
		if (req.user.username !== req.params.username) {
			return res.status(400).send('Permission denied')
		}
		// CONDITION ENDS
		await Users.findOneAndUpdate(
			{ username: req.params.username },
			{
				$set: {
					username: req.body.username,
					password: req.body.password,
					email: req.body.email,
					birthday: req.body.birthday,
				},
			},
			{ new: true }
		) // This line makes sure that the updated document is returned
			.then((updatedUser) => {
				res.json(updatedUser)
			})
			.catch((err) => {
				console.log(err)
				res.status(500).send('Error: ' + err)
			})
	}
)

//------------------------------------------Error Handling------------------------------------------

// Error-handling middleware
// app.use((err, req, res, next) => {
// 	console.error(err.stack)
// 	res.status(500).send('Something broke!')
// })
