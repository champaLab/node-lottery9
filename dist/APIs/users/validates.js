"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateUpdate = exports.validateLogin = exports.validate = void 0;
const express_validator_1 = require("express-validator");
exports.validate = [
    (0, express_validator_1.check)("role")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກສິດການໃຊ້ງານ"),
    (0, express_validator_1.check)("agent")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກຕົວແທນ"),
    (0, express_validator_1.check)("percentage")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນສ່ວນແບ່ງ")
        .isNumeric()
        .withMessage("ສ່ວນແບ່ງ ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    (0, express_validator_1.check)("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"),
    (0, express_validator_1.check)("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລະຫັດຜ່ານ")
        .isLength({ min: 8 })
        .withMessage("ລະຫັດຜ່ານ ຕ້ອງຫຼາຍກວ່າ 8 ໂຕອັກສອນ")
        .custom(async (password, { req }) => {
        if (req.body.password_confirm !== password) {
            throw new Error('ລະຫັດຜ່ານ ບໍ່ກົງກັນ');
        }
    }),
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
    (0, express_validator_1.check)("role")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກສິດການໃຊ້ງານ"),
    (0, express_validator_1.check)("agent")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກຕົວແທນ"),
    (0, express_validator_1.check)("percentage")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນສ່ວນແບ່ງ")
        .isNumeric()
        .withMessage("ສ່ວນແບ່ງ ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    (0, express_validator_1.check)("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"),
    (0, express_validator_1.check)("changePassword")
        .custom(async (changePassword, { req }) => {
        if (changePassword && req.body.password_confirm !== req.body.password) {
            throw new Error('ລະຫັດຜ່ານ ບໍ່ກົງກັນ');
        }
    }),
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
