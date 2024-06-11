import { Router } from 'express'
import { AuthControllers } from './auth.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidations } from '../user/user.validation'

const router = Router()

router.post(
  '/signup',
  validateRequest(UserValidations.userCreateValidationSchema),
  AuthControllers.registeredUser,
)

export const AuthRoutes = router
