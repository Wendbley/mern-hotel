import express from 'express'
import { Login, LogOut, Owership, VerifyToken } from '../controllers/auth.controller'
import { check } from 'express-validator'


const router = express.Router()

router.get('/validate-token', VerifyToken, Owership)
/**
 * @api {post} /api/v1/auth/login --> Login User
 */
router.post('/login',[
	check('email', 'Email is required').isEmail(),
	check('password', 'Password must be at least 6 characters').isLength({
		min: 6,
	}),
], Login)


router.post('/logout', LogOut)


export default router