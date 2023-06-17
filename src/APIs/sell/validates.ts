import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = [
    check("number")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ເລກສ່ຽງໂຊກ")
        .isLength({ max: 3, min: 2 })
        .withMessage("2 ຫຼື 3 ໂຕເທົ່ານັ້ນ"),
    check("price")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຈຳນວນເງິນ")
        .isLength({ max: 6 })
        .withMessage("ຈຳນວນເງິນສູງສຸດ 100,000 ກີບ")
        .isLength({ min: 4 })
        .withMessage("ຈຳນວນເງິນຂັ້ນຕ່ຳ 1,000 ກີບ"),

    check("bill_id")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນເລກທີບິນ"),
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
    check("username")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ງານ"),
    check("role")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກສິດການໃຊ້ງານ"),
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