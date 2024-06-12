import { Router } from 'express'
import { ServiceControllers } from './service.controller'
import validateRequest from '../../middleware/validateRequest'
import { ServiceValidations } from './service.validation'

const router = Router()

//create service route
router.post('/', ServiceControllers.createService)

//get specific service route
router.get('/:id', ServiceControllers.getSpecificService)

//get all services route
router.get('/', ServiceControllers.getAllServicesFromDB)

//update service route
router.put(
  '/:id',
  validateRequest(ServiceValidations.serviceUpdateValidationSchema),
  ServiceControllers.updateService,
)

//delete service route
router.delete('/:id', ServiceControllers.deleteService)

export const ServiceRoutes = router
