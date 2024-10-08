import { model, Schema } from 'mongoose'
import { TBooking } from './booking.interface'
import { vehicleTypesEnum } from './booking.constant'

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'service',
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'slot',
    },
    vehicleType: {
      type: String,
      enum: vehicleTypesEnum,
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
    },
    paymentStatus: {
      type: String,
    },
  },
  { timestamps: true },
)

bookingSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.customer.role
  return obj
}

const Booking = model<TBooking>('booking', bookingSchema)
export default Booking
