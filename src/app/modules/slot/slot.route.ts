import { Router } from 'express'
import { SlotControllers } from './slot.controller'
import validateRequest from '../../middleware/validateRequest'
import { SlotValidations } from './slot.validation'

const router = Router()

router.post(
  '/slots',
  validateRequest(SlotValidations.slotCreateValidationSchema),
  SlotControllers.createSlot,
)

router.get('/availability', SlotControllers.getAllSlots)

export const SlotRoutes = router
