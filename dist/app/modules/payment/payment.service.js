"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentConfirmation = void 0;
/* eslint-disable no-undef */
// import { readFileSync } from 'fs'
const booking_model_1 = __importDefault(require("../booking/booking.model"));
const payment_utils_1 = __importDefault(require("./payment.utils"));
const path_1 = require("path");
const ejs_1 = __importDefault(require("ejs"));
const slot_model_1 = __importDefault(require("../slot/slot.model"));
const paymentConfirmation = (transactionId, slotId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResponse = yield (0, payment_utils_1.default)(transactionId);
    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        yield booking_model_1.default.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'paid',
        });
        yield slot_model_1.default.findByIdAndUpdate(slotId, { isBooked: 'booked' }, { new: true });
    }
    const successFilePath = (0, path_1.join)(__dirname, '../../../../public/success.ejs');
    const failedFilePath = (0, path_1.join)(__dirname, '../../../../public/failed.ejs');
    const successTemplate = yield ejs_1.default.renderFile(successFilePath, {
        status,
        transactionId,
        message: 'Your payment was successful!',
    });
    const failedTemplate = yield ejs_1.default.renderFile(failedFilePath, {
        status,
        transactionId,
        message: 'Your payment failed. Please try again!',
    });
    return `${status === 'success' ? successTemplate : failedTemplate}`;
});
exports.PaymentConfirmation = {
    paymentConfirmation,
};
