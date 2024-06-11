import { TErrorSources } from '../interface/error.interface'

const handleError = () => {
  const statusCode = 400
  const message = ''
  const errorSources: TErrorSources = [
    {
      path: 'throw Error || throw AppError',
      message: 'Error occurred',
    },
  ]
  return {
    statusCode,
    message,
    errorSources,
  }
}
export default handleError
