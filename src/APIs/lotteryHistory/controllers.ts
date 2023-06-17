import { Request, Response } from "express"
import { createLotteryHistoryService, getLotteryHistoryService } from "./services";

export const getLotteryHistoryController = async (req: Request, res: Response) => {

    let lottery = await getLotteryHistoryService()
    if (!lottery) {
        return res.json({
            status: "error",
            lottery: null
        })
    }

    return res.json({
        status: "success",
        lottery
    })
}


export const createLotteryHistoryController = async (req: Request, res: Response) => {

    const user_id = Number(req.body.user.user_id)
    const number = req.body.number
    let bill = await createLotteryHistoryService(number, user_id)
    if (!bill) {
        return res.json({
            status: "error",
            message: "ເພີ່ມຜົນຫວຍ ຜິດພາດ ລອງອີກຄັ້ງ"
        })
    }

    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    })
}
