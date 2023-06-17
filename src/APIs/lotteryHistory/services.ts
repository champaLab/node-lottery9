import { tbl_award, tbl_invoices, } from "@prisma/client"
import prismaClient from "../../prisma/prismaClient"
import dayjs from "dayjs"

export const getLotteryHistoryService = async () => {
    try {
        const result = await prismaClient.$queryRaw`
            SELECT * FROM tbl_lottery_history  ORDER BY  lottery_history_id desc LIMIT 20
        `

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createLotteryHistoryService = async (number: string, user_id: number) => {
    try {
        const date = dayjs().format('YYYYMMDD')
        const result = await prismaClient.tbl_lottery_history.upsert({
            where: { date },
            create: {
                created_by: user_id,
                date,
                number,
            },
            update: {
                updated_by: user_id,
                updated_at: new Date(),
                number,
            },
        })
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}
