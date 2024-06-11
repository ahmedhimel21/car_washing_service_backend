"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFoundRoute_1 = __importDefault(require("./app/middleware/notFoundRoute"));
// import { routes } from './app/routes'
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)({ origin: ['http://localhost:5173'] }));
app.use(express_1.default.json());
// application routes
// app.use('/api/v1', routes)
app.get('/', (req, res) => {
    res.send('Server is running');
});
// customize error
app.use(globalErrorHandler_1.default);
app.use(notFoundRoute_1.default);
exports.default = app;
