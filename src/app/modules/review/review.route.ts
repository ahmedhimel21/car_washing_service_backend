import { Router } from 'express'
import { ReviewController } from './review.controller'

const router = Router()

router.post('/', ReviewController.createReview)

router.get('/', ReviewController.getAllReviewsFromDB)

export const ReviewRoutes = router
