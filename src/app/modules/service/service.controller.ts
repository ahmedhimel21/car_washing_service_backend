import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { ServiceServices } from './service.service'

const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createServiceIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service created successfully',
    data: result,
  })
})

export const ServiceControllers = {
  createService,
}
