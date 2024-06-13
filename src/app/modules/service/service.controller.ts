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
    statusCode: !result.length ? 404 : 200,
    success: !result.length ? false : true,
    message: !result.length
      ? 'No Data Found'
      : 'Services retrieved successfully',
    data: result,
  })
})

//get all services
const updateService = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ServiceServices.updateServiceIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service updated successfully',
    data: result,
  })
})

//delete service
const deleteService = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ServiceServices.deleteServiceFromDB(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  })
})

export const ServiceControllers = {
  createService,
  getSpecificService,
  getAllServicesFromDB,
  updateService,
  deleteService,
}
