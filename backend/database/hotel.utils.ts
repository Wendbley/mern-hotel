import { HotelType } from '../types'
import { db } from './db'

export const CreateHotel = async (hotel: any) => {
	console.log(hotel)
	const newHotel = await db.hotel.create({
		data: { ...hotel },
	})

	return newHotel
}

export const GetAllHotels = async (userId: string) => {
	const hotels = await db.hotel.findMany({
		where: {
			userId,
		},
	})
	return hotels
}

/**
 *
 * @param userId
 * @returns
 */
export const GetHotel = async (id: string, userId: string) => {
	const hotels = await db.hotel.findUnique({
		where: {
			id,
			userId,
		},
	})
	return hotels
}

/**
 *
 * @param id
 * @param hotel
 * @returns
 */
export const UpdateHotel = async (
	id: string,
	userId: string,
	hotel: HotelType
) => {
	const hotels = await db.hotel.update({
		where: {
			id,
			userId,
		},
		data: { ...hotel, },
	})
	return hotels
}
