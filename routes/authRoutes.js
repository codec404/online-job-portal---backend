import express from 'express'
import { registerController, loginController } from '../controllers/authController.js'

//router object
const router = express.Router()

//register routes
router.post('/register',registerController)

//login routes
router.post('/login',loginController)

export default router