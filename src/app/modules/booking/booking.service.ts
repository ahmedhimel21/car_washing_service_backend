/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../Error/AppError'
import Service from '../service/service.model'
import Slot from '../slot/slot.model'
import User from '../user/user.model'
import { TBooking } from './booking.interface'
import Booking from './booking.model'

const createBookingIntoDB = async (payload: TBooking) => {
  const isCustomerExists = await User.findById(payload?.customer)
  if (!isCustomerExists) {
    throw new AppError(404, 'Customer not found!')
  }
  const serviceId: any = payload?.service
  const service = await Service.isServiceExists(serviceId)
  if (!service) {
    throw new AppError(404, 'Service not found!')
  }
  if (service.isDeleted) {
    throw new AppError(400, 'Unable to book, service is deleted')
  }
  const isSlotExists = await Slot.findById(payload.slot)
  if (!isSlotExists) {
    throw new AppError(404, 'Slot not found!')
  }
  if (isSlotExists.isBooked === 'booked') {
    throw new AppError(404, 'Slot is booked!')
  }
  const result = (
    await (
      await (await Booking.create(payload)).populate('customer')
    ).populate('service')
  ).populate('slot')
  return result
}

export const BookingServices = {
  createBookingIntoDB,
}
