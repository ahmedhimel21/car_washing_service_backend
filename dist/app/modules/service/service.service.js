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
exports.ServiceServices = void 0;
const AppError_1 = __importDefault(require("../../Error/AppError"));
const service_model_1 = __importDefault(require("./service.model"));
const http_status_1 = __importDefault(require("http-status"));
//create service
const createServiceIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.create(payload);
    return result;
});
//get single service
const getSpecificServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.findById(id);
    //check result
    if (!result) {
        throw new AppError_1.default(404, 'Service not found!');
    }
    return result;
});
//get all services
const getAllServicesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.find();
    return !result.length ? [] : result;
});
//update service
const updateServiceIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.default.isServiceExists(id);
    //check isService exists
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found!');
    }
    const result = yield service_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
//delete service
const deleteServiceFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.default.isServiceExists(id);
    //check isService exists
    if (!service) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service not found!');
    }
    //check is service deleted
    if (service === null || service === void 0 ? void 0 : service.isDeleted) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Service already deleted!');
    }
    const result = yield service_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.ServiceServices = {
    createServiceIntoDB,
    getSpecificServiceFromDB,
    getAllServicesFromDB,
    updateServiceIntoDB,
    deleteServiceFromDB,
};
