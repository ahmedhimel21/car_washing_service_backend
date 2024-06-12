import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { SlotServices } from './slot.service'

const createSlot = catchAsync(async (req, res) => {
  const result = await SlotServices.createSlotIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Slot has been created successfully',
    data: result,
  })
})

export const SlotControllers = {
  createSlot,
}
