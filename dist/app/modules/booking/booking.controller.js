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
exports.BookingControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { serviceId: service, slotId: slot, vehicleType, vehicleBrand, vehicleModel, manufacturingYear, registrationPlate, } = req.body;
    const modifiedObj = {
        service: service,
        slot: slot,
        vehicleType,
        vehicleBrand,
        vehicleModel,
        manufacturingYear,
        registrationPlate,
    };
    const result = yield (yield (yield (yield booking_service_1.BookingServices.createBookingIntoDB(modifiedObj, user)).populate('customer')).populate('service')).populate('slot');
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Booking successful',
        data: result,
    });
}));
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingServices.getAllBookingsFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: !result.length ? 404 : 200,
        success: !result.length ? false : true,
        message: !result.length
            ? 'No Data Found'
            : 'All bookings retrieved successfully',
        data: result,
    });
}));
const getUserBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield booking_service_1.BookingServices.getUserBookingsFromDB(user);
    //transformed bookings
    const transformedBookings = result.map(booking => ({
        _id: booking._id,
        service: {
            _id: booking.service._id,
            name: booking.service.name,
            description: booking.service.description,
            price: booking.service.price,
            duration: booking.service.duration,
            isDeleted: booking.service.isDeleted,
        },
        slot: {
            _id: booking.slot._id,
            service: booking.slot.service,
            date: booking.slot.date,
            startTime: booking.slot.startTime,
            endTime: booking.slot.endTime,
            isBooked: booking.slot.isBooked,
        },
        vehicleType: booking.vehicleType,
        vehicleBrand: booking.vehicleBrand,
        vehicleModel: booking.vehicleModel,
        manufacturingYear: booking.manufacturingYear,
        registrationPlate: booking.registrationPlate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
    }));
    (0, sendResponse_1.default)(res, {
        statusCode: !result.length ? 404 : 200,
        success: !result.length ? false : true,
        message: !result.length
            ? 'No Data Found'
            : 'User bookings retrieved successfully',
        data: transformedBookings,
    });
}));
exports.BookingControllers = {
    createBooking,
    getAllBookings,
    getUserBookings,
};
