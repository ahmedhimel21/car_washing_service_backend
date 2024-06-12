import { Router } from 'express'
import { BookingControllers } from './booking.controller'
import validateRequest from '../../middleware/validateRequest'
import { BookingValidations } from './booking.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/',
  validateRequest(BookingValidations.bookingCreateValidationSchema),
  BookingControllers.createBooking,
)

router.get('/', auth(USER_ROLE.user), BookingControllers.getAllBookings)

export const BookingRoutes = router
