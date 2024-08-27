import config from '../../config'
import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { AuthServices } from './auth.service'

//signup user
const registeredUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registeredUserIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

//login user
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)
  const { accessToken, user, refreshToken } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully!',
    data: {
      accessToken,
      user,
    },
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  })
})

export const AuthControllers = {
  registeredUser,
  loginUser,
  refreshToken,
}
