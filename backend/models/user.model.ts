import { Schema, model } from 'mongoose'
import { UserType } from '../shared'

const userSchema = new Schema<UserType>({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
})

const User = model('User', userSchema)

export default User
