import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { ServiceRoutes } from '../modules/service/service.route'
import { SlotRoutes } from '../modules/slot/slot.route'
import { BookingRoutes } from '../modules/booking/booking.route'
import { ReviewRoutes } from '../modules/review/review.route'
import { UserRoutes } from '../modules/user/user.routes'
import { PaymentRoutes } from '../modules/payment/payment.routes'

const router = Router()

const moduleRoutes = [
  {
    path: '/api/auth',
    route: AuthRoutes,
  },
  {
    path: '/api/services',
    route: ServiceRoutes,
  },
  {
    path: '/api/services',
    route: SlotRoutes,
  },
  {
    path: '/api/slots',
    route: SlotRoutes,
  },
  {
    path: '/api',
    route: BookingRoutes,
  },
  {
    path: '/api/review',
    route: ReviewRoutes,
  },
  {
    path: '/api/users',
    route: UserRoutes,
  },
  {
    path: '/api/payment',
    route: PaymentRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export const routes = router
