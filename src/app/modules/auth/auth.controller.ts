import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { AuthServices } from './auth.service'

const registeredUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registeredUserIntoDB(req.body)
  // const { name, email, phone, role, address, _id } = result
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

export const AuthControllers = {
  registeredUser,
}
