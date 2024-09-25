"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFoundRoute_1 = __importDefault(require("./app/middleware/notFoundRoute"));
const routes_1 = require("./app/routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = require("path");
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)({
    origin: ['https://car-washing-service.vercel.app', 'http://localhost:5173'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the path to the 'views' folder
// eslint-disable-next-line no-undef
app.set('views', (0, path_1.join)(__dirname, './views'));
// application routes
app.use('/', routes_1.routes);
app.get('/', (req, res) => {
    res.send('Server is running');
});
// customize error
app.use(globalErrorHandler_1.default);
app.use(notFoundRoute_1.default);
exports.default = app;
