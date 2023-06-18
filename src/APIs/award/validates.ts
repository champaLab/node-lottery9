import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = [
    check("lao2")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຈຳນວນເງິນລາງວັນ ເລກລາວ 2 ໂຕ"),
    check("lao3")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຈຳນວນເງິນລາງວັນ ເລກລາວ 3 ໂຕ"),
    check("thai2")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຈຳນວນເງິນລາງວັນ ເລກໄທ 2 ໂຕ"),
    check("thai3")
        .isNumeric()
        .withMessage("ກະລຸນາປ້ອນ ຈຳນວນເງິນລາງວັນ ເລກລາວ 2 ໂຕ"),
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