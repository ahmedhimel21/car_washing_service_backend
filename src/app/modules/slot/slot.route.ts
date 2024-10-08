import { Router } from 'express'
import { SlotControllers } from './slot.controller'
import validateRequest from '../../middleware/validateRequest'
import { SlotValidations } from './slot.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/slots',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.slotCreateValidationSchema),
  SlotControllers.createSlot,
)
router.put('/update/:id', auth(USER_ROLE.admin), SlotControllers.updateSlot)

router.get('/availability/:serviceId', SlotControllers.getAvailableSlots)

router.get('/', SlotControllers.getAllSlots)

export const SlotRoutes = router
