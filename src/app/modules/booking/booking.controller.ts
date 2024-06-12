import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { BookingServices } from './booking.service'

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking successful',
    data: result,
  })
})

export const BookingControllers = {
  createBooking,
}
