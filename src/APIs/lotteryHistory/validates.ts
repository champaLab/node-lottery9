import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = [
    check("number")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຜົນຫວຍ")
        .isLength({ max: 3, min: 3 })
        .withMessage("3 ໂຕເທົ່ານັ້ນ"),
];

export const validateCheckout = [
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