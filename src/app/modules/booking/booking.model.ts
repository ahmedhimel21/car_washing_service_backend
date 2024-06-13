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
      unique: true,
    },
  },
  { timestamps: true },
)

const Booking = model<TBooking>('booking', bookingSchema)
export default Booking
