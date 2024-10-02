const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const path = require('path')

// Load the OpenAPI YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'openapi.yaml'))

module.exports = (app) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
