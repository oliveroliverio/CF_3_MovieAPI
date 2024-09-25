
Install MongoDB community
`brew tap mongodb/brew`
`brew install mongodb-community.`
  
Run
`brew services start mongodb-community`

Launch mongo shell
`mongosh`

Stop
`brew services stop mongodb-community`

Show databases and connections
`show dbs`

To see which database MongoDB is currently set to, type:
`db`

To either create a new database or switch to a different database, type:

`use [database name]`

To switch to another database, you can simply type
`use [database name]`

To view all of the collections in your current database, type:
`db.getCollectionNames()`

To get started, the JavaScript syntax for creating a new collection in MongoDB is as follows:

`db.createCollection("collectionName")`
`db.createCollection("movies")`

The JavaScript syntax for inserting a new document into a collection is:
`db.[collectionName].insertOne(document-to-insert)`

in JS, insert a movie
```js
var movie1 = {
  Title: "Silence of the Lambs",
  Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
  Genre: {
    Name: "Thriller",
    Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
  },
  Director: {
    Name: "Jonathan Demme",
    Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
    Birth: "1944",
    Death: "2017"
  },
  ImagePath: "silenceofthelambs.png",
  Featured: true
}

db.movies.insertOne(movie1)
```

Apostrophes

```js
let someRandomObject = {
 Description: 'This is Fred\'s bag'
}

db.someRandomTable.insertOne(someRandomObject)
```

To read all documents from a certain collection, use the command:
`db.[collectionName].find()`

Reading with Conditions
In the previous Exercise, you used a WHERE clause to specify that you wanted to extract a record for which only certain conditions were true (e.g., all movies with the “Thriller” genre). In MongoDB, you can do this in a similar fashion; only, instead of a WHERE clause, you use a find() function. Take a look at the following two syntaxes:
`db.[collectionName].find( [Condition] )`

`db.[collectionName].findOne( [Condition] )`

`db.movies.findOne( { Title: "Silence of the Lambs" } )`

Find all movies with certain genre
`db.movies.find({ "Genre.Name": "Thriller" })`


Updating Records
If you need to add information to—or change the information of—a document, you need to update that document. The syntax for doing so is as follows:

`db.[Collection Name].update( [Condition for which records to update], [Update to make] )`

```js
db.movies.updateOne(
  { _id: ObjectId("5c3bd189515a081b363cb7e4") },
  { $set: { Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer." } }
)
```

Say you wanted to add an actor to this:
```js
{
  _id: ObjectId("5c3bd189515a081b363cb7e4"),
  Title: "Silence of the Lambs",
  Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
  Genre: {
    Name: "Thriller",
    Description: "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."
  },
  Director: {
    Name: "Jonathan Demme",
    Bio: "Robert Jonathan Demme was an American director, producer, and screenwriter.",
    Birth: "1944",
    Death: "2017"
  },
  ImagePath: "silenceofthelambs.png",
  Actors: [ "Anthony Hopkins", "Jodie Foster" ],
  Featured: true
}
```

use `$push`
syntax below
```js
db.[collectionName].update(
  [condition of which items to update],
    { $push: { [name of key to add value to end of array] : [value to add to end of array ] } }
)
```

example
```js
db.movies.update(
  { _id: ObjectId("5c3bd189515a081b363cb7e4") },
  { $push: { Actors: "Kasi Lemmings" } }
)
```

Deleting Records
The last CRUD method to cover is the “D”: “DELETE.” To delete all the records from a collection that meet a certain condition, the command would be as follows:

`db.[collectionName].deleteOne([condition])`

Or

`db.[collectionName].deleteMany([condition])`


For instance, if you wanted to delete all movie documents from your “movies” collection that are in the “comedy” genre, you could run the following command:

`db.movies.deleteMany({ "Genre.Name": "Comedy" })`

Again, similar to the find() example, this query isn’t the same as
`db.movies.deleteMany({ Genre: { Name: "Comedy" } })`