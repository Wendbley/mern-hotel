import { Request, Response } from 'express'
import { GetAllHotels } from '../database/hotel.utils'


/**
 *
 * @param req
 * @param res
 * @returns
 */
export const SearchHotels = async (req: Request, res: Response) => {
	try {
		const pageSize = 5
		const pageNumber = parseInt(
			req.query.page ? req.query.page.toString() : '1'
		)
		const skip = (pageNumber - 1) * pageSize

		const { hotels, total } = await GetAllHotels()
		const response = {
			data: hotels.slice(skip, skip + pageSize),
			pagination: {
				page: pageNumber,
				total,
				pages: Math.ceil(total / pageSize),
			},
		}
		return res.status(200).json(response)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'Something went wrong' })
	}
}
