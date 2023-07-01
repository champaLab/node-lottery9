import { Request, Response } from "express"
import { getAwardNumberService, getAwardService, getLotteryByBillService, getLotterySaleService, getLotterySearchService, getSummaryByAgentService, summaryAwardAgentService, } from "./services";
import { tbl_invoices } from "@prisma/client";
import dayjs from "dayjs";

export const getLotterySaleController = async (req: Request, res: Response) => {

    const date = req.body.date
    const type = req.body.type
    const role = `${req.body.user.role}`.toLocaleLowerCase()
    const userId = Number(req.body.user.user_id)
    const agent = Number(req.body.user.created_by)
    let report = await getLotterySaleService(role, userId, date, type, agent)

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
    let bills: any | null = null

    if (bill_id) {
        bills = await getLotterySearchService(bill_id, type)
    } else {
        bills = await getLotteryByBillService(date, type)
    }

    let billId: number[] = await Array.from(new Set(bills.map((bill: tbl_invoices) => bill.bill_id)));

    if (bills) {
        bills = billId.map((item) => {
            const items = bills.filter((bill: tbl_invoices) => bill.bill_id == item);
            if (items) {
                return { ...items[0], items };
            }
        });
    }

    return res.json({
        status: "success",
        bills,
    })
}

export const getSummaryByAgentController = async (req: Request, res: Response) => {

    const date = req.body.date
    const type = req.body.type
    const user_id = Number(req.body.user.user_id)

    const report = await getSummaryByAgentService(date, type, user_id)
    if (!report) {
        return res.json({
            status: "error",
            message: 'server error'
        })
    }

    return res.json({
        status: "success",
        report,
    })
}
export const summaryAwardByAgentController = async (req: Request, res: Response) => {

    const date = dayjs(req.body.date).format('YYYYMMDD')
    const type = req.body.type
    const user_id = Number(req.body.user.user_id)
    const role = `${req.body.user.role}`.toLocaleLowerCase()


    const award = await getAwardService()
    if (!award) {
        return res.json({
            status: "error",
            message: 'ບໍ່ພົບຂໍ້ມູນລາງວັນ'
        })
    }

    const number = await getAwardNumberService(date)
    if (!number) {
        return res.json({
            status: "error",
            message: 'ບໍ່ພົບຜົນຫວຍຂອງວັນທີ ທີ່ທ່ານເລືອກ'
        })
    }

    interface ResSummaryAward {
        username: string;
        number: string;
        price: number;
    }


    const three = number.number
    const two = number.number.slice(1)

    const report: ResSummaryAward[] | null = await summaryAwardAgentService(type, two, three, role, user_id)
    if (!report) {
        return res.json({
            status: "error",
            message: 'server error'
        })
    }


    const _report = [];
    for await (const item of report) {
        let multiplier: number = 1;

        if (type === 'lao' && item.number.length === 2) {
            multiplier = award.lao2;
        } else if (type === 'lao' && item.number.length === 3) {
            multiplier = award.lao3;
        } else if (type === 'thai' && item.number.length === 2) {
            multiplier = award.thai2;
        } else if (type === 'thai' && item.number.length === 3) {
            multiplier = award.thai3;
        }

        const multipliedItem = { ...item, price: item.price * multiplier, award: multiplier };
        _report.push(multipliedItem);
    }

    return res.json({
        status: "success",
        report: _report,
    })
}

