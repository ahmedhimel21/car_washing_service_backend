"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_constant_1 = require("./user.constant");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: user_constant_1.nameEnum,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const User = (0, mongoose_1.model)('user', userSchema);
exports.default = User;
