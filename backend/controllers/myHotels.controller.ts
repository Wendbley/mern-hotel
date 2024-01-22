import { Response, Request } from 'express'
import cloudinary from 'cloudinary'
import { HotelType } from '../types'
import { CreateHotel } from '../database/hotel.utils'

/**
 * 
 * @param imageFiles 
 * @returns 
 */
const uploadImagesToCloudinary = (imageFiles: Express.Multer.File[]) => {
	return imageFiles.map(async (image) => {
		const b64 = Buffer.from(image.buffer).toString('base64')
		let dataURI = 'data:' + image.mimetype + ';base64,' + b64
		const res = await cloudinary.v2.uploader.upload(dataURI)
		return res.url
	})
}

/**
 *
 * @param req
 * @param res
 */
export const AddHotel = async (req: Request, res: Response) => {
	const imageFiles = req.files as Express.Multer.File[]
	try {
		const newHotel: HotelType = req.body

		// 1. upload images to cloudinary
		const uploadPromises = await uploadImagesToCloudinary(imageFiles)
		const imageUrls = await Promise.all(uploadPromises)

		// 2. if upload successful, add the URLs images, logged user and updated date to the new hotel
		newHotel.imageUrls = imageUrls
		newHotel.lastUpdated = new Date()
		newHotel.userId = req.userId

		// 3. save the new hotel in our database
		const hotel = CreateHotel(newHotel)
		if (!hotel) {
			res.status(500).json({ message: 'Failed to add hotel' })
		}
		// 4. retturn a 201 status
		res.status(201).json({ message: 'Hotel Added Successfully', hotel })
	} catch (error) {
		res.status(500).json({ message: 'Something went wrong' })
	}
}
