import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = [
    check("product_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ Product ID"),
    check("size")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຂະໜາດສິນຄ້າ"),
    check("amount")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຈຳນວນ"),
    check("price")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລາຄາ"),
];

export const validateUpdate = [
    check("product_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ Product ID"),
    check("product_item_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ Product Item ID"),
    check("size")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຂະໜາດສິນຄ້າ"),
    check("amount")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຈຳນວນ"),
    check("price")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລາຄາ"),
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