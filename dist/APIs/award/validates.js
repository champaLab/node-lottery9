"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validate = void 0;
const express_validator_1 = require("express-validator");
exports.validate = [
    (0, express_validator_1.check)("lao2")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຈຳນວນເງິນລາງວັນ ເລກລາວ 2 ໂຕ"),
    (0, express_validator_1.check)("lao3")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຈຳນວນເງິນລາງວັນ ເລກລາວ 3 ໂຕ"),
    (0, express_validator_1.check)("thai2")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຈຳນວນເງິນລາງວັນ ເລກໄທ 2 ໂຕ"),
    (0, express_validator_1.check)("thai3")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຈຳນວນເງິນລາງວັນ ເລກລາວ 2 ໂຕ"),
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
