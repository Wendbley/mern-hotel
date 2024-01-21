import { Response, Request } from "express"
import multer from "multer"


export const AddHotel = async(req: Request, res: Response) => {
    const imageFiles = req.files as Express.Multer.File[] 
    console.log(req.body)
    res.status(200).json({message: "Hotel Added Successfully"})
}