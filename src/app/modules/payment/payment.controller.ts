import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { PaymentService } from './payment.service'

const createPayment = catchAsync(async (req, res) => {
  const result = await PaymentService.createPayment(req.body)
  sendResponse(res, {
    success: true,
    message: 'Payment url get succesfully',
    statusCode: 200,
    data: result,
  })
})
export const PaymentController = {
  createPayment,
}
