import { model, Schema } from 'mongoose'
import { ServiceModel, TService } from './service.interface'

const serviceSchema = new Schema<TService, ServiceModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

//isServiceExists statics method
serviceSchema.statics.isServiceExists = async function (id: string) {
  return await Service.findById(id)
}

const Service = model<TService, ServiceModel>('service', serviceSchema)
export default Service
