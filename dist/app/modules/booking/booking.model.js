"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const booking_constant_1 = require("./booking.constant");
const bookingSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'service',
    },
    slot: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'slot',
    },
    vehicleType: {
        type: String,
        enum: booking_constant_1.vehicleTypesEnum,
        required: true,
    },
    vehicleModel: {
        type: String,
        required: true,
    },
    manufacturingYear: {
        type: Number,
        required: true,
    },
    registrationPlate: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });
const Booking = (0, mongoose_1.model)('booking', bookingSchema);
exports.default = Booking;
