"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidations = void 0;
const zod_1 = require("zod");
const serviceCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        description: zod_1.z.string().min(1, 'Description is required'),
        price: zod_1.z.number().min(0, 'Price must be a positive number'),
        duration: zod_1.z.number().min(0, 'Duration must be a positive number'),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const serviceUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').optional(),
        description: zod_1.z.string().min(1, 'Description is required').optional(),
        price: zod_1.z.number().min(0, 'Price must be a positive number').optional(),
        duration: zod_1.z
            .number()
            .min(0, 'Duration must be a positive number')
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.ServiceValidations = {
    serviceCreateValidationSchema,
    serviceUpdateValidationSchema,
};
