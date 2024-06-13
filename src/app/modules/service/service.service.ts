import AppError from '../../Error/AppError'
import { TService } from './service.interface'
import Service from './service.model'
import status from 'http-status'

//create service
const createServiceIntoDB = async (payload: TService) => {
  const result = await Service.create(payload)
  return result
}

//get single service
const getSpecificServiceFromDB = async (id: string) => {
  const result = await Service.findById(id)
  //check result
  if (!result) {
    throw new AppError(404, 'Service not found!')
  }
  return result
}

//get all services
const getAllServicesFromDB = async () => {
  const result = await Service.find()
  return !result.length ? [] : result
}

//update service
const updateServiceIntoDB = async (id: string, payload: Partial<TService>) => {
  const service = await Service.isServiceExists(id)
  //check isService exists
  if (!service) {
    throw new AppError(status.NOT_FOUND, 'Service not found!')
  }

  const result = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

//delete service
const deleteServiceFromDB = async (id: string) => {
  const service = await Service.isServiceExists(id)
  //check isService exists
  if (!service) {
    throw new AppError(status.NOT_FOUND, 'Service not found!')
  }
  //check is service deleted
  if (service?.isDeleted) {
    throw new AppError(status.NOT_FOUND, 'Service already deleted!')
  }
  const result = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const ServiceServices = {
  createServiceIntoDB,
  getSpecificServiceFromDB,
  getAllServicesFromDB,
  updateServiceIntoDB,
  deleteServiceFromDB,
}
