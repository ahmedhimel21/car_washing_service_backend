import config from '../../config'
import AppError from '../../Error/AppError'
import { TUser } from '../user/user.interface'
import User from '../user/user.model'
import { TLoginUser } from './auth.interface'
import status from 'http-status'
import bcrypt from 'bcrypt'
import { createToken } from './auth.utils'

const registeredUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload)
  return result
}

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password')
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
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  )
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user,
  }
}

export const AuthServices = {
  registeredUserIntoDB,
  loginUser,
}
