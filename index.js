//-----------------------------Setup-------------------------------
const mongoose = require('mongoose')
const Models = require('./models.js')

const Movies = Models.Movie
const Users = Models.User

const express = require('express'),
	morgan = require('morgan'),
	fs = require('fs'), // import built in node modules fs and path
	path = require('path'),
	app = express()

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
app.use(express.urlencoded({ extended: true }))

// serve documentation.html from public folder
app.use(express.static('public'))

// listen for requests
app.listen(8080, () => {
	console.log('Your app is listening on port 8080.')
})

// Import Swagger setup
require('./api-docs')(app)

// ----------------------------------Begin API Logic----------------------------------

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

app.get('/movies', (req, res) => {
	// return all movies in json format
	Movies.find().then((movies) => res.json(movies))
})

app.get('/users', (req, res) => {
	Users.find().then((users) => res.json(users))
})

app.get('/users/emails', (_, res) => {
	Users.find()
		.then((users) => {
			console.log('Fetched users:', users) // Log the fetched users
			let emails = users.map((user) => user.email)
			console.log('Extracted emails:', emails) // Log the extracted emails
			res.json(emails)
		})
		.catch((err) => {
			console.error(err)
			res.status(500).send('Error: ' + err)
		})
})
app.get('/movies/genres', (_, res) => {
	// using the Movies model and mongoose, console log all genres
	Movies.find()
		.then((movies) => {
			let genres = movies
				.filter((movie) => movie.genre) // ensure genre is defined
				.map((movie) => movie.genre.name) // extract the genre name
			res.json(genres)
		})
		.catch((err) => {
			console.error(err)
			res.status(500).send('Error: ' + err)
		})
})

app.get('/movies/genres/:genreName', (req, res) => {
	let { genreName } = req.params
	let genre = movies.find((movie) => movie.genre.name === genreName).genre

	if (genre) {
		return res.status(200).json(genre)
	} else {
		res.status(400).send('Genre not found')
	}
})

app.get('/movies/:title', (req, res) => {
	let { title } = req.params
	let movie = movies.find((movie) => movie.title === title)

	if (movie) {
		return res.status(200).json(movie)
	} else {
		res.status(400).send('Movie not found')
	}
})

app.get('/movies/:title/genre', (req, res) => {
	let movie = movies.find((movie) => movie.title === req.params.title)
	if (movie) {
		res.json(movie.genre)
	} else {
		res.status(404).send('Movie not found')
	}
})

/**
 * @swagger
 * /movies/{title}/director:
 *   get:
 *     summary: Retrieve director data for a single movie by title
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The title of the movie
 *     responses:
 *       200:
 *         description: The director of the movie
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       404:
 *         description: Movie not found
 */
app.get('/movies/:title/director', (req, res) => {
	res.json(
		movies.find((movie) => {
			return movie.title === req.params.title
		}).director
	)
})

/**
 * @swagger
 * /directors/{name}:
 *   get:
 *     summary: Retrieve director information by director name
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the director
 *     responses:
 *       200:
 *         description: Director information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 bio:
 *                   type: string
 *                 birthdate:
 *                   type: string
 *                 nationality:
 *                   type: string
 *       404:
 *         description: Director not found
 */
app.get('/directors/:name', (req, res) => {
	res.json(
		movies.find((movie) => {
			return movie.director === req.params.name
		}).director_info
	)
})

//------------------------------------------User Logic------------------------------------------

/**
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               favoriteMovies:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: User added
 *       400:
 *         description: User already exists
 */
app.get('/users', (req, res) => {
	res.status(200).json(users)
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
	await Users.findOne({ Username: req.body.Username })
		.then((user) => {
			if (user) {
				return res.status(400).send(req.body.Username + 'already exists')
			} else {
				Users.create({
					Username: req.body.Username,
					Password: req.body.Password,
					Email: req.body.Email,
					Birthday: req.body.Birthday,
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
/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Retrieve a user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *                 favoriteMovies:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: User not found
 */
app.get('/users/:username', (req, res) => {
	let user = users.find((user) => user.username === req.params.username)
	if (user) {
		res.json(user)
	} else {
		res.status(404).send('User not found')
	}
})

// add a favorite movie to a user and append to favoriteMovies array
/**
 * @swagger
 * /users/{username}/movies:
 *   post:
 *     summary: Add a favorite movie to a user
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favoriteMovie:
 *                 type: string
 *     responses:
 *       200:
 *         description: Favorite movie added
 *       404:
 *         description: User not found
 */
app.post('/users/:username/movies', (req, res) => {
	let user = users.find((user) => user.username === req.params.username)
	if (user) {
		user.favoriteMovies.push(req.body.favoriteMovie)
		res.status(200).send('Favorite movie added')
	} else {
		res.status(404).send('User not found')
	}
})

// remove a favorite movie from a user
/**
 * @swagger
 * /users/{username}/movies:
 *   delete:
 *     summary: Remove a favorite movie from a user
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user
 *       - in: query
 *         name: favoriteMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: The favorite movie to remove
 *     responses:
 *       200:
 *         description: Favorite movie removed
 *       404:
 *         description: User or movie not found
 */
app.delete('/users/:username/movies', (req, res) => {
	let user = users.find((user) => user.username === req.params.username)
	if (user) {
		let movieIndex = user.favoriteMovies.indexOf(req.query.favoriteMovie)
		// if movie is found, remove it from the favoriteMovies array
		if (movieIndex !== -1) {
			user.favoriteMovies.splice(movieIndex, 1)
			res.status(200).send('Favorite movie removed')
		} else {
			res.status(404).send('Movie not found')
		}
	} else {
		res.status(404).send('User not found')
	}
})

// deregister user by removing their email address
/**
 * @swagger
 * /users/{username}:
 *   delete:
 *     summary: Deregister a user
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user
 *     responses:
 *       200:
 *         description: User deregistered
 *       404:
 *         description: User not found
 */
app.delete('/users/:username', (req, res) => {
	let userIndex = users.findIndex(
		(user) => user.username === req.params.username
	)
	if (userIndex !== -1) {
		users[userIndex].email = null // or use '' to set it to an empty string
		res.status(200).send('User email removed')
	} else {
		res.status(404).send('User not found')
	}
})

//------------------------------------------Error Handling------------------------------------------

// Error-handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})
