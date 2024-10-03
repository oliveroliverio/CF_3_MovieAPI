# Installing passport

```
npm install passport

npm install passport-local

npm install passport-jwt

npm install jsonwebtoken
```

or
`npm install passport passport-local passport-jwt jsonwebtoken`

# starting with passport.js
```js
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'Username',
      passwordField: 'Password',
    },
    async (username, password, callback) => {
      console.log(`${username} ${password}`);
      await Users.findOne({ Username: username })
      .then((user) => {
        if (!user) {
          console.log('incorrect username');
          return callback(null, false, {
            message: 'Incorrect username or password.',
          });
        }
        console.log('finished');
        return callback(null, user);
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
      })
    }
  )
);


passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
}, async (jwtPayload, callback) => {
  return await Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error)
    });
}));
```

# Create new login endpoint
Create a new endpoint for the API with the URL “/login”

# Create auth.js file
`auth.js`
```js
const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); // Your local passport file


let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // This is the username you’re encoding in the JWT
    expiresIn: '7d', // This specifies that the token will expire in 7 days
    algorithm: 'HS256' // This is the algorithm used to “sign” or encode the values of the JWT
  });
}


/* POST login. */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({ user, token });
      });
    })(req, res);
  });
}
```

# apply JWT authentication to relevant endpoints

Modify this
```js
app.get('/movies', async (req, res) => {
	await Movies.find()
		.then((movies) => {
			res.status(201).json(movies)
		})
		.catch((err) => {
			console.log(err)
			res.status(500).send('Error: ' + err)
		})
})
```

to this
```js
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  await Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});
```

# import auth.js to index.js
Add these
```js
const passport = require('passport');
require('./passport');
let auth = require('./auth')(app);
```

# Can't do anything, need to register
this is a post request

First post to /users endpoint

```js
{
    "username": "OliveOil",
    "password": "yourPasswordHere",
    "email": "olive.oil@example.com",
    "birthday": "1990-01-01",
    "favoriteMovies": ["Titanic", "Inception"]
}
```

Next do another post request to the same endpoint, but this time have a params or body.

Add keys, Username and Password, and values of the user posted above.

# Modify the app.put request
original
```js
app.put('/users/:username', async (req, res) => {
	let user = await Users.findOne({ username: req.params.username })
	if (user) {
		user.username = req.body.username
		user.password = req.body.password
		user.email = req.body.email
		user.birthday = req.body.birthday
		user.favoriteMovies = req.body.favoriteMovies
		res.status(200).send('User info updated')
	} else {
		res.status(404).send('User not found')
	}
})

```
new
```js
app.put('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // CONDITION TO CHECK ADDED HERE
    if(req.user.username !== req.params.username){
        return res.status(400).send('Permission denied');
    }
    // CONDITION ENDS
    await Users.findOneAndUpdate({ username: req.params.username }, {
        $set:
        {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday
        }
    },
        { new: true }) // This line makes sure that the updated document is returned
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error: ' + err);
        })
});
```

Now login with billybob and password to get token.  Copy token
Go to postman, make a put request to `localhost:8080/users/billybob`
Go to Authorization, choose bearer token.  Paste into token section.  In the body section paste the new data

```js
{
    "username": "billybob_renamed",
    "password": "securepassword",
    "email": "billybob@example.com",
    "birthday": "1985-05-15T00:00:00.000Z",
    "favoriteMovies": []
}
```