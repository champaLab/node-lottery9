import { tbl_award, tbl_invoices, } from "@prisma/client"
import prismaClient from "../../prisma/prismaClient"

export const getAwardService = async () => {
    try {
        const result = await prismaClient.tbl_award.findFirst({ orderBy: { award_id: "desc" } })
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getBillService = async (user_id: number) => {
    try {
        const result = await prismaClient.tbl_bills.create({ data: { user_id } })
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createService = async (number: string, price: number, bill_id: number, type: string, user_id: number, agent: number | null) => {
    try {
        const created_at = new Date()
        const result = await prismaClient.tbl_invoices.create({
            data: {
                number: number,
                price: Number(price),
                type: type,
                bill_id: Number(bill_id),
                created_at: new Date(),
                created_by: Number(user_id),
                agent,
            }
        })

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createManyService = async (lottery: any) => {
    try {
        const result = await prismaClient.tbl_invoices.createMany({
            data: lottery
        })

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getInvoiceByBillService = async (bill_id: number) => {
    try {
        const result = await prismaClient.tbl_invoices.findMany({
            where: { bill_id }
        })

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getLotteryService = async (number: string) => {
    try {
        const result = await prismaClient.tbl_lottery.findFirst({
            where: { number }
        })

        await prismaClient.$disconnect()

        return result
    } catch (error) {
        console.log(error)
        return null
    }
}


export const checkoutService = async (bill_id: number) => {
    try {
        const result = await prismaClient.$queryRaw`
        UPDATE tbl_invoices SET checkout = 'yes' WHERE bill_id = ${bill_id}
        `

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const cancelBillService = async (bill_id: number, cancel_by: number, cancel_date: Date) => {
    try {
        const result = await prismaClient.$queryRaw`
        UPDATE tbl_invoices SET cancel = 'yes', cancel_by = ${cancel_by}, cancel_date=${cancel_date}  WHERE bill_id = ${bill_id}
        `

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}