import { Router } from 'express'
import { ServiceControllers } from './service.controller'

const router = Router()

router.post('/', ServiceControllers.createService)

export const ServiceRoutes = router
