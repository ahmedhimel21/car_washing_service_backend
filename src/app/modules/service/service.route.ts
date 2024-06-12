import { Router } from 'express'
import { ServiceControllers } from './service.controller'

const router = Router()

//create service route
router.post('/', ServiceControllers.createService)

//get specific service route
router.get('/:id', ServiceControllers.getSpecificService)

//get all services route
router.get('/', ServiceControllers.getAllServicesFromDB)

export const ServiceRoutes = router
