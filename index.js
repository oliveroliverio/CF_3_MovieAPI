const express = require('express'),
	morgan = require('morgan'),
	fs = require('fs'), // import built in node modules fs and path
	path = require('path')
const app = express()

// array of movies with title and director.
let movies = [
	{
		title: 'Blade Runner',
		director: 'Ridley Scott',
		genre: 'Sci-Fi',
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
		genre: 'Sci-Fi',
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
		genre: 'Sci-Fi',
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
		genre: 'Sci-Fi',
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
		genre: 'Sci-Fi',
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
		genre: 'Sci-Fi',
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
		genre: 'Horror',
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
		genre: 'Sci-Fi',
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
		genre: 'Sci-Fi',
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
		genre: 'Sci-Fi',
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
		genre: 'Romantic Comedy',
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
		genre: 'Horror',
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
		genre: 'Documentary',
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

// array of users with username, password, and array of favorite movies.
let users = [
	{
		username: 'user1',
		password: 'password1',
		favoriteMovies: ['Blade Runner', 'The Matrix', 'Inception'],
	},
	{
		username: 'user2',
		password: 'password2',
		favoriteMovies: [
			'Star Wars: Episode IV - A New Hope',
			'The Terminator',
			'2001: A Space Odyssey',
		],
	},
]

// GET requests
app.get('/', (req, res) => {
	res.send('Welcome to my movie api!')
})
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {
	flags: 'a',
})

// setup the logger
app.use(morgan('common', { stream: accessLogStream }))

// serve documentation.html from public folder
app.use(express.static('public'))

// get all movies
app.get('/movies', (req, res) => {
	res.json(topMovies)
})

// Error-handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

// listen for requests
app.listen(8080, () => {
	console.log('Your app is listening on port 8080.')
})

// return data for a single movie by title
app.get('/movies/:title', (req, res) => {
	res.json(
		topMovies.find((movie) => {
			return movie.title === req.params.title
		})
	)
})

// return genre data for a single movie by title
app.get('/movies/:title/genre', (req, res) => {
	res.json(
		topMovies.find((movie) => {
			return movie.title === req.params.title
		}).genre
	)
})

// return director data for a single movie by title
app.get('/movies/:title/director', (req, res) => {
	res.json(
		topMovies.find((movie) => {
			return movie.title === req.params.title
		}).director
	)
})

// return director data by director name
app.get('/directors/:name', (req, res) => {
	res.json(
		topMovies.find((movie) => {
			return movie.director === req.params.name
		}).director_info
	)
})
