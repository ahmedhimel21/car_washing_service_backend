import { model, Schema } from 'mongoose'
import { TUser } from './user.interface'
import { nameEnum } from './user.constant'

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: nameEnum,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const User = model<TUser>('user', userSchema)
export default User
