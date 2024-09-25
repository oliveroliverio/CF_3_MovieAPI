// api-docs.js
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Movie API',
			version: '1.0.0',
			description: 'API documentation for the Movie app',
		},
		servers: [
			{
				url: 'http://localhost:8080',
			},
		],
	},
	apis: ['./index.js'], // Path to the API docs
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

module.exports = (app) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
