"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateUpdate = exports.validateLogin = exports.validate = void 0;
const express_validator_1 = require("express-validator");
exports.validate = [
    (0, express_validator_1.check)("number")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນເລກສ່ຽງໂຊກ")
        .isLength({ max: 2, min: 2 })
        .withMessage("ເລກສ່ຽງ 2 ຫຼັກເທົ່ານັ້ນ"),
    (0, express_validator_1.check)("group")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ເລກນາມສັດ"),
    (0, express_validator_1.check)("lao_limit2")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ຈຳກັດຍອດເງິນ ເລກລາວ 2 ໂຕ"),
    (0, express_validator_1.check)("lao_limit3")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ຈຳກັດຍອດເງິນ ເລກລາວ 3 ໂຕ"),
    (0, express_validator_1.check)("thai_limit2")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ຈຳກັດຍອດເງິນ ເລກໄທ 2 ໂຕ"),
    (0, express_validator_1.check)("thai_limit3")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ຈຳກັດຍອດເງິນ ເລກໄທ 3 ໂຕ"),
];
exports.validateLogin = [
    (0, express_validator_1.check)("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"),
    (0, express_validator_1.check)("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລະຫັດຜ່ານ"),
];
exports.validateUpdate = [
    (0, express_validator_1.check)("user_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ USER ID"),
    (0, express_validator_1.check)("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"),
    (0, express_validator_1.check)("role")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກສິດການໃຊ້ງານ"),
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
