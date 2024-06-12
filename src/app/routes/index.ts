import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { ServiceRoutes } from '../modules/service/service.route'
import { SlotRoutes } from '../modules/slot/slot.route'
import { BookingRoutes } from '../modules/booking/booking.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/services',
    route: SlotRoutes,
  },
  {
    path: '/slots',
    route: SlotRoutes,
  },
  {
    path: '/booking',
    route: BookingRoutes,
  },
]

moduleRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export const routes = router
