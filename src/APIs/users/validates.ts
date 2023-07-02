import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = [
    check("role")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກສິດການໃຊ້ງານ"),
    check("agent")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກຕົວແທນ"),
    check("percentage")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນສ່ວນແບ່ງ")
        .isNumeric()
        .withMessage("ສ່ວນແບ່ງ ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    check("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"),
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
    check("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"),
    check("password")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລະຫັດຜ່ານ"),
];

export const validateUpdate = [
    check("user_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ USER ID"),
    check("role")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກສິດການໃຊ້ງານ"),
    check("agent")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກຕົວແທນ"),
    check("percentage")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນສ່ວນແບ່ງ")
        .isNumeric()
        .withMessage("ສ່ວນແບ່ງ ຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ"),
    check("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"),
    check("changePassword")
        .custom(async (changePassword: string, { req }) => {
            if (changePassword && req.body.password_confirm !== req.body.password) {
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