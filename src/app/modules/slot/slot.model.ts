import { model, Schema } from 'mongoose'
import { TSlot } from './slot.interface'
import { bookedEnum } from './slot.constant'

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'service',
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: bookedEnum,
      required: true,
    },
  },
  { timestamps: true },
)

const Slot = model<TSlot>('slot', slotSchema)
export default Slot
