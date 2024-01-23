import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { GetUserByEmail } from '../database/user.utils'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'

declare global {
	namespace Express{
		interface Request{
			userId: string
		}
	}
}

/**
 *  Token verification: Authenticate user
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const VerifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.cookies[process.env.COOKIE_NAME as string]
	if (!token) {
		return res.status(401).json({
			message: 'Unauthorized',
		})
	}
	try { 
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
		req.userId = (decoded as JwtPayload).userId
		next()
	} catch (error) {
		return res.status(401).json({
			message: 'Unauthorized',
		})
	}
}


/**
 * 
 * @param req 
 * @param res 
 */
export const Owership = async (req: Request, res: Response) => {
	res.status(200).json({
		userId: req.userId,
	})
}


/**
 *
 * @param req
 * @param res
 */
export const Login = async (req: Request, res: Response) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array() })
	}
	//1.  get user info
	const { email, password } = req.body

	try {
		// 2. check if user exists
		const existingUser = await GetUserByEmail(email)

		if (!existingUser) {
			return res.status(400).json({ message: 'User does not exists' })
		}

		// 3. compare the password
		const isMatched = bcrypt.compareSync(password, existingUser.password)

		// 4. check if passwords match
		if (!isMatched) {
			return res.status(400).json({ message: 'Incorrect Credentials' })
		}

		// 5. sign user using jwt
		const token = jwt.sign(
			{ userId: existingUser.id },
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
		res.status(200).json({ userId: existingUser.id, message: 'User logged in successfully' })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}
}


export const LogOut = async (req: Request, res: Response) => {
	res.clearCookie(process.env.COOKIE_NAME as string)
	// res.cookie(process.env.COOKIE_NAME as string, "", {
	// 	expires: new Date(0),
	// })
	res.status(200).json({ message: 'User logged out successfully' })
}
