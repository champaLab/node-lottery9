"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResults = exports.validateUpdate = exports.validateLogin = exports.validate = void 0;
const express_validator_1 = require("express-validator");
exports.validate = [
    (0, express_validator_1.check)("full_name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຕົວແທນ"),
    (0, express_validator_1.check)("address")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນທີ່ຢູ່"),
    (0, express_validator_1.check)("whatsapp")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ")
        .isLength({ min: 10, max: 10 })
        .withMessage("ໝາຍເລກໂທລະສັບ ຕ້ອງ 10 ໂຕ"),
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
    (0, express_validator_1.check)("whatsapp")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ")
        .isLength({ min: 10, max: 10 })
        .withMessage("ໝາຍເລກໂທລະສັບ ຕ້ອງ 10 ໂຕ"),
    (0, express_validator_1.check)("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລະຫັດຜ່ານ"),
];
exports.validateUpdate = [
    (0, express_validator_1.check)("full_name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຕົວແທນ"),
    (0, express_validator_1.check)("user_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ user_id"),
    (0, express_validator_1.check)("change_password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ change_password"),
    (0, express_validator_1.check)("address")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນທີ່ຢູ່"),
    (0, express_validator_1.check)("whatsapp")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ")
        .isLength({ min: 10, max: 10 })
        .withMessage("ໝາຍເລກໂທລະສັບ ຕ້ອງ 10 ໂຕ"),
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
