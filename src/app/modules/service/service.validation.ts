import { z } from 'zod'

const serviceCreateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    duration: z.number().min(0, 'Duration must be a positive number'),
    isDeleted: z.boolean().optional(),
  }),
})
const serviceUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    price: z.number().min(0, 'Price must be a positive number').optional(),
    duration: z
      .number()
      .min(0, 'Duration must be a positive number')
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
})

export const ServiceValidations = {
  serviceCreateValidationSchema,
  serviceUpdateValidationSchema,
}
