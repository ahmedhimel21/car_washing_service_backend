import { z } from 'zod'
import { vehicleTypesEnum } from './booking.constant'

const bookingCreateValidationSchema = z.object({
  body: z.object({
    customer: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .optional(),
    serviceId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    slotId: z.string().regex(/^[0-9a-fA-F]{24}$/),
    vehicleType: z.enum(vehicleTypesEnum),
    vehicleModel: z.string().min(1),
    manufacturingYear: z.number(),
    registrationPlate: z.string().min(1),
  }),
})

export const BookingValidations = {
  bookingCreateValidationSchema,
}
