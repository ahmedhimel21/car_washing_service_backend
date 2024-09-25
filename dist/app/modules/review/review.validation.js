"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidations = void 0;
const zod_1 = require("zod");
const reviewCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        message: zod_1.z.string().min(1, 'message is required'),
        address: zod_1.z.string().min(1, ' address is required'),
        rating: zod_1.z.number().min(0, 'rating must be a positive number'),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.ReviewValidations = {
    reviewCreateValidationSchema,
};
