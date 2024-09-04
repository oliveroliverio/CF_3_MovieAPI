// load node modules
let http = require('http'),
	fs = require('fs'),
	url = require('url')
// path = require('path')

// create server
http
	.createServer((req, res) => {
		// parse request url to see if it contains "documentation"
		let path = new URL(req.url, `http://${req.headers.host}`).pathname
		// if the request url contains "documentation"
		if (path === '/documentation') {
			// read the documentation file
			fs.readFile('documentation.html', (err, data) => {
				// if there is an error, return a 500 error
				if (err) {
					res.writeHead(500, { 'Content-Type': 'text/plain' })
					res.end('Internal Server Error')
				} else {
					// return the documentation file
					res.writeHead(200, { 'Content-Type': 'text/html' })
					res.end(data)
				}
			})
		} else {
			// read the index.html file
			fs.readFile('index.html', (err, data) => {
				// if there is an error, return a 500 error
				if (err) {
					res.writeHead(500, { 'Content-Type': 'text/plain' })
					res.end('Internal Server Error')
				} else {
					// return the index.html file
					res.writeHead(200, { 'Content-Type': 'text/html' })
					res.end(data)
				}
			})
		}
	})
	// listen on port 8080
	.listen(8080, () => {
		console.log('Server is listening on port 8080')
	})
