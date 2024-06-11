/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { TErrorSources } from '../interface/error.interface'
import handleValidationError from '../Error/mongooseValidationError'
import config from '../config'
import handleDuplicateError from '../Error/handleDuplicateError'
import handleError from '../Error/handleError'
import AppError from '../Error/AppError'
import handleCastError from '../Error/handleCastError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Check if headers are already sent to prevent setting them again
  if (res.headersSent) {
    return next(err)
  }

  let statusCode = err?.statusCode || 500
  let message = err?.message || 'Something went wrong'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ]
  /**
   * error patterns
   * success: boolean
   * message: string
   * errorSources
   */
  if (err?.name === 'ValidationError') {
    const simplifiedErrorResponse = handleValidationError(err)
    statusCode = simplifiedErrorResponse.statusCode
    message = simplifiedErrorResponse.message
    errorSources = simplifiedErrorResponse.errorSources
  } else if (err?.code === 11000) {
    const simplifiedErrorResponse = handleDuplicateError(err)
    statusCode = simplifiedErrorResponse.statusCode
    message = simplifiedErrorResponse.message
    errorSources = simplifiedErrorResponse.errorSources
  } else if (err?.name === 'CastError') {
    const simplifiedErrorResponse = handleCastError(err)
    statusCode = simplifiedErrorResponse.statusCode
    message = simplifiedErrorResponse.message
    errorSources = simplifiedErrorResponse.errorSources
  }
  // else if (err instanceof Error) {
  //   const simplifiedErrorResponse = handleError()
  //   statusCode = simplifiedErrorResponse.statusCode
  //   errorSources = simplifiedErrorResponse.errorSources
  // }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler
