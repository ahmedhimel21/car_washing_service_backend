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
const AppError_1 = __importDefault(require("../../Error/AppError"));
const service_model_1 = __importDefault(require("../service/service.model"));
const slot_model_1 = __importDefault(require("../slot/slot.model"));
const booking_model_1 = __importDefault(require("./booking.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const axios_1 = __importDefault(require("axios"));
const createBookingIntoDB = (payload, user, formData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //find user from db
        const customer = yield user_model_1.default.findOne({ email: user === null || user === void 0 ? void 0 : user.userEmail });
        const customerId = customer === null || customer === void 0 ? void 0 : customer._id;
        //check user is exists or not
        if (!customer) {
            throw new AppError_1.default(404, 'Customer not found');
        }
        //check is service exists or not
        const serviceId = payload === null || payload === void 0 ? void 0 : payload.service;
        const service = yield service_model_1.default.isServiceExists(serviceId);
        if (!service) {
            throw new AppError_1.default(404, 'Service not found!');
        }
        // check service deleted or not
        if (service.isDeleted) {
            throw new AppError_1.default(400, 'Unable to book, service is deleted');
        }
        //check slots exists or not
        const isSlotExists = yield slot_model_1.default.findById(payload.slot);
        if (!isSlotExists) {
            throw new AppError_1.default(404, 'Slot not found!');
        }
        //check slots is booked or available
        if (isSlotExists.isBooked === 'booked') {
            throw new AppError_1.default(404, 'Slot is already booked!');
        }
        // make payment
        const { data } = yield axios_1.default.post('https://sandbox.aamarpay.com/jsonpost.php', formData);
        if (data.result) {
            //creating booking- transaction-1
            const [booking] = yield booking_model_1.default.create([Object.assign(Object.assign({}, payload), { customer: customerId })], { session });
        }
        //updating slot status: transaction-2
        yield slot_model_1.default.findByIdAndUpdate(payload.slot, { isBooked: 'booked' }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return data;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.find()
        .populate('customer')
        .populate('service')
        .populate('slot');
    return !result.length ? [] : result;
});
const getUserBookingsFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield user_model_1.default.findOne({ email: user === null || user === void 0 ? void 0 : user.userEmail });
    const customerId = customer === null || customer === void 0 ? void 0 : customer._id;
    const result = yield booking_model_1.default.find({ customer: customerId })
        .populate('service')
        .populate('slot')
        .lean();
    return !result.length ? [] : result;
});
//get most booked service
const getMostBookedServiceFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.aggregate([
        {
            $group: {
                _id: '$service',
                count: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: 'services', // Assuming you have a `services` collection
                localField: '_id',
                foreignField: '_id',
                as: 'serviceDetails',
            },
        },
        {
            $unwind: '$serviceDetails',
        },
        {
            $project: {
                _id: 0,
                serviceName: '$serviceDetails.name',
                count: 1,
            },
        },
        {
            $sort: { count: -1 }, // Sort by the most booked services
        },
    ]);
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getUserBookingsFromDB,
    getMostBookedServiceFromDB,
};
