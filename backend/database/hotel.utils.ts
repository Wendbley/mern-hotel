import { HotelType } from "../types"
import { db } from "./db"

export const CreateHotel = async (hotel: any) => { 
    console.log(hotel)
    const newHotel = await db.hotel.create({
        data: {...hotel},
    })
    
    return newHotel
}