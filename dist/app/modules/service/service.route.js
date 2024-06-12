"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRoutes = void 0;
const express_1 = require("express");
const service_controller_1 = require("./service.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const service_validation_1 = require("./service.validation");
const router = (0, express_1.Router)();
//create service route
router.post('/', service_controller_1.ServiceControllers.createService);
//get specific service route
router.get('/:id', service_controller_1.ServiceControllers.getSpecificService);
//get all services route
router.get('/', service_controller_1.ServiceControllers.getAllServicesFromDB);
//update service route
router.put('/:id', (0, validateRequest_1.default)(service_validation_1.ServiceValidations.serviceUpdateValidationSchema), service_controller_1.ServiceControllers.updateService);
//delete service route
router.delete('/:id', service_controller_1.ServiceControllers.deleteService);
exports.ServiceRoutes = router;
