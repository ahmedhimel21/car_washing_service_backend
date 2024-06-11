"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodValidationError = (err) => {
    const statusCode = 400;
    const message = 'Validation error';
    const errorSources = err === null || err === void 0 ? void 0 : err.issues.map(issue => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.default = handleZodValidationError;
