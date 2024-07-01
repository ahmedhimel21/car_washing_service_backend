import { ObjectId } from 'mongoose'

export interface IService {
  _id: ObjectId
  name: string
  description: string
  price: number
  duration: number
  isDeleted: boolean
}

export interface ISlot {
  _id: ObjectId
  service: ObjectId
  date: string
  startTime: string
  endTime: string
  isBooked: string
}

export interface IBooking {
  _id: ObjectId
  customer: ObjectId
  service: IService
  slot: ISlot
  vehicleType: string
  vehicleBrand?: string
  vehicleModel: string
  manufacturingYear: number
  registrationPlate: string
  createdAt: Date
  updatedAt: Date
}
