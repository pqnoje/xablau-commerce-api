const jwt = require('jsonwebtoken')
const config = {
	"clusters": {
		"users": "mongodb://localhost:6000/data",
		"auth": "mongodb://localhost:6000/data"
	},
	"tokenSecret": "mylittltinyesecret"
}

export class Config {
	constructor() { }

	static config() {
		return config
	}
}