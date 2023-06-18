import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = [
    check("date")
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກວັນທີ"),
    check("type")
        .not()
        .isEmpty()
        .withMessage("ກະລຸນາເລືອກປະເພດຫວຍ"),
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