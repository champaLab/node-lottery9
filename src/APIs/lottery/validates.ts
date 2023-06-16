import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = [
    check("number")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນເລກສ່ຽງໂຊກ")
        .isLength({ max: 2, min: 2 })
        .withMessage("ເລກສ່ຽງ 2 ຫຼັກເທົ່ານັ້ນ"),
    check("group")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ເລກນາມສັດ"),
    check("lao_limit2")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ຈຳກັດຍອດເງິນ ເລກລາວ 2 ໂຕ"),
    check("lao_limit3")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ຈຳກັດຍອດເງິນ ເລກລາວ 3 ໂຕ"),
    check("thai_limit2")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ຈຳກັດຍອດເງິນ ເລກໄທ 2 ໂຕ"),
    check("thai_limit3")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ຈຳກັດຍອດເງິນ ເລກໄທ 3 ໂຕ"),

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