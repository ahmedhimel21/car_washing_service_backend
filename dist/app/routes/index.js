"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const service_route_1 = require("../modules/service/service.route");
const slot_route_1 = require("../modules/slot/slot.route");
const booking_route_1 = require("../modules/booking/booking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/api/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/api/services',
        route: service_route_1.ServiceRoutes,
    },
    {
        path: '/api/services',
        route: slot_route_1.SlotRoutes,
    },
    {
        path: '/api/slots',
        route: slot_route_1.SlotRoutes,
    },
    {
        path: '/api',
        route: booking_route_1.BookingRoutes,
    },
];
moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
});
exports.routes = router;
