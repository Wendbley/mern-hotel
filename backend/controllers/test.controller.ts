import { Request, Response } from "express";

export const Test = async( req: Request, res: Response) => {
    console.log(req.body)
    res.status(200).json({message: "Test Successfull"})
}