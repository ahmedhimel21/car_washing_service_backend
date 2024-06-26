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
  const result = await (
    await (
      await (
        await BookingServices.createBookingIntoDB(modifiedObj, user)
      ).populate('customer')
    ).populate('service')
  ).populate('slot')
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
  //transformed bookings
  const transformedBookings = result.map(booking => ({
    _id: booking._id,
    service: {
      _id: booking.service._id,
      name: booking.service.name,
      description: booking.service.description,
      price: booking.service.price,
      duration: booking.service.duration,
      isDeleted: booking.service.isDeleted,
    },
    slot: {
      _id: booking.slot._id,
      service: booking.slot.service,
      date: booking.slot.date,
      startTime: booking.slot.startTime,
      endTime: booking.slot.endTime,
      isBooked: booking.slot.isBooked,
    },
    vehicleType: booking.vehicleType,
    vehicleBrand: booking.vehicleBrand,
    vehicleModel: booking.vehicleModel,
    manufacturingYear: booking.manufacturingYear,
    registrationPlate: booking.registrationPlate,
    createdAt: booking.createdAt,
    updatedAt: booking.updatedAt,
  }))
  sendResponse(res, {
    statusCode: !result.length ? 404 : 200,
    success: !result.length ? false : true,
    message: !result.length
      ? 'No Data Found'
      : 'User bookings retrieved successfully',
    data: transformedBookings,
  })
})

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
}
