/* eslint-disable @typescript-eslint/no-explicit-any */
import buildQuery from '../../builder/queryBuilder'
import AppError from '../../Error/AppError'
import Service from '../service/service.model'
import { TSlot } from './slot.interface'
import Slot from './slot.model'
import createSlots from './slot.utility'

const createSlotIntoDB = async (payload: TSlot) => {
  const { startTime, endTime, date, service } = payload
  const serviceId: any = payload?.service
  const serviceInfo = await Service.isServiceExists(serviceId)
  //   check service available or not
  if (!serviceInfo) {
    throw new AppError(404, 'Service not found!')
  }
  //check service is deleted or not
  if (serviceInfo.isDeleted) {
    throw new AppError(400, "Can't create slots, service deleted!")
  }

  const slots = createSlots(startTime, endTime, date, service)

  const result = await Slot.create(slots)
  return result
}

const getAllSlotsFromDB = async (query: Record<string, unknown>) => {
  const searchAbleFields = ['date']
  const result = await buildQuery(
    Slot.find({ isBooked: 'available' }).populate('service'),
    query,
    searchAbleFields,
  )
  return !result.length ? 'No slots available at this moment!' : result
}

export const SlotServices = {
  createSlotIntoDB,
  getAllSlotsFromDB,
}
