import dayjs from "dayjs"
import { Request, Response } from "express"
import { join } from 'path';
import environment from "../../utils/environment";

export const helperCheck = (req: Request, res: Response) => {
    const helper = {
        ip: req.hostname,
        base_path: environment.BASE_PATH,
        message: "ok",
        time: dayjs().format("D-MM-YY HH:mm:ss")

    }
    console.log(req.hostname)
    return res.json(helper)
}