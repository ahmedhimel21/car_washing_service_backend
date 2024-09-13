import catchAsync from '../../utility/catchAsync'
import sendResponse from '../../utility/sendResponse'
import { ReviewServices } from './review.services'

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReviewIntoDB(req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Review created successfully',
    data: result,
  })
})

const getAllReviewsFromDB = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB()
  sendResponse(res, {
    statusCode: !result.length ? 404 : 200,
    success: !result.length ? false : true,
    message: !result.length
      ? 'No Data Found'
      : 'Reviews retrieved successfully',
    data: result,
  })
})

export const ReviewController = {
  createReview,
  getAllReviewsFromDB,
}
