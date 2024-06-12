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
const router = (0, express_1.Router)();
router.post('/slots', (0, validateRequest_1.default)(slot_validation_1.SlotValidations.slotCreateValidationSchema), slot_controller_1.SlotControllers.createSlot);
router.get('/availability', slot_controller_1.SlotControllers.getAllSlots);
exports.SlotRoutes = router;
