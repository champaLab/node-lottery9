import { tbl_award, } from "@prisma/client"
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

export const createAwardService = async (award: tbl_award) => {
    try {
        const result = await prismaClient.tbl_award.create({
            data: {
                lao2: Number(award.lao2),
                lao3: Number(award.lao3),
                thai2: Number(award.thai2),
                thai3: Number(award.thai3),
            }
        })

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}
