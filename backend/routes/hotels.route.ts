import express from 'express'
import { SearchHotels } from '../controllers/hotels.controller'


const router = express.Router()

router.get('/search', SearchHotels)



export default router