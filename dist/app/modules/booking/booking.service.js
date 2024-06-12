"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const AppError_1 = __importDefault(require("../../Error/AppError"));
const service_model_1 = __importDefault(require("../service/service.model"));
const slot_model_1 = __importDefault(require("../slot/slot.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const createBookingIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCustomerExists = yield user_model_1.default.findById(payload === null || payload === void 0 ? void 0 : payload.customer);
    if (!isCustomerExists) {
        throw new AppError_1.default(404, 'Customer not found!');
    }
    const serviceId = payload === null || payload === void 0 ? void 0 : payload.service;
    const service = yield service_model_1.default.isServiceExists(serviceId);
    if (!service) {
        throw new AppError_1.default(404, 'Service not found!');
    }
    if (service.isDeleted) {
        throw new AppError_1.default(400, 'Unable to book, service is deleted');
    }
    const isSlotExists = yield slot_model_1.default.findById(payload.slot);
    if (!isSlotExists) {
        throw new AppError_1.default(404, 'Slot not found!');
    }
    if (isSlotExists.isBooked === 'booked') {
        throw new AppError_1.default(404, 'Slot is booked!');
    }
    const result = (yield (yield (yield booking_model_1.default.create(payload)).populate('customer')).populate('service')).populate('slot');
    return result;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.find()
        .populate('customer')
        .populate('service')
        .populate('slot');
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
};
