import prismaClient from "../../prisma/prismaClient"

export const getLotterySaleService = async (role: string, created_by: number, date: string, type: string, agent: number) => {
    try {
        console.log({ agent, role })

        let result: any = []
        if (role === 'admin' || role == 'superadmin') {
            result = await prismaClient.$queryRaw`
            SELECT number, SUM(price) as price FROM tbl_invoices 
            WHERE DATE(created_at) = ${date}
            AND checkout = 'yes'
            AND type = ${type}
            AND cancel IS NULL
            GROUP BY number 
            ORDER BY number asc
            `
        } else if (role === 'agent') {
            result = await prismaClient.$queryRaw`
            SELECT number, SUM(price) as price FROM tbl_invoices 
            WHERE DATE(created_at) = ${date}
            AND checkout = 'yes' 
            AND (agent = ${created_by} OR created_by = ${created_by})
            AND type = ${type}
            AND cancel IS NULL
            GROUP BY number 
            ORDER BY number asc
            `
        } else {
            result = await prismaClient.$queryRaw`
            SELECT number, SUM(price) as price FROM tbl_invoices 
            WHERE DATE(created_at) = ${date}
            AND checkout = 'yes' 
            AND created_by = ${created_by}
            AND type = ${type}
            AND cancel IS NULL
            GROUP BY number 
            ORDER BY number asc
            `
        }


        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getLotteryByBillService = async (created_at: string, type: string) => {
    try {
        let result = await prismaClient.$queryRaw`
            SELECT 
            I.invoice_id, 
            I.number,
            I.bill_id,
            I.price, 
            I.cancel, 
            I.type, 
            DATE_FORMAT(I.created_at, '%d-%m-%Y %H:%i') AS created_at, 
            DATE_FORMAT(I.cancel_date, '%d-%m-%Y %H:%i') AS cancel_date, 
            I.reason, 
            I.checkout,
            U.username
            FROM tbl_invoices I
            LEFT JOIN tbl_users U ON  I.cancel_by = U.user_id 
            WHERE  DATE(I.created_at) = ${created_at}
            AND I.type = ${type}
            AND I.checkout = 'yes'
            ORDER BY I.bill_id DESC
            `

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getLotterySearchService = async (bill_id: number, type: string) => {
    try {
        let result = await prismaClient.$queryRaw`
            SELECT 
            I.invoice_id, 
            I.bill_id,
            I.number, 
            I.price, 
            I.cancel, 
            I.type, 
            DATE_FORMAT(I.created_at, '%d-%m-%Y %H:%i') AS created_at, 
            DATE_FORMAT(I.cancel_date, '%d-%m-%Y %H:%i') AS cancel_date, 
            I.reason, 
            I.checkout,
            U.username
            FROM tbl_invoices I
            LEFT JOIN tbl_users U ON  I.cancel_by = U.user_id 
            WHERE  I.bill_id = ${bill_id}
            AND I.type = ${type}
            ORDER BY I.number  
            `
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getSummaryByAgentService = async (created_at: string, type: string, agent: number) => {
    try {
        let result = await prismaClient.$queryRaw`
            SELECT   US.username, US.percentage,
            (SUM(IV.price) * US.percentage/100) as percent,
            SUM(IV.price) as price
            FROM tbl_invoices IV
            LEFT JOIN tbl_users AS US
            ON US.user_id = IV.agent
            WHERE DATE(IV.created_at) = ${created_at}
            AND IV.checkout = 'yes'
            AND IV.agent = ${agent}
            AND IV.type = ${type}
            AND IV.cancel IS NULL
            GROUP BY IV.created_by
            `
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const summaryAwardAgentService = async (type: string, two: string, three: string, role: string, created_by: number) => {
    try {
        let result: any = null

        if (role === 'admin' || role == 'superadmin') {
            result = await prismaClient.$queryRaw`
            SELECT  US.username, IV.number,
            COUNT(IV.number) as count 
            FROM tbl_invoices IV
            LEFT JOIN tbl_users AS US
            ON US.user_id = IV.agent
            WHERE (IV.number = ${two} OR IV.number = ${three})
            AND IV.checkout = 'yes'
            AND IV.type = ${type}
            AND IV.cancel IS NULL
            GROUP BY IV.agent, IV.number
            `
        } else if (role === 'agent') {
            result = await prismaClient.$queryRaw`
            SELECT  US.username, IV.number 
            SUM(IV.price) as price
            FROM tbl_invoices IV
            LEFT JOIN tbl_users AS US
            ON US.user_id = IV.agent
            WHERE (IV.number = ${two} OR IV.number = ${three})
            AND IV.agent = ${created_by}
            AND IV.checkout = 'yes'
            AND IV.type = ${type}
            AND IV.cancel IS NULL
            GROUP BY IV.agent, IV.number
            `
        } else {
            result = await prismaClient.$queryRaw`
            SELECT  US.username, IV.number,
            COUNT(IV.number) as count 
            FROM tbl_invoices IV
            LEFT JOIN tbl_users AS US
            ON US.user_id = IV.agent
            WHERE (IV.number = ${two} OR IV.number = ${three})
            AND IV.created_by = ${created_by}
            AND IV.checkout = 'yes'
            AND IV.type = ${type}
            AND IV.cancel IS NULL
            GROUP BY IV.agent, IV.number
            `
        }

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAwardService = async () => {
    try {
        const result = await prismaClient.tbl_award.findFirst({
            orderBy: { award_id: 'desc' }
        })

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAwardNumberService = async (date: string) => {
    try {
        const result = await prismaClient.tbl_lottery_history.findFirst({
            where: { date }
        })

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}