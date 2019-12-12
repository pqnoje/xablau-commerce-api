const MongoClient = require('mongodb').MongoClient 
const ObjectId = require('mongodb').ObjectId
const config = {
	"clusters": {
		"users": "mongodb://localhost:6000/data",
		"auth": "mongodb://localhost:6000/data"
	},
	"tokenSecret": "mylittltinyesecret"
}

import { CharacterModel } from '../model/Character.model'
import { TokenHelper } from '../helpers/token'

export class AuthProvider{
	
	constructor(){}

	public static authUser(currentUser: CharacterModel){
		return new Promise((resolve, reject) => {
			MongoClient.connect(config.clusters.users, (err, db) => {
				if(err)
					reject(err)	

				db.collection("users")
				.findOne({ email: currentUser.email }, (err, user) => {
					if(err)
						reject(err)	

					if(user.password === currentUser.password)
						resolve({ access_token: TokenHelper.generatePrivate() })
						reject("invalid_password")
				})
			})
		})
	}
}