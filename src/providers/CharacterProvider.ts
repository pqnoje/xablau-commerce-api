const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const https = require('https')

const config = {
	"clusters": {
		"users": "mongodb://localhost:6000/data",
		"auth": "mongodb://localhost:6000/data"
	},
	"tokenSecret": "mylittltinyesecret"
}

import { CharacterModel } from '../model/Character.model'
import { AuthHelper } from '../helpers/auth'

export class CharacterProvider {

	constructor() {
	}

	public static getAll(offset: number): Promise<any> {
		return new Promise((resolve, reject) => {
			let addr = `https://gateway.marvel.com/v1/public/characters?limit=100&offset=${offset}${AuthHelper.getMarvelAuthParameters()}`
			console.log(addr)
			https.get(addr, (resp) => {
				let data = '';

				// A chunk of data has been recieved.
				resp.on('data', (chunk) => {
					data += chunk;
				});

				// The whole response has been received. Print out the result.
				resp.on('end', () => {
					console.log(JSON.parse(data).explanation);
					resolve(JSON.parse(data).data)
				});

			}).on("error", (err) => {
				console.log("Error: " + err);
				reject(err)
			});
		})

	}

	public static getOne(id: string) {

	}
}