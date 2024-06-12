import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { ServiceServices } from './service.service'

// create service
const createService = catchAsync(async (req, res) => {
  const result = await ServiceServices.createServiceIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service created successfully',
    data: result,
  })
})
//get single service
const getSpecificService = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ServiceServices.getSpecificServiceFromDB(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service retrieved successfully',
    data: result,
  })
})

//get all services
const getAllServicesFromDB = catchAsync(async (req, res) => {
  const result = await ServiceServices.getAllServicesFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Services retrieved successfully',
    data: result,
  })
})

export const ServiceControllers = {
  createService,
  getSpecificService,
  getAllServicesFromDB,
}
