import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import testRoutes from './routes/test.route'
import usersRoutes from './routes/users.route'
import authRoutes from './routes/auth.route'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
})
const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', testRoutes)
app.use('/api/v1/auth/', authRoutes)
app.use('/api/v1/users/', usersRoutes)
app.use('/api/v1/my-hotels/', usersRoutes)

// Start the server
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`)
})
