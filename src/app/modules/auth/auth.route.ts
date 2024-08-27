import { Router } from 'express'
import { AuthControllers } from './auth.controller'
import validateRequest from '../../middleware/validateRequest'
import { UserValidations } from '../user/user.validation'
import { AuthValidations } from './auth.validation'

const router = Router()

router.post(
  '/signup',
  validateRequest(UserValidations.userCreateValidationSchema),
  AuthControllers.registeredUser,
)

router.post(
  '/login',
  validateRequest(AuthValidations.loginUserValidationSchema),
  AuthControllers.loginUser,
)

router.post('/refreshToken', validateRequest(AuthValidations.refreshTokenValidationSchema), AuthControllers.refreshToken)

export const AuthRoutes = router
