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

//
