import { HotelType } from "../types"
import { db } from "./db"

export const CreateHotel = async (hotel: HotelType) => { 
    const newHotel = await db.hotel.create({
        data: {...hotel},
    })
    
    return newHotel
}