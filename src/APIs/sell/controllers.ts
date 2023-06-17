import { Request, Response } from "express"
import { getAwardService, createService, getBillService, getInvoiceByBillService, getLotteryService, createManyService } from "./services";

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


export const getBillController = async (req: Request, res: Response) => {

    const user_id = Number(req.body.user.user_id)
    let bill = await getBillService(user_id)
    if (!bill) {
        return res.json({
            status: "error",
            bill: null
        })
    }

    return res.json({
        status: "success",
        bill
    })
}

export const createInvoiceController = async (req: Request, res: Response) => {
    const number = req.body.number.slice(1)
    const luk = req.body.number.charAt(0)
    const price = Number(req.body.price)
    const bill_id = Number(req.body.bill_id)
    const type = req.body.type
    const group = req.body.group

    if (group) {
        const groups = await getLotteryService(number)
        if (groups) {
            const lottery = groups.group.split(',').map(num => ({
                "number": luk + num,
                price,
                type,
                bill_id,
            }))
            const create = await createManyService(lottery)
            if (!create) {
                return res.json({
                    status: "error",
                    message: "ບັນທຶກຂໍ້ມູນ ຜິດພາດ ລອງອີກຄັ້ງ",
                })
            }
        } else {
            const create = await createService(req.body)
            if (!create) {
                return res.json({
                    status: "error",
                    message: "ບັນທຶກຂໍ້ມູນ ຜິດພາດ ລອງອີກຄັ້ງ",
                })
            }
        }
        return res.json({
            status: "success",
            message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
        })
    } else {
        const create = await createService(req.body)
        if (!create) {
            return res.json({
                status: "error",
                message: "ບັນທຶກຂໍ້ມູນ ຜິດພາດ ລອງອີກຄັ້ງ",
            })
        }
    }

    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    })
}

export const getInvoiceByBillController = async (req: Request, res: Response) => {
    console.log(req.params.bill)
    if (!req.params.bill) {
        return res.json({
            status: "error",
            message: "ກະລຸນາລະບຸເລກທີບິນ",
        })
    }

    const bill = Number(req.params.bill)
    const invoice = await getInvoiceByBillService(bill)

    return res.json({
        status: "success",
        invoice: invoice ? invoice : [],
    })
}
