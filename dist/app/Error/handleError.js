"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleError = (err) => {
    const statusCode = err.statusCode || 400;
    const message = err.message;
    return {
        statusCode,
        message,
    };
};
exports.default = handleError;
