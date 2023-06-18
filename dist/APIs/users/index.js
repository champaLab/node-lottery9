"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const validates_1 = require("./validates");
const jwt_1 = require("../../utils/jwt");
const router = (0, express_1.Router)();
router.get('/users', controllers_1.getUserController);
router.post('/users/create', jwt_1.verify, validates_1.validate, validates_1.validateResults, controllers_1.createUserController);
router.post('/users/update', jwt_1.verify, validates_1.validateUpdate, validates_1.validateResults, controllers_1.updateUserController);
router.delete('/users/delete/:id', jwt_1.verify, controllers_1.updateUserController);
router.post('/login', validates_1.validateLogin, validates_1.validateResults, controllers_1.loginController);
router.get('/me', jwt_1.verify, controllers_1.getMeController);
exports.default = router;
