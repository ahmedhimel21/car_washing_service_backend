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
  return result
}

export const ServiceServices = {
  createServiceIntoDB,
  getSpecificServiceFromDB,
}
