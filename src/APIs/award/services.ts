import { tbl_award, tbl_lottery } from "@prisma/client"
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

// export const updateUserLoginService = async (user_id: number, last_login: Date) => {
//     try {
//         const _user = await prismaClient.tbl_users.update({ where: { user_id }, data: { last_login } })
//         await prismaClient.$disconnect()
//         return _user
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }

// export const updateUserAndPasswordService = async (user: tbl_users) => {
//     try {
//         const _user = await prismaClient.tbl_users.update({ where: { user_id: user.user_id }, data: user })
//         await prismaClient.$disconnect()
//         return _user
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }

// export const updateUserService = async (user: IUser) => {
//     try {
//         const _user = await prismaClient.tbl_users.update({ where: { user_id: user.user_id }, data: user })
//         await prismaClient.$disconnect()
//         return _user
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }

// export const deleteUserService = async (user_id: number) => {
//     try {
//         const _user = await prismaClient.tbl_users.delete({ where: { user_id } })
//         prismaClient.$disconnect()
//         return _user
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }
