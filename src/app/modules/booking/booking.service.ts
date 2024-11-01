/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken'
import AppError from '../../Error/AppError'
import Service from '../service/service.model'
import Slot from '../slot/slot.model'
import { TBooking } from './booking.interface'
import Booking from './booking.model'
import User from '../user/user.model'
import mongoose from 'mongoose'
import { IService, ISlot } from './booking.type'
import axios from 'axios'
import verifyPayment from '../payment/payment.utils'

const createBookingIntoDB = async (
  payload: TBooking,
  user: JwtPayload,
  formData: any,
) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    //find user from db
    const customer = await User.findOne({ email: user?.userEmail })
    const customerId = customer?._id
    //check user is exists or not
    if (!customer) {
      throw new AppError(404, 'Customer not found')
    }
    //check is service exists or not
    const serviceId: any = payload?.service
    const service = await Service.isServiceExists(serviceId)
    if (!service) {
      throw new AppError(404, 'Service not found!')
    }
    // check service deleted or not
    if (service.isDeleted) {
      throw new AppError(400, 'Unable to book, service is deleted')
    }
    //check slots exists or not
    const isSlotExists = await Slot.findById(payload.slot)
    if (!isSlotExists) {
      throw new AppError(404, 'Slot not found!')
    }
    //check slots is booked or available
    if (isSlotExists.isBooked === 'booked') {
      throw new AppError(404, 'Slot is already booked!')
    }
    // make payment

    const { data } = await axios.post(
      'https://sandbox.aamarpay.com/jsonpost.php',
      formData,
    )
    if (data.result) {
      //creating booking- transaction-1
      const [booking] = await Booking.create(
        [{ ...payload, customer: customerId }],
        { session },
      )
    }
    const verifyResponse = await verifyPayment(formData?.tran_id)
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
      //updating slot status: transaction-2
      await Slot.findByIdAndUpdate(
        payload.slot,
        { isBooked: 'booked' },
        { new: true, session },
      )
    }

    await session.commitTransaction()
    await session.endSession()
    return data
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw err
  }
}

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate('customer')
    .populate('service')
    .populate('slot')
  return !result.length ? [] : result
}

const getUserBookingsFromDB = async (user: JwtPayload) => {
  const customer = await User.findOne({ email: user?.userEmail })
  const customerId = customer?._id
  const result = await Booking.find({ customer: customerId })
    .populate<{ service: IService }>('service')
    .populate<{ slot: ISlot }>('slot')
    .lean()

  return !result.length ? [] : result
}

//get most booked service
const getMostBookedServiceFromDB = async () => {
  const result = await Booking.aggregate([
    {
      $group: {
        _id: '$service',
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'services', // Assuming you have a `services` collection
        localField: '_id',
        foreignField: '_id',
        as: 'serviceDetails',
      },
    },
    {
      $unwind: '$serviceDetails',
    },
    {
      $project: {
        _id: 0,
        serviceName: '$serviceDetails.name',
        count: 1,
      },
    },
    {
      $sort: { count: -1 }, // Sort by the most booked services
    },
  ])
  return result
}

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  getMostBookedServiceFromDB,
}
