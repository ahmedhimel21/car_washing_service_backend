"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRoutes = void 0;
const express_1 = require("express");
const slot_controller_1 = require("./slot.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const slot_validation_1 = require("./slot.validation");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post('/slots', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(slot_validation_1.SlotValidations.slotCreateValidationSchema), slot_controller_1.SlotControllers.createSlot);
router.put('/update/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), slot_controller_1.SlotControllers.updateSlot);
router.get('/availability/:serviceId', slot_controller_1.SlotControllers.getAvailableSlots);
router.get('/', slot_controller_1.SlotControllers.getAllSlots);
exports.SlotRoutes = router;
