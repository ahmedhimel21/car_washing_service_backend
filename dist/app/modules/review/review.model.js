"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});
const Review = (0, mongoose_1.model)('review', reviewSchema);
exports.default = Review;
