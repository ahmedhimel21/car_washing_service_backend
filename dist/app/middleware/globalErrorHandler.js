"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongooseValidationError_1 = __importDefault(require("../Error/mongooseValidationError"));
const config_1 = __importDefault(require("../config"));
const handleDuplicateError_1 = __importDefault(require("../Error/handleDuplicateError"));
const handleCastError_1 = __importDefault(require("../Error/handleCastError"));
const zod_1 = require("zod");
const handleZodValidationError_1 = __importDefault(require("../Error/handleZodValidationError"));
const globalErrorHandler = (err, req, res, next) => {
    // Check if headers are already sent to prevent setting them again
    if (res.headersSent) {
        return next(err);
    }
    let statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || 500;
    let message = (err === null || err === void 0 ? void 0 : err.message) || 'Something went wrong';
    let errorMessages = [
        {
            path: '',
            message: 'Something went wrong!',
        },
    ];
    /**
     * error patterns
     * success: boolean
     * message: string
     * errorSources
     */
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedErrorResponse = (0, mongooseValidationError_1.default)(err);
        statusCode = simplifiedErrorResponse.statusCode;
        message = simplifiedErrorResponse.message;
        errorMessages = simplifiedErrorResponse.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedErrorResponse = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedErrorResponse.statusCode;
        message = simplifiedErrorResponse.message;
        errorMessages = simplifiedErrorResponse.errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiedErrorResponse = (0, handleCastError_1.default)(err);
        statusCode = simplifiedErrorResponse.statusCode;
        message = simplifiedErrorResponse.message;
        errorMessages = simplifiedErrorResponse.errorSources;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedErrorResponse = (0, handleZodValidationError_1.default)(err);
        statusCode = simplifiedErrorResponse.statusCode;
        message = simplifiedErrorResponse.message;
        errorMessages = simplifiedErrorResponse.errorSources;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        err,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
};
exports.default = globalErrorHandler;
