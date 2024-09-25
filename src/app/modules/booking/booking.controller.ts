import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { TBooking } from './booking.interface'
import { BookingServices } from './booking.service'
import crypto from 'crypto'

const createBooking = catchAsync(async (req, res) => {
  const user = req.user
  const {
    cus_name,
    cus_email,
    cus_phone,
    amount,
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
    transactionId: crypto.randomBytes(16).toString('hex'),
    status: 'pending',
    paymentStatus: 'pending',
  }

  const modifiedPaymentObj = {
    cus_name,
    cus_email,
    cus_phone,
    amount,
    tran_id: modifiedObj?.transactionId,
    signature_key: 'dbb74894e82415a2f7ff0ec3a97e4183',
    store_id: 'aamarpaytest',
    currency: 'BDT',
    desc: 'Service Booking',
    cus_add1: 'N/A',
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_country: 'Bangladesh',
    success_url: `https://car-washing-backend.vercel.app/api/payment/confirmation?transactionId=${modifiedObj?.transactionId}&status=success`,
    fail_url: `https://car-washing-backend.vercel.app/api/payment/confirmation?status=failed`,
    cancel_url: `http://localhost:5173`,
    type: 'json',
  }

  const result = await BookingServices.createBookingIntoDB(
    modifiedObj,
    user,
    modifiedPaymentObj,
  )
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

//get most booked service
const getMostBookedService = catchAsync(async (req, res) => {
  const result = await BookingServices.getMostBookedServiceFromDB()
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Most booked service data retrieved succesfully',
    data: result,
  })
})

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getUserBookings,
  getMostBookedService,
}
