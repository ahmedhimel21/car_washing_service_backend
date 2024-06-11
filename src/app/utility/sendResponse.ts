import { Response } from 'express'
import { TData } from '../interface/sendResponse.interface'

const sendResponse = <T>(res: Response, data: TData<T>) => {
  return res.status(200).json({
    success: data?.success,
    message: data?.message,
    data: data?.data,
  })
}

export default sendResponse
