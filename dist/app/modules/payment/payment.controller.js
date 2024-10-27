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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const payment_service_1 = require("./payment.service");
const paymentConfirmation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const result = yield payment_service_1.PaymentConfirmation.paymentConfirmation((_a = req.query) === null || _a === void 0 ? void 0 : _a.transactionId, (_b = req.query) === null || _b === void 0 ? void 0 : _b.slotId, (_c = req.query) === null || _c === void 0 ? void 0 : _c.status);
    res.send(result);
});
exports.PaymentController = {
    paymentConfirmation,
};
