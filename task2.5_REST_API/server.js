const express = require('express'),
	bodyParser = require('body-parser'),
	uuid = require('uuid')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.send('hello world')
})

app.listen(8080, () => console.log('listening on 8080'))
