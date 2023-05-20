import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = [
    check("full_name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຕົວແທນ"),
    check("address")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນທີ່ຢູ່"),
    check("whatsapp")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ")
        .isLength({ min: 10, max: 10 })
        .withMessage("ໝາຍເລກໂທລະສັບ ຕ້ອງ 10 ໂຕ"),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລະຫັດຜ່ານ")
        .isLength({ min: 8 })
        .withMessage("ລະຫັດຜ່ານ ຕ້ອງຫຼາຍກວ່າ 8 ໂຕອັກສອນ")
        .custom(async (password: string, { req }) => {
            if (req.body.password_confirm !== password) {
                throw new Error('ລະຫັດຜ່ານ ບໍ່ກົງກັນ')
            }
        }),
];
export const validateLogin = [
    check("whatsapp")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ")
        .isLength({ min: 10, max: 10 })
        .withMessage("ໝາຍເລກໂທລະສັບ ຕ້ອງ 10 ໂຕ"),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລະຫັດຜ່ານ"),

];

export const validateUpdate = [
    check("full_name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຕົວແທນ"),
    check("user_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ user_id"),
    check("change_password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ change_password"),
    check("address")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນທີ່ຢູ່"),
    check("whatsapp")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ໝາຍເລກໂທລະສັບ")
        .isLength({ min: 10, max: 10 })
        .withMessage("ໝາຍເລກໂທລະສັບ ຕ້ອງ 10 ໂຕ"),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລະຫັດຜ່ານ")
        .isLength({ min: 8 })
        .withMessage("ລະຫັດຜ່ານ ຕ້ອງຫຼາຍກວ່າ 8 ໂຕອັກສອນ")
        .custom(async (password: string, { req }) => {
            if (req.body.password_confirm !== password) {
                throw new Error('ລະຫັດຜ່ານ ບໍ່ກົງກັນ')
            }
        }),
];

export async function validateResults(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.json({
            status: "error",
            messages: errors.array(),
        });
    next();
}