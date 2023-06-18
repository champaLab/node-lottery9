"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validate = void 0;
const express_validator_1 = require("express-validator");
exports.validate = [
    (0, express_validator_1.check)("number")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຜົນຫວຍ")
        .isLength({ max: 3, min: 3 })
        .withMessage("3 ໂຕເທົ່ານັ້ນ"),
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
