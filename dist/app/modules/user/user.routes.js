"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("./user.constant");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.getAllUser);
router.put('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserController.updateUserRole);
router.put('/update/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), user_controller_1.UserController.updateUserProfile);
exports.UserRoutes = router;
