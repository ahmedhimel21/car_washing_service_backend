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
//get all slots from db
const getAllSlots = catchAsync(async (req, res) => {
  const query = req.query
  const result = await SlotServices.getAllSlotsFromDB(query)
  sendResponse(res, {
    statusCode: !result.length ? 404 : 200,
    success: !result.length ? false : true,
    message: !result.length
      ? 'No Data Found'
      : 'Available slots retrieved successfully',
    data: result,
  })
})

export const SlotControllers = {
  createSlot,
  getAllSlots,
}
