"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validate = void 0;
const express_validator_1 = require("express-validator");
exports.validate = [
    (0, express_validator_1.check)("date")
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກວັນທີ"),
    (0, express_validator_1.check)("type")
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກປະເພດຫວຍ"),
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
