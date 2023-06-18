"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateCheckout = exports.validate = void 0;
const express_validator_1 = require("express-validator");
exports.validate = [
    (0, express_validator_1.check)("number")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ເລກສ່ຽງໂຊກ")
        .isLength({ max: 3, min: 2 })
        .withMessage("2 ຫຼື 3 ໂຕເທົ່ານັ້ນ"),
    (0, express_validator_1.check)("price")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຈຳນວນເງິນ")
        .isLength({ max: 6 })
        .withMessage("ຈຳນວນເງິນສູງສຸດ 100,000 ກີບ")
        .isLength({ min: 4 })
        .withMessage("ຈຳນວນເງິນຂັ້ນຕ່ຳ 1,000 ກີບ"),
    (0, express_validator_1.check)("bill_id")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນເລກທີບິນ"),
];
exports.validateCheckout = [
    (0, express_validator_1.check)("bill_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ເລກທີບິນ"),
];
async function validateResults(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.json({
            status: "error",
            messages: errors.array(),
        });
    next();
}
exports.validateResults = validateResults;
