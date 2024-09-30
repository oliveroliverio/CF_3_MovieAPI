Initialize npm repo so as to install npm packages
`npm init -y`

Install express
`npm install express --save`

Install nodemon
`npm install nodemon --save-dev`

Basic server.js
```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(8080, () => console.log('listening on 8080'))
```

Run in terminal:
`nodemon server.js`

or change package.json script

```json
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
}
```
and then run:
`npm run dev` or `npm run start`