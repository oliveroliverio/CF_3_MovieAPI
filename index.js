const express = require('express'),
	morgan = require('morgan'),
	fs = require('fs'), // import built in node modules fs and path
	path = require('path'),
	app = express()

// Import Swagger setup
require('./api-docs')(app)

//------------------------------------------Business Logic------------------------------------------
// array of movies with title and director.
let movies = [
	{
		title: 'Blade Runner',
		director: 'Ridley Scott',
		genre: {
			name: 'Sci-Fi',
			description:
				'Science fiction films are often speculative in nature and explore futuristic concepts such as advanced science and technology, space exploration, time travel, and extraterrestrial life.',
		},
		description:
			'A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.',
		img_url: '/public/img/blade_runner.jpg',
		director_info: {
			biography:
				'Ridley Scott is an English filmmaker known for his work on science fiction and historical drama films.',
			birth_year: 1937,
			death_year: null,
		},
	},
	{
		title: 'The Matrix',
		director: 'Lana Wachowski, Lilly Wachowski',
		genre: {
			name: 'Sci-Fi',
			description:
				'Science fiction films are often speculative in nature and explore futuristic concepts such as advanced science and technology, space exploration, time travel, and extraterrestrial life.',
		},
		description:
			'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
		img_url: '/public/img/the_matrix.jpg',
		director_info: {
			biography:
				'Lana and Lilly Wachowski are American film and television directors, writers, and producers, known for creating The Matrix series.',
			birth_year: 1965,
			death_year: null,
		},
	},
	{
		title: 'Inception',
		director: 'Christopher Nolan',
		genre: {
			name: 'Sci-Fi',
			description:
				'Science fiction films are often speculative in nature and explore futuristic concepts such as advanced science and technology, space exploration, time travel, and extraterrestrial life.',
		},
		description:
			'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
		img_url: '/public/img/inception.jpg',
		director_info: {
			biography:
				'Christopher Nolan is a British-American film director, producer, and screenwriter known for his cerebral, often nonlinear storytelling.',
			birth_year: 1970,
			death_year: null,
		},
	},
	{
		title: 'Star Wars: Episode IV - A New Hope',
		director: 'George Lucas',
		genre: {
			name: 'Sci-Fi',
			description:
				'Science fiction films are often speculative in nature and explore futuristic concepts such as advanced science and technology, space exploration, time travel, and extraterrestrial life.',
		},
		description:
			"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee, and two droids to save the galaxy from the Empire's world-destroying battle station.",
		img_url: '/public/img/star_wars.jpg',
		director_info: {
			biography:
				'George Lucas is an American filmmaker and entrepreneur, best known for creating the Star Wars and Indiana Jones franchises.',
			birth_year: 1944,
			death_year: null,
		},
	},
	{
		title: 'The Terminator',
		director: 'James Cameron',
		genre: {
			name: 'Sci-Fi',
			description:
				'Science fiction films are often speculative in nature and explore futuristic concepts such as advanced science and technology, space exploration, time travel, and extraterrestrial life.',
		},
		description:
			'A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her ten-year-old son, John Connor, from a more advanced and powerful cyborg.',
		img_url: '/public/img/the_terminator.jpg',
		director_info: {
			biography:
				'James Cameron is a Canadian filmmaker known for his innovative work in science fiction and action genres.',
			birth_year: 1954,
			death_year: null,
		},
	},
	{
		title: '2001: A Space Odyssey',
		director: 'Stanley Kubrick',
		genre: {
			name: 'Sci-Fi',
			description:
				'Science fiction films are often speculative in nature and explore futuristic concepts such as advanced science and technology, space exploration, time travel, and extraterrestrial life.',
		},
		description:
			'After discovering a mysterious artifact buried beneath the lunar surface, mankind sets off on a quest to find its origins with help from intelligent supercomputer HAL 9000.',
		img_url: '/public/img/2001_space_odyssey.jpg',
		director_info: {
			biography:
				'Stanley Kubrick was an American film director, producer, screenwriter, and photographer, widely regarded as one of the greatest filmmakers of all time.',
			birth_year: 1928,
			death_year: 1999,
		},
	},
	{
		title: 'Alien',
		director: 'Ridley Scott',
		genre: {
			name: 'Horror',
			description:
				'Horror films are intended to frighten, scare, or disgust the audience.',
		},
		description:
			'After a space merchant vessel receives an unknown transmission as a distress call, one of the crew is attacked by a mysterious lifeform, and they soon realize that its life cycle has merely begun.',
		img_url: '/public/img/alien.jpg',
		director_info: {
			biography:
				'Ridley Scott is an English filmmaker known for his work on science fiction and historical drama films.',
			birth_year: 1937,
			death_year: null,
		},
	},
	{
		title: 'Interstellar',
		director: 'Christopher Nolan',
		genre: {
			name: 'Sci-Fi',
			description:
				'Science fiction films are often speculative in nature and explore futuristic concepts such as advanced science and technology, space exploration, time travel, and extraterrestrial life.',
		},
		description:
			"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
		img_url: '/public/img/interstellar.jpg',
		director_info: {
			biography:
				'Christopher Nolan is a British-American film director, producer, and screenwriter known for his cerebral, often nonlinear storytelling.',
			birth_year: 1970,
			death_year: null,
		},
	},
	{
		title: 'E.T. the Extra-Terrestrial',
		director: 'Steven Spielberg',
		genre: {
			name: 'Sci-Fi',
			description:
				'Science fiction films are often speculative in nature and explore futuristic concepts such as advanced science and technology, space exploration, time travel, and extraterrestrial life.',
		},
		description:
			'A troubled child summons the courage to help a friendly alien escape Earth and return to his home world.',
		img_url: '/public/img/et.jpg',
		director_info: {
			biography:
				'Steven Spielberg is an American film director, producer, and screenwriter, widely regarded as one of the most popular directors and producers in film history.',
			birth_year: 1946,
			death_year: null,
		},
	},
	{
		title: 'Back to the Future',
		director: 'Robert Zemeckis',
		genre: {
			name: 'Sci-Fi',
			description:
				'Science fiction films are often speculative in nature and explore futuristic concepts such as advanced science and technology, space exploration, time travel, and extraterrestrial life.',
		},
		description:
			'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, eccentric scientist Doc Brown.',
		img_url: '/public/img/back_to_the_future.jpg',
		director_info: {
			biography:
				'Robert Zemeckis is an American film director, producer, and screenwriter, frequently credited as an innovator in visual effects.',
			birth_year: 1952,
			death_year: null,
		},
	},
	{
		title: 'When Harry Met Sally',
		director: 'Rob Reiner',
		genre: {
			name: 'Romantic Comedy',
			description:
				'Romantic comedy films are light-hearted, humorous plotlines centered on romantic ideals such as that true love is able to surmount most obstacles.',
		},
		description:
			'Harry and Sally have known each other for years, and are very good friends, but they fear sex would ruin the friendship.',
		img_url: '/public/img/when_harry_met_sally.jpg',
		director_info: {
			biography:
				'Rob Reiner is an American actor and filmmaker, known for his work on films such as When Harry Met Sally, The Princess Bride, and A Few Good Men.',
			birth_year: 1947,
			death_year: null,
		},
	},
	{
		title: 'The Shining',
		director: 'Stanley Kubrick',
		genre: {
			name: 'Horror',
			description:
				'Horror films are intended to frighten, scare, or disgust the audience.',
		},
		description:
			'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.',
		img_url: '/public/img/the_shining.jpg',
		director_info: {
			biography:
				'Stanley Kubrick was an American film director, producer, screenwriter, and photographer, widely regarded as one of the greatest filmmakers of all time.',
			birth_year: 1928,
			death_year: 1999,
		},
	},
	{
		title: 'March of the Penguins',
		director: 'Luc Jacquet',
		genre: {
			name: 'Documentary',
			description:
				'Documentary films are non-fictional motion pictures intended to document some aspect of reality, primarily for the purposes of instruction, education, or maintaining a historical record.',
		},
		description:
			'A look at the annual journey of Emperor penguins as they march -- single file -- to their traditional breeding ground.',
		img_url: '/public/img/march_of_the_penguins.jpg',
		director_info: {
			biography:
				'Luc Jacquet is a French film director and screenwriter, known for his work on nature documentaries.',
			birth_year: 1967,
			death_year: null,
		},
	},
]

