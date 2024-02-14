import express, { Request, Response } from 'express'
import cors from 'cors'
import 'dotenv/config'
import testRoutes from './routes/test.route'
import usersRoutes from './routes/users.route'
import authRoutes from './routes/auth.route'
import myHotelsRoutes from './routes/myHotels.route'
import hotelsRoutes from './routes/hotels.route'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'
import path from 'path'


/**
 * Initalize Cloudinary Storage
 */
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Init express
const app = express()

// Middlewares: third-party middleware
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))


// Serve static files
app.use(express.static(path.join(__dirname, '../../frontend/dist')))


// Custom middlewares: Routes
app.use('/api/v1/', testRoutes)
app.use('/api/v1/auth/', authRoutes)
app.use('/api/v1/users/', usersRoutes)
app.use('/api/v1/my-hotels/', myHotelsRoutes)
app.use('/api/v1/hotels/', hotelsRoutes)



// Serve static files
app.get('*', (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})


// Start the server
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`)
})
