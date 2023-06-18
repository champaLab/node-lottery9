import { Request, Response } from "express"
import { getAwardService, createAwardService } from "./services";

export const getAwardController = async (req: Request, res: Response) => {

    let award = await getAwardService()
    if (!award) {
        return res.json({
            status: "error",
            award: null
        })
    }

    return res.json({
        status: "success",
        award
    })
}


export const createAwardController = async (req: Request, res: Response) => {
    const create = await createAwardService(req.body)
    if (!create) {
        return res.json({
            status: "error",
            message: "ບັນທຶກຂໍ້ມູນ ຜິດພາດ ລອງອີກຄັ້ງ",
        })
    }

    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    })
}
