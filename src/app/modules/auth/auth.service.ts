import config from '../../config'
import AppError from '../../Error/AppError'
import { TUser } from '../user/user.interface'
import User from '../user/user.model'
import { TLoginUser } from './auth.interface'
import status from 'http-status'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const registeredUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)
  return result
}

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email })
  // check user exists
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'User does not exists!')
  }
  // check password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  )
  if (!isPasswordMatched) {
    throw new AppError(400, 'Password do not matched!')
  }
  const jwtPayload = {
    userEmail: user?.email,
    role: user?.role,
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '2d',
  })
  return {
    accessToken,
    user,
  }
}

export const AuthServices = {
  registeredUserIntoDB,
  loginUser,
}
