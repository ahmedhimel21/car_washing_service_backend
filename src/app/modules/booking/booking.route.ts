import { Router } from 'express'
import { BookingControllers } from './booking.controller'
import validateRequest from '../../middleware/validateRequest'
import { BookingValidations } from './booking.validation'

const router = Router()

router.post(
  '/',
  validateRequest(BookingValidations.bookingCreateValidationSchema),
  BookingControllers.createBooking,
)

router.get('/', BookingControllers.getAllBookings)

export const BookingRoutes = router
