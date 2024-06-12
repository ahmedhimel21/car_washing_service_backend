import { Router } from 'express'
import { BookingControllers } from './booking.controller'
import validateRequest from '../../middleware/validateRequest'
import { BookingValidations } from './booking.validation'
import auth from '../../middleware/auth'

const router = Router()

router.post(
  '/',
  validateRequest(BookingValidations.bookingCreateValidationSchema),
  BookingControllers.createBooking,
)

router.get('/', auth(), BookingControllers.getAllBookings)

export const BookingRoutes = router
