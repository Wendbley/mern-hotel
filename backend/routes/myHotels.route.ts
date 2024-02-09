import express from 'express'
import multer from 'multer'
import { AddHotel, GetMyHotel, GetMyHotels, UpdateMyHotel } from '../controllers/myHotels.controller'
import { VerifyToken } from '../controllers/auth.controller'
import { body } from 'express-validator'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB
	},
})

/**
 * @api {post} /api/v1/my-hotels --> Add Hotel
 */
router.post(
	'/',
	VerifyToken,
	[
		body('name').notEmpty().withMessage('Name is required'),
		body('city').notEmpty().withMessage('City is required'),
		body('country').notEmpty().withMessage('Country is required'),
		body('description').notEmpty().withMessage('Description is required'),
		body('type').notEmpty().withMessage('Hotel type is required'),
		body('pricePerNight')
			.notEmpty()
			.isNumeric()
			.withMessage('Price per night is required and must be a number'),
		body('facilities')
			.notEmpty()
			.isArray()
			.withMessage('Facilities are required'),
	],
	upload.array('imageFiles', 6),
	AddHotel
)


/**
 * @api {get} /api/v1/my-hotels/:id --> Get My Hotels
 */
router.get('/', VerifyToken, GetMyHotels)


/**
 * @api {get} /api/v1/my-hotels/:id --> Get My Hotels
 */
router.get('/:hotelId', VerifyToken, GetMyHotel)


/**
 * @api {update} /api/v1/my-hotels/:id --> Get My Hotels
 */
router.put('/:hotelId', VerifyToken, upload.array('imageFiles', 6), UpdateMyHotel)




export default router
