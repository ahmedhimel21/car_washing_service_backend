"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotValidations = void 0;
const zod_1 = require("zod");
const slot_constant_1 = require("./slot.constant");
const slotCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        service: zod_1.z.string().refine(value => /^[0-9a-fA-F]{24}$/.test(value), {
            message: 'Invalid ObjectId',
        }),
        date: zod_1.z.string().min(1, 'Date is required'),
        startTime: zod_1.z.string().min(1, 'Start time is required'),
        endTime: zod_1.z.string().min(1, 'End time is required'),
        isBooked: zod_1.z.enum(slot_constant_1.bookedEnum).optional(),
    }),
});
exports.SlotValidations = {
    slotCreateValidationSchema,
};
