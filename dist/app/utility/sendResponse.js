"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    return res.status(200).json({
        success: data === null || data === void 0 ? void 0 : data.success,
        message: data === null || data === void 0 ? void 0 : data.message,
        data: data === null || data === void 0 ? void 0 : data.data,
    });
};
exports.default = sendResponse;
