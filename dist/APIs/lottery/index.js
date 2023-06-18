"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const validates_1 = require("./validates");
const jwt_1 = require("../../utils/jwt");
const router = (0, express_1.Router)();
router.get('/lottery', jwt_1.verify, controllers_1.getLotteryController);
router.post('/lottery/create', jwt_1.verify, validates_1.validate, validates_1.validateResults, controllers_1.createLotteryController);
// router.post('/users/update', verify, validateUpdate, validateResults, updateUserController)
// router.delete('/users/delete/:id', verify, updateUserController)
// router.post('/login', validateLogin, validateResults, loginController)
// router.get('/me', verify, getMeController)
exports.default = router;
