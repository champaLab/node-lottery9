"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const validates_1 = require("./validates");
const jwt_1 = require("../../utils/jwt");
const router = (0, express_1.Router)();
router.get('/award', jwt_1.verify, controllers_1.getAwardController);
router.get('/invoice/:bill', jwt_1.verify, controllers_1.getInvoiceByBillController);
router.post('/invoice/cancel', jwt_1.verify, validates_1.validateCancel, validates_1.validateResults, controllers_1.cancelBillController);
router.post('/invoice/create', jwt_1.verify, validates_1.validate, validates_1.validateResults, controllers_1.createInvoiceController);
router.post('/invoice/checkout', jwt_1.verify, validates_1.validateCheckout, validates_1.validateResults, controllers_1.checkoutController);
router.post('/bill/create', jwt_1.verify, controllers_1.getBillController);
// router.post('/users/update', verify, validateUpdate, validateResults, updateUserController)
// router.delete('/users/delete/:id', verify, updateUserController)
// router.post('/login', validateLogin, validateResults, loginController)
// router.get('/me', verify, getMeController)
exports.default = router;
