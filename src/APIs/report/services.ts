import prismaClient from "../../prisma/prismaClient"

export const getLotterySaleService = async (role: string, user_id: number, date: string, type: string) => {
    try {
        let result: any = []
        if (role.toLocaleLowerCase() == 'admin' || role.toLocaleLowerCase() == 'superadmin') {
            result = await prismaClient.$queryRaw`
            SELECT number, SUM(price) as price FROM tbl_invoices 
            WHERE DATE(created_at) = ${date}
            AND checkout = 'yes'
            AND type = ${type}
            AND cancel = false
            GROUP BY number 
            ORDER BY number asc
            `
        } else {
            result = await prismaClient.$queryRaw`
            SELECT number, SUM(price) as price FROM tbl_invoices 
            WHERE DATE(created_at) = ${date}
            AND checkout = 'yes' 
            AND created_by = ${user_id}
            AND type = ${type}
            AND cancel = false
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
