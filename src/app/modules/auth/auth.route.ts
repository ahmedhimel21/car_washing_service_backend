import { Router } from 'express'
import { AuthControllers } from './auth.controller'

const router = Router()

router.post('/signup', AuthControllers.registeredUser)

export const AuthRoutes = router
