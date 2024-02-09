import { Response, Request } from 'express'
import cloudinary from 'cloudinary'
import { HotelType } from '../types'
import {
	CreateHotel,
	GetAllHotels,
	GetHotel,
	UpdateHotel,
} from '../database/hotel.utils'

/**
 *
 * @param imageFiles
 * @returns
 */
async function uploadImagesToCloudinary(imageFiles: Express.Multer.File[]) {
	const uploadPromises = imageFiles.map(async (image) => {
		const b64 = Buffer.from(image.buffer).toString('base64')
		let dataURI = 'data:' + image.mimetype + ';base64,' + b64
		const res = await cloudinary.v2.uploader.upload(dataURI)
		return res.url
	})

	const imageUrls = await Promise.all(uploadPromises)
	return imageUrls
}

/**
 *
 * @param req
 * @param res
 */
export const AddHotel = async (req: Request, res: Response) => {
	const imageFiles = req.files as Express.Multer.File[]

	try {
		// create new hotel and convert pricePerNight, startRating, adultCount, childCount to number
		const newHotel: HotelType = {
			...req.body,
			pricePerNight: Number(req.body.pricePerNight),
			starRating: Number(req.body.starRating),
			adultCount: Number(req.body.adultCount),
			childCount: Number(req.body.childCount),
		}

		// 1. upload images to cloudinary
		const imageUrls = await uploadImagesToCloudinary(imageFiles)

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

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const GetMyHotels = async (req: Request, res: Response) => {
	try {
		const hotels = await GetAllHotels(req.userId)
		return res.status(200).json({ hotels })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Something went wrong' })
	}
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const GetMyHotel = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const hotel = await GetHotel(id, req.userId)
		return res.status(200).json(hotel)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Something went wrong' })
	}
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const UpdateMyHotel = async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		// 1. Get hotel from client and update date
		const updatedHotel = {
			...req.body,
			pricePerNight: Number(req.body.pricePerNight),
			starRating: Number(req.body.starRating),
			adultCount: Number(req.body.adultCount),
			childCount: Number(req.body.childCount),
		}
		updatedHotel.lastUpdated = new Date()
		console.log(updatedHotel)

		// 2. get the hotel from our database
		const hotel = await GetHotel(id, req.userId)

		// 3. check if the hotel exists
		if (!hotel) {
			return res.status(500).json({ message: 'Hotel not found...' })
		}

		// 4. Get the image files and upload to cloudinary
		const imageFiles = req.files as Express.Multer.File[]
		const updatedImageUrls = await uploadImagesToCloudinary(imageFiles)

		updatedHotel.imageUrls = [
			...updatedImageUrls,
			...(updatedHotel.imageUrls || []),
		]

		// 5. update the hotel in our database
		const updated_Hotel = await UpdateHotel(id, req.userId, updatedHotel)

		// 6. check if the update was successful
		if (!updated_Hotel) {
			return res.status(500).json({ message: 'Failed to update' })
		}

		// 7. return a 200 status
		return res.status(200).json(updated_Hotel)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Something went wrong' })
	}
}
