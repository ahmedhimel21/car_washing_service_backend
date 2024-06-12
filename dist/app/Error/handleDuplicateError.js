"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err) => {
    const pattern = /dup key: { id: "(.*?)" }/;
    const statusCode = 409;
    const message = 'Duplicate error';
    const errorSources = [
        {
            path: err.errmsg.match(pattern),
            message: err === null || err === void 0 ? void 0 : err.errmsg,
        },
    ];
    return {
        statusCode,
        message,
        errorSources,
    };
};
exports.default = handleDuplicateError;
