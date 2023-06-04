"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateUpdate = exports.validate = void 0;
const express_validator_1 = require("express-validator");
exports.validate = [
    (0, express_validator_1.check)("product_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ Product ID"),
    (0, express_validator_1.check)("size")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຂະໜາດສິນຄ້າ"),
    (0, express_validator_1.check)("amount")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຈຳນວນ"),
    (0, express_validator_1.check)("price")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລາຄາ"),
];
exports.validateUpdate = [
    (0, express_validator_1.check)("product_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ Product ID"),
    (0, express_validator_1.check)("product_item_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ Product Item ID"),
    (0, express_validator_1.check)("size")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຂະໜາດສິນຄ້າ"),
    (0, express_validator_1.check)("amount")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຈຳນວນ"),
    (0, express_validator_1.check)("price")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລາຄາ"),
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
