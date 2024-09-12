const express = require('express')
const app = express()

// array of top sci-fi movies with title and director.  Limit to 10
let topMovies = [
	{ title: 'Blade Runner', director: 'Ridley Scott' },
	{ title: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski' },
	{ title: 'Inception', director: 'Christopher Nolan' },
	{ title: 'Star Wars: Episode IV - A New Hope', director: 'George Lucas' },
	{ title: 'The Terminator', director: 'James Cameron' },
	{ title: '2001: A Space Odyssey', director: 'Stanley Kubrick' },
	{ title: 'Alien', director: 'Ridley Scott' },
	{ title: 'Interstellar', director: 'Christopher Nolan' },
	{ title: 'E.T. the Extra-Terrestrial', director: 'Steven Spielberg' },
	{ title: 'Back to the Future', director: 'Robert Zemeckis' },
]

// GET requests
app.get('/', (req, res) => {
	res.send('Welcome to my movie api!')
})

app.get('/documentation', (req, res) => {
	res.sendFile('/documentation.html', { root: __dirname })
})

app.get('/movies', (req, res) => {
	res.json(topMovies)
})

// listen for requests
app.listen(8080, () => {
	console.log('Your app is listening on port 8080.')
})
