"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slot_constant_1 = require("./slot.constant");
const slotSchema = new mongoose_1.Schema({
    service: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'service',
    },
    date: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    isBooked: {
        type: String,
        enum: slot_constant_1.bookedEnum,
        required: true,
    },
}, { timestamps: true });
const Slot = (0, mongoose_1.model)('slot', slotSchema);
exports.default = Slot;