// array of users with username, password, email, and array of favorite movies.
let users = [
	{
		username: 'user1',
		password: 'password1',
		email: 'user1@example.com',
		favoriteMovies: ['Blade Runner', 'The Matrix', 'Inception'],
	},
	{
		username: 'user2',
		password: 'password2',
		email: 'user2@example.com',
		favoriteMovies: [
			'Star Wars: Episode IV - A New Hope',
			'The Terminator',
			'2001: A Space Odyssey',
		],
	},
]
/**
 * @swagger
 * /:
 *   get:
 *     summary: Serve the index.html file
 *     responses:
 *       200:
 *         description: The HTML file
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html')
})

// get all movies
/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         director:
 *           type: string
 *         genre:
 *           type: string
 *         year:
 *           type: integer
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 */
app.get('/movies', (req, res) => {
	res.status(200).json(movies)
})

/**
 * @swagger
 * /movies/genres:
 *   get:
 *     summary: Retrieve a list of available genres
 *     responses:
 *       200:
 *         description: A list of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
app.get('/movies/genres', (req, res) => {
	let genres = movies.map((movie) => movie.genre.name)
	res.status(200).json(genres)
})

/**
 * @swagger
 * /movies/genres/{genreName}:
 *   get:
 *     summary: Retrieve a particular genre by genre name
 *     parameters:
 *       - in: path
 *         name: genreName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the genre
 *     responses:
 *       200:
 *         description: A genre object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       400:
 *         description: Genre not found
 */
