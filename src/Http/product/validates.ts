import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = [
    check("title")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ສິນຄ້າ"),
    check("product_type_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກປະເພດສິນຄ້າ"),
    check("product_code")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລະຫັດສິນຄ້າ"),
];

export const validateUpdate = [
    check("product_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ID"),
    check("title")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນຊື່ສິນຄ້າ"),
    check("product_type_id")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກປະເພດສິນຄ້າ"),
    check("product_code")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນ ລະຫັດສິນຄ້າ"),
    check("image_path_old")
        .trim()
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາປ້ອນເລືອກຮູບເກົ່າ"),
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