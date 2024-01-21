import express from 'express'
import { Test } from '../controllers/test.controller'

const router = express.Router()

router.get('/test', Test)

export default router