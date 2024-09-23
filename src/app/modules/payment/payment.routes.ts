import { Router } from 'express'
import { PaymentController } from './payment.controller'

const router = Router()

router.post('/confirmation', PaymentController.paymentConfirmation)

export const PaymentRoutes = router
