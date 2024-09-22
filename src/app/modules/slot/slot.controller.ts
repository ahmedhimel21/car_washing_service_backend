import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { SlotServices } from './slot.service'

//create slots
const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Slots created successfully',
    data: result,
  })
})
//get available slots
const getAvailableSlots = catchAsync(async (req, res) => {
  const { serviceId } = req.params
  const query = req.query
  const result = await SlotServices.getAvailableSlotsFromDB(query, serviceId)
  sendResponse(res, {
    statusCode: !result.length ? 404 : 200,
    success: !result.length ? false : true,
    message: !result.length
      ? 'No Data Found'
      : 'Available slots retrieved successfully',
    data: result,
  })
})

//get all slots from db (with some query)
const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlotsFromDB()
  sendResponse(res, {
    statusCode: !result.length ? 404 : 200,
    success: !result.length ? false : true,
    message: !result.length
      ? 'No Data Found'
      : 'Available slots retrieved successfully',
    data: result,
  })
})

//update slots
const updateSlot = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await SlotServices.updateSlotIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Slot updated successfully',
    data: result,
  })
})

export const SlotControllers = {
  createSlot,
  getAvailableSlots,
  getAllSlots,
  updateSlot,
}
