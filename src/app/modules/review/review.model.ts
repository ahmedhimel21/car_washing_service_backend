import { model, Schema } from 'mongoose'
import { TReview } from './review.interface'

const reviewSchema = new Schema<TReview>({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
})

const Review = model<TReview>('review', reviewSchema)
export default Review
