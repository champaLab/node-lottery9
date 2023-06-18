import { Request, Response } from "express"
import { getAwardService, createService, getBillService, getInvoiceByBillService, getLotteryService, createManyService, checkoutService } from "./services";

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
    let number = req.body.number
    if (number.length === 3) {
        number = number.slice(1)
    }

    const luk = req.body.number.charAt(0)
    const price = Number(req.body.price)
    const bill_id = Number(req.body.bill_id)
    const type = req.body.type
    const group = req.body.group
    const user_id = req.body.user.user_id

    if (group) {
        const groups = await getLotteryService(number)
        if (groups) {
            const lottery = groups.group.split(',').map(num => ({
                number: luk + num,
                price,
                type,
                bill_id,
                created_at: new Date(),
                created_by: user_id,
            }))
            const create = await createManyService(lottery)
            if (!create) {
                return res.json({
                    status: "error",
                    message: "ບັນທຶກຂໍ້ມູນ ຜິດພາດ ລອງອີກຄັ້ງ",
                })
            }
        } else {
            const create = await createService(number, price, bill_id, type, user_id)
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
        const create = await createService(number, price, bill_id, type, user_id)
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
    console.log(invoice)

    return res.json({
        status: "success",
        invoice: invoice ? invoice : [],
    })
}

export const checkoutController = async (req: Request, res: Response) => {

    const bill = Number(req.body.bill_id)
    const invoice = await checkoutService(bill)
    if (!invoice) {
        return res.json({
            status: "error",
            message: "ກະລຸນາລະບຸເລກທີບິນ",
        })
    }
    return res.json({
        status: "success",
    })
}
