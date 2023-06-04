"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const validates_1 = require("./validates");
const jwt_1 = require("../../utils/jwt");
const router = (0, express_1.Router)();
router.get('/product-types', jwt_1.verify, controllers_1.getALLProductTypesController);
router.post('/product-types/create', jwt_1.verify, validates_1.validate, validates_1.validateResults, controllers_1.createProductTypeController);
router.post('/product-types/update', jwt_1.verify, validates_1.validateUpdate, validates_1.validateResults, controllers_1.updateProductTypeController);
router.delete('/product-types/delete/:id', jwt_1.verify, controllers_1.deleteProductTypeController);
exports.default = router;
