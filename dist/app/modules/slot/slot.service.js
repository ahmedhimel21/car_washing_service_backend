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
exports.SlotServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const queryBuilder_1 = __importDefault(require("../../builder/queryBuilder"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const service_model_1 = __importDefault(require("../service/service.model"));
const slot_model_1 = __importDefault(require("./slot.model"));
const slot_utility_1 = __importDefault(require("./slot.utility"));
const createSlotIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { startTime, endTime, date, service } = payload;
    const serviceId = payload === null || payload === void 0 ? void 0 : payload.service;
    const serviceInfo = yield service_model_1.default.isServiceExists(serviceId);
    //   check service available or not
    if (!serviceInfo) {
        throw new AppError_1.default(404, 'Service not found!');
    }
    //check service is deleted or not
    if (serviceInfo.isDeleted) {
        throw new AppError_1.default(400, "Can't create slots, service deleted!");
    }
    const slots = (0, slot_utility_1.default)(startTime, endTime, date, service);
    const result = yield slot_model_1.default.create(slots);
    return result;
});
const getAllSlotsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchAbleFields = ['date'];
    const result = yield (0, queryBuilder_1.default)(slot_model_1.default.find({ isBooked: 'available' }).populate('service'), query, searchAbleFields);
    return !result.length ? 'No slots available at this moment!' : result;
});
exports.SlotServices = {
    createSlotIntoDB,
    getAllSlotsFromDB,
};
