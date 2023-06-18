"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const validates_1 = require("./validates");
const jwt_1 = require("../../utils/jwt");
const router = (0, express_1.Router)();
router.post('/summery-of-sale', jwt_1.verify, validates_1.validate, validates_1.validateResults, controllers_1.getLotterySaleController);
router.post('/report/bills', jwt_1.verify, validates_1.validate, validates_1.validateResults, controllers_1.getLotteryBillController);
exports.default = router;