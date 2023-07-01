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

export const validateCheckout = [
    check("bill_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ເລກທີບິນ"),
];

export const validateCancel = [
    check("bill_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ເລກທີບິນ"),
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