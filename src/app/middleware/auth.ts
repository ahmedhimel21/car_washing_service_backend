import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utility/catchAsync'
import AppError from '../Error/AppError'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]
    //check is token came from client
    if (!token) {
      throw new AppError(401, 'You are not authorized')
    }
    const decoded = jwt.verify(token, config.jwt_access_secret as string)
    req.user = decoded as JwtPayload
    next()
  })
}

export default auth
