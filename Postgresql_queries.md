# Setup for postgresql interaction
from https://www.youtube.com/watch?v=_n-Ai30C1qs
- `npm install pg`
- create `pgdb.js`
```js
const { Client } = require('pg')
const client = new Client({
	host: 'localhost',
	port: 5432,
	user: 'postgres',
	password: 'coolman2341!',
	database: 'myFlixDB',
})

client.connect()

client.query(`SELECT * FROM directors`, (err, res) => {
	if (!err) {
		console.log(res.rows)
	} else {
		console.error(err)
	}
	client.end()
})




```





# pgAdmin4
- click on Servers to the right
- connect
- right click a database (myFlixDB)
- "Query tool"

# Movies
Create movies table
```sql
CREATE TABLE Movies (
  MovieId serial PRIMARY KEY,
  Title varchar(50) NOT NULL,
  Description varchar(1000),
  DirectorID integer NOT NULL,
  GenreID integer NOT NULL,
  ImageURL varchar(300),
  Featured boolean,
  CONSTRAINT GenreKey FOREIGN KEY (GenreID)
    REFERENCES Genres (GenreID),
  CONSTRAINT DirectorKey FOREIGN KEY (DirectorID)
    REFERENCES Directors (DirectorID)
);

```

Other
```sql
CREATE TABLE Genres (
  GenreID serial PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Description varchar(1000)
);
CREATE TABLE Directors (
  DirectorID serial PRIMARY KEY,
  Name varchar(50) NOT NULL,
  Bio varchar(1000),
  Birthyear date,
  Deathyear date
);
```
# Users

```sql
CREATE TABLE Users (
  UserID serial PRIMARY KEY,
  Username varchar(50) NOT NULL,
  Password varchar(50) NOT NULL,
  Email varchar(50) NOT NULL,
  Birth_date date
);
```

## users-movies table
```sql
CREATE TABLE User_Movies (
  UserMovieID serial PRIMARY KEY,
  UserID integer,
  MovieID integer,
  CONSTRAINT UserKey FOREIGN KEY (UserID)
    REFERENCES Users(UserID),
  CONSTRAINT MovieKey FOREIGN KEY (MovieID)
    REFERENCES Movies(MovieID)
);
```


# Operations

## insert
```sql
INSERT INTO Genres(Name, Description) VALUES('Thriller', 'Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience.');
```

insert more stuff
```sql
INSERT INTO Genres(Name, Description) VALUES('Animated', 'Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.');
INSERT INTO Genres(Name, Description) VALUES('Comedy', 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.');
INSERT INTO Directors(Name, Bio, Birthyear, Deathyear) VALUES('Jonathan Demme', 'Robert Jonathan Demme was an American director, producer, and screenwriter.', '1944-01-01', '2017-01-01');
INSERT INTO Directors(Name, Bio, Birthyear) VALUES ('Judd Apatow', 'Judd Apatow is an American producer, writer, director, actor and stand-up comedian.', '1967-01-01');
INSERT INTO Movies(Title, Description, GenreID, DirectorID,ImageUrl,Featured) VALUES('Silence of the Lambs','A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',1,1,'silenceofthelambs.png',True);

```

## update

```sql
UPDATE Genres
  SET Description='Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.'
  WHERE GenreID = 1;
```

 # Modify movies table to have genre, director, and
 ```sql
ALTER TABLE Movies
ADD COLUMN Director varchar(100);

ALTER TABLE Movies
ADD COLUMN Genre varchar(50);

ALTER TABLE Movies
ADD COLUMN ImageURL varchar(300);
 ```