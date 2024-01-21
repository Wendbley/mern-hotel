import express from 'express'
import { Register } from '../controllers/user.controller'
import { check } from 'express-validator'

const router = express.Router()

/**
 * @api {post} /api/v1/auth/register -->  Register User
 */

router.post(
	'/register',
	[
		check('firstName', 'FirstName if required').isString(),
		check('lastName', 'Last Name is required').isString(),
		check('password', 'Password is required'),
		check('email', 'Email is required').isEmail(),
		check('password', 'Password must be at least 6 characters').isLength({
			min: 6,
		}),
	],
	Register
)



export default router
