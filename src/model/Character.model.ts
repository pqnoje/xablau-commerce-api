import 'rxjs/add/operator/map'

export class CharacterModel {
	public email: string
	public name: string
	public password: string
	public confirmPassword: string
	public phone: string
	public company: number

	constructor(){}

	mapper(character: CharacterModel){
		this.company = Number(character.company)
		this.email = character.email
		this.confirmPassword = character.confirmPassword
		this.password = character.password
		this.name = character.name
		this.phone = character.phone
	}
}