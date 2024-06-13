import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { TBooking } from './booking.interface'
import { BookingServices } from './booking.service'

const createBooking = catchAsync(async (req, res) => {
  const user = req.user
  const {
    serviceId: service,
    slotId: slot,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = req.body

  const modifiedObj: TBooking = {
    service: service,
    slot: slot,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  }
  const result = await BookingServices.createBookingIntoDB(modifiedObj, user)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking successful',
    data: result,
  })
})

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB()
  sendResponse(res, {
    statusCode: !result.length ? 404 : 200,
    success: !result.length ? false : true,
    message: !result.length
      ? 'No Data Found'
      : 'All bookings retrieved successfully',
    data: result,
  })
})

const getUserBookings = catchAsync(async (req, res) => {
  const user = req.user
  const result = await BookingServices.getUserBookingsFromDB(user)
  sendResponse(res, {
    statusCode: !result.length ? 404 : 200,
    success: !result.length ? false : true,
    message: !result.length
      ? 'No Data Found'
      : 'User bookings retrieved successfully',
    data: result,
  })
})

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
}
