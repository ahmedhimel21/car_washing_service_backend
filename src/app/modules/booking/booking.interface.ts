import { Types } from 'mongoose'

export type TVehicleTypes =
  | 'car'
  | ' truck'
  | 'SUV'
  | 'van'
  | 'motorcycle'
  | ' bus'
  | 'electricVehicle'
  | ' hybridVehicle'
  | ' bicycle'
  | ' tractor'

export type TBooking = {
  customer?: Types.ObjectId
  service: Types.ObjectId
  slot: Types.ObjectId
  vehicleType: TVehicleTypes
  transactionId: string
  status: string
  paymentStatus: string
  cus_name?: string
  cus_email?: string
  cus_phone?: string
  amount?: number
  vehicleBrand: string
  vehicleModel: string
  manufacturingYear: number
  registrationPlate: string
  createdAt?: Date
  updatedAt?: Date
}
