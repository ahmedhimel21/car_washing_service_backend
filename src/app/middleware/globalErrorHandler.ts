/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { TErrorMessages } from '../interface/error.interface'
import handleValidationError from '../Error/mongooseValidationError'
import config from '../config'
import handleDuplicateError from '../Error/handleDuplicateError'
import handleCastError from '../Error/handleCastError'
import { ZodError } from 'zod'
import handleZodValidationError from '../Error/handleZodValidationError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Check if headers are already sent to prevent setting them again
  if (res.headersSent) {
    return next(err)
  }

  let statusCode = err?.statusCode || 500
  let message = err?.message || 'Something went wrong'
  let errorMessages: TErrorMessages = [
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
    errorMessages = simplifiedErrorResponse.errorSources
  } else if (err?.code === 11000) {
    const simplifiedErrorResponse = handleDuplicateError(err)
    statusCode = simplifiedErrorResponse.statusCode
    message = simplifiedErrorResponse.message
    errorMessages = simplifiedErrorResponse.errorSources
  } else if (err?.name === 'CastError') {
    const simplifiedErrorResponse = handleCastError(err)
    statusCode = simplifiedErrorResponse.statusCode
    message = simplifiedErrorResponse.message
    errorMessages = simplifiedErrorResponse.errorSources
  } else if (err instanceof ZodError) {
    const simplifiedErrorResponse = handleZodValidationError(err)
    statusCode = simplifiedErrorResponse.statusCode
    message = simplifiedErrorResponse.message
    errorMessages = simplifiedErrorResponse.errorSources
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
}

export default globalErrorHandler
