import { Request, Response } from 'express'
import { CreateUser, GetAllUsers, GetUserByEmail } from '../database/user.utils'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'


/**
 *
 * @param req
 * @param res
 */
export const Register = async (req: Request, res: Response) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array() })
	}
	const { email } = req.body
	
	//1.  get user info

	try {
		// 2. check if user exists
		const existingUser = await GetUserByEmail(email)

		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' })
		}
		// 3. encrypt the password
		const salt = bcrypt.genSaltSync(10) //bcrypt.genSalt(10)
		const hashedPassword = bcrypt.hashSync(req.body.password, salt)
		
		
		const { confirmPassword, ...credentials } = req.body
		// 4. save user
		const user = await CreateUser({
			...credentials, password : hashedPassword
		})

		if (!user) {
			return res.status(500).json({ message: 'Failed to register user' })
		}

		// 5. sign user using jwt
		const token = jwt.sign(
			{ userId: user.id },
			process.env.JWT_SECRET as string,
			{ expiresIn: '1d' }
		)

		// 6. set cookie
		res.cookie(process.env.COOKIE_NAME as string, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 86400000,
		})

		// 7. send response
		res.status(200).json({ message: 'User registered successfully' })
	} catch (error) {
		res.status(500).send({ message: 'Internal server error' })
	}
}

export const GetUsers = async(req: Request, res: Response) => {
	try {
		const users = await GetAllUsers()
		return res.status(200).json({ users })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Something went wrong' })
	}
}
