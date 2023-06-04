"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateUpdate = exports.validate = void 0;
const express_validator_1 = require("express-validator");
exports.validate = [
    (0, express_validator_1.check)("product_type_name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ໝວດໝູ່ສິນຄ້າ"),
];
exports.validateUpdate = [
    (0, express_validator_1.check)("product_type_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ID"),
    (0, express_validator_1.check)("product_type_name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ໝວດໝູ່ສິນຄ້າ"),
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
