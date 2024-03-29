export type UserType = {
	id: string
	email: string
	password: string
	firstName: string
	lastName: string
}

export type HotelType = {
	id: string
	userId: string
	name: string
	city: string
	country: string
	description: string
	type: string
	adultCount: number
	chidlCount: number
	facilities: string[]
	pricePerNight: number
	starRating: number
	imageUrls: string[]
	lastUpdated: Date
}

export type SearchHotelType = {
	hotels: HotelType[]
	pagination: {
		page: number
		total: number
		pages: number
	}
}
