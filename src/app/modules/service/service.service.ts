import AppError from '../../Error/AppError'
import { TService } from './service.interface'
import Service from './service.model'

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
  return result
}

export const ServiceServices = {
  createServiceIntoDB,
  getSpecificServiceFromDB,
  getAllServicesFromDB,
}
