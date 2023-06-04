import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";



export const validate = [
    check("product_type_name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ໝວດໝູ່ສິນຄ້າ"),
];

export const validateUpdate = [
    check("product_type_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ID"),
    check("product_type_name")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ໝວດໝູ່ສິນຄ້າ"),
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