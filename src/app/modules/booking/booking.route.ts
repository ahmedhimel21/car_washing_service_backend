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

export const BookingRoutes = router
