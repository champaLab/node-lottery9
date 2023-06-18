import { Request, Response } from "express"
import { getLotteryByBillService, getLotterySaleService, getLotterySearchService, } from "./services";
import { tbl_invoices } from "@prisma/client";

export const getLotterySaleController = async (req: Request, res: Response) => {

    const date = req.body.date
    const type = req.body.type
    const role = req.body.user.role
    const userId = Number(req.body.user.user_id)
    let report = await getLotterySaleService(role, userId, date, type)
    if (!report) {
        return res.json({
            status: "error",
            report: null
        })
    }

    return res.json({
        status: "success",
        report
    })
}

export const getLotteryBillController = async (req: Request, res: Response) => {

    const date = req.body.date
    const type = req.body.type
    const bill_id = Number(req.body.bill_id)
    let bills: any

    if (bill_id) {
        bills = await getLotterySearchService(bill_id, type)
    } else {
        bills = await getLotteryByBillService(date, type)
    }

    const groupedBills = await Array.from(new Set(bills.map((bill: tbl_invoices) => bill.bill_id)));

    return res.json({
        status: "success",
        bills,
        groupedBills
    })
}

