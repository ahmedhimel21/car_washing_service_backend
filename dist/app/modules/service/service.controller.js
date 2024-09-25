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
exports.ServiceControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utility/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utility/sendResponse"));
const service_service_1 = require("./service.service");
// create service
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceServices.createServiceIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service created successfully',
        data: result,
    });
}));
//get single service
const getSpecificService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_service_1.ServiceServices.getSpecificServiceFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service retrieved successfully',
        data: result,
    });
}));
//get all services
const getAllServicesFromDB = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield service_service_1.ServiceServices.getAllServicesFromDB(query);
    (0, sendResponse_1.default)(res, {
        statusCode: !result.length ? 404 : 200,
        success: !result.length ? false : true,
        message: !result.length
            ? 'No Data Found'
            : 'Services retrieved successfully',
        data: result,
    });
}));
//get all services
const updateService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_service_1.ServiceServices.updateServiceIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service updated successfully',
        data: result,
    });
}));
//delete service
const deleteService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_service_1.ServiceServices.deleteServiceFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service deleted successfully',
        data: result,
    });
}));
exports.ServiceControllers = {
    createService,
    getSpecificService,
    getAllServicesFromDB,
    updateService,
    deleteService,
};
