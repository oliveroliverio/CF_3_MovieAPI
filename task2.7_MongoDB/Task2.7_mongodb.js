// ------------------------App requirements----------------------

// Return a list of ALL movies to the user
// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
// Return data about a genre (description) by name/title (e.g., “Thriller”)
// Return data about a director (bio, birth year, death year) by name
// Allow users to add a movie to their list of favorites
// Allow users to remove a movie from their list of favorites
// Allow existing users to deregister

const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')

// Connection URL
const url = 'mongodb://localhost:27017'
const dbName = 'myFlixMongoDB'

// Create a new MongoClient
const client = new MongoClient(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})

// ------------------------Part 1: Creating the database------------------------

// see readme for starting the server

// Create a Movies collection in MongoDB
const createMoviesCollection = async () => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Create the movies collection
		await db.createCollection('movies')
		console.log('Movies collection created')
	} catch (err) {
		console.error('Error creating movies collection:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}

// createMoviesCollection()

// Add movies from the movies JSON file to the database
const addMovies = async () => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Get the movies collection
		const moviesCollection = db.collection('movies')

		// Get the movies data
		const movies = require('../Data/movies.json')

		// Insert the movies data
		await moviesCollection.insertMany(movies)
		console.log('Movies added')
	} catch (err) {
		console.error('Error adding movies:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}
// in terminal (mongosh), run db.movies.find().pretty() to see the added movies

// addMovies()

// Create a Users collection in MongoDB
const createUsersCollection = async () => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Create the users collection
		await db.createCollection('users')
		console.log('Users collection created')
	} catch (err) {
		console.error('Error creating users collection:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}

// or rather simply, in terminal (mongosh), db.createCollection('users')
// createUsersCollection()

// Add users from the users JSON file to the database
const addUsers = async () => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Get the users collection
		const usersCollection = db.collection('users')

		// Get the users data
		const users = require('../Data/users.json')

		// Insert the users data
		await usersCollection.insertMany(users)
		console.log('Users added')
	} catch (err) {
		console.error('Error adding users:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}

// addUsers()

// need to update the movies collection to add a uuid attribute
// that will be referenced in users favorite movies
const addUuidToMovies = async () => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Get the movies collection
		const moviesCollection = db.collection('movies')

		// Find all movies
		const movies = await moviesCollection.find().toArray()

		// Iterate through each movie and add a uuid field
		for (const movie of movies) {
			const uuid = uuidv4()
			await moviesCollection.updateOne(
				{ _id: movie._id },
				{ $set: { uuid: uuid } }
			)
			console.log(`Added uuid ${uuid} to movie ${movie.title}`)
		}

		console.log('All movies updated with uuid')
	} catch (err) {
		console.error('Error updating movies collection:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}

// Call the function to add uuid to movies
// addUuidToMovies()

// Add favorite movies attribute to users collection, which will
// be an array of movie uuids REFERENCES
const addFavoriteMoviesToUsers = async () => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Get the users collection
		const usersCollection = db.collection('users')
		// Get the movies collection
		const moviesCollection = db.collection('movies')

		// Find all users
		const users = await usersCollection.find().toArray()
		// Find all movies
		const movies = await moviesCollection.find().toArray()

		// Iterate through each user, add a favoriteMovies field, and populate it
		// with 5 random movies from 'movies'
		for (const user of users) {
			const favoriteMovies = []
			for (let i = 0; i < 5; i++) {
				const randomMovie = movies[Math.floor(Math.random() * movies.length)]
				favoriteMovies.push(randomMovie.uuid)
			}
			await usersCollection.updateOne(
				{ _id: user._id },
				{ $set: { favoriteMovies: favoriteMovies } }
			)
			console.log(`Added favoriteMovies to user ${user.username}`)
		}

		console.log('All users updated with favoriteMovies')
	} catch (err) {
		console.error('Error updating users collection:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}

// addFavoriteMoviesToUsers()

// ------------------------Part 2: Querying the database------------------------

// READ query function that reads all the movies from the “movies”
// collection that match a certain name
const getMovie = async (title) => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Get the movies collection
		const moviesCollection = db.collection('movies')

		// Find the movie by title
		const movie = await moviesCollection.findOne({ title: title })

		console.log('Here is the movie:', movie)
	} catch (err) {
		console.log(`Movie, '${title}', not found`)
	} finally {
		// Close the connection
		await client.close()
	}
}

// getMovie('March of the Penguins')

// UPDATE query function that renames all movies with the "Science Fiction" genre to "Sci-Fi"
// Argumments: (current genre, new genre)

const updateGenre = async (currentGenre, newGenre) => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Get the movies collection
		const moviesCollection = db.collection('movies')

		// Update the genre
		const result = await moviesCollection.updateMany(
			{ 'genre.name': currentGenre },
			{ $set: { 'genre.name': newGenre } }
		)

		console.log(`Updated ${result.modifiedCount} movies`)
	} catch (err) {
		console.error('Error updating genre:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}

// updateGenre('Science Fiction', 'Sci-Fi')

// READ query function that reads all the movies from a certain genre
const getMoviesByGenre = async (genre) => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Get the movies collection
		const moviesCollection = db.collection('movies')

		// Find the movies by genre
		const movies = await moviesCollection
			.find({ 'genre.name': genre })
			.toArray()

		console.log(`Here are the movies in the genre, ${genre}:`)
		for (const movie of movies) {
			console.log(movie.title)
		}
	} catch (err) {
		console.error('Error getting movies by genre:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}

// getMoviesByGenre('Sci-Fi')
// getMoviesByGenre('Documentary')

// READ query function to get movies by genre and director
const getMoviesByGenreAndDirector = async (genre, director) => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Get the movies collection
		const moviesCollection = db.collection('movies')

		// Find the movies by genre and director
		const movies = await moviesCollection
			.find({ 'genre.name': genre, director: director })
			.toArray()

		console.log(
			`Here are the movies in the genre, ${genre}, directed by ${director}:`
		)
		for (const movie of movies) {
			console.log(movie.title)
		}
	} catch (err) {
		console.error('Error getting movies by genre and director:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}

// getMoviesByGenreAndDirector('Sci-Fi', 'Christopher Nolan')

// UPDATE query function that replaces description of a movie
// Arguments: (title, new description)
// be sure to print old description and new description

const updateDescription = async (title, newDescription) => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Get the movies collection
		const moviesCollection = db.collection('movies')

		// Find the movie by title
		const movie = await moviesCollection.findOne({ title: title })

		// Update the description
		const result = await moviesCollection.updateOne(
			{ title: title },
			{ $set: { description: newDescription } }
		)

		console.log(`Updated description of ${title}`)
		console.log(`Old description: ${movie.description}`)
		console.log(`New description: ${newDescription}`)
	} catch (err) {
		console.error('Error updating description:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}

// updateDescription(
// 	'Inception',
// 	"A thief who uses dream-sharing technology to steal corporate secrets is tasked with the opposite mission: implanting an idea into a CEO's mind."
// )

// UPDATE query function that updates the director biography of multiple movies
// by that director.
// Arguments: (director, new bio)
// be sure to print old bio and new bio

const updateDirectorBio = async (director, newBio) => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Get the movies collection
		const moviesCollection = db.collection('movies')

		// Find the movies by director
		const movies = await moviesCollection.find({ director: director }).toArray()

		// Update the director bio
		const result = await moviesCollection.updateMany(
			{ director: director },
			{ $set: { 'director_info.biography': newBio } }
		)

		console.log(`Updated bio of ${director}`)
		console.log(`Old bio: ${movies[0].director_info.biography}`)
		console.log(`New bio: ${newBio}`)
	} catch (err) {
		console.error('Error updating director bio:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}

// updateDirectorBio(
// 	'Christopher Nolan',
// 	'Christopher Edward Nolan CBE is a British-American film director, producer, and screenwriter.'
// )

// UPDATE query function that adds a movie to a users favorites array
// Arguments: (username, movie title)
// be sure to print the updated favorites array

const addNewFavoriteMovieToUser = async (username, title) => {
	try {
		// Connect to the MongoDB server
		await client.connect()
		console.log('Connected successfully to MongoDB server')

		// Get the database
		const db = client.db(dbName)

		// Get the users collection
		const usersCollection = db.collection('users')
		// Get the movies collection
		const moviesCollection = db.collection('movies')
		// put movies collection in an array
		const movies = await moviesCollection.find().toArray()

		// Find the user by username
		const user = await usersCollection.findOne({ username: username })
		// Get uuid of movie from title argument
		const movie = movies.find((movie) => movie.title === title)
		const movieTitle = movie.title

		// Update the user's favorite movies
		await usersCollection.updateOne(
			{ username: username },
			{ $push: { favoriteMovies: movie.uuid } }
		)

		console.log(`Added ${title} to ${username}'s favorite movies`)
		// console.log(`Updated favorite movies: ${user.favoriteMovies}`)
	} catch (err) {
		console.error('Error adding favorite movie to user:', err)
	} finally {
		// Close the connection
		await client.close()
	}
}

addNewFavoriteMovieToUser('eve', 'The Matrix')