app.get('/movies/genres/:genreName', (req, res) => {
	let { genreName } = req.params
	let genre = movies.find((movie) => movie.genre.name === genreName).genre

	if (genre) {
		return res.status(200).json(genre)
	} else {
		res.status(400).send('Genre not found')
	}
})

/**
 * @swagger
 * /movies/{title}:
 *   get:
 *     summary: Retrieve data for a single movie by title
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The title of the movie
 *     responses:
 *       200:
 *         description: A movie object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 director:
 *                   type: string
 *                 genre:
 *                   type: string
 *                 year:
 *                   type: integer
 *       400:
 *         description: Movie not found
 */
app.get('/movies/:title', (req, res) => {
	let { title } = req.params
	let movie = movies.find((movie) => movie.title === title)

	if (movie) {
		return res.status(200).json(movie)
	} else {
		res.status(400).send('Movie not found')
	}
})

/**
 * @swagger
 * /movies/{title}/genre:
 *   get:
 *     summary: Retrieve genre data for a single movie by title
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The title of the movie
 *     responses:
 *       200:
 *         description: The genre of the movie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: Movie not found
 */
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

// add a user with favorite movies
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
app.post('/users', (req, res) => {
	let newUser = req.body
	if (users.find((user) => user.username === newUser.username)) {
		res.status(400).send('User already exists')
	} else {
		users.push(newUser)
		res.status(200).send('User added')
	}
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

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {
	flags: 'a',
})

// setup the logger
app.use(morgan('common', { stream: accessLogStream }))

// serve documentation.html from public folder
app.use(express.static('public'))

// listen for requests
app.listen(8080, () => {
	console.log('Your app is listening on port 8080.')
})
