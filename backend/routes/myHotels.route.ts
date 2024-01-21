import express from 'express'
import multer from 'multer'
import { AddHotel } from '../controllers/myHotels.controller'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 5 * 1024 * 1024, // 5MB
	},
})

router.post('/', upload.array('imageFiles', 6), AddHotel)
export default router
