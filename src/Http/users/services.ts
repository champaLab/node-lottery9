import { tbl_users } from "@prisma/client"
import prismaClient from "../../prisma/prismaClient"
import { IUser } from "../../types"

export const checkUserService = async (whatsapp: string) => {
    try {
        const user = await prismaClient.tbl_users.findFirst(
            {
                where: { whatsapp }
            }
        )

        prismaClient.$disconnect()
        return user
    } catch (error) {
        console.log(error)
        return false
    }
}


export const createUserService = async (user: tbl_users) => {
    try {
        const _user = await prismaClient.tbl_users.create({ data: user })
        prismaClient.$disconnect()
        return _user
    } catch (error) {
        console.log(error)
        return false
    }
}
export const updateUserLoginService = async (user_id: number, last_login: Date) => {
    try {
        const _user = await prismaClient.tbl_users.update({ where: { user_id }, data: { last_login } })
        prismaClient.$disconnect()
        return _user
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateUserAndPasswordService = async (user: tbl_users) => {
    try {
        const _user = await prismaClient.tbl_users.update({ where: { user_id: user.user_id }, data: user })
        prismaClient.$disconnect()
        return _user
    } catch (error) {
        console.log(error)
        return false
    }
}
export const updateUserService = async (user: IUser) => {
    try {
        const _user = await prismaClient.tbl_users.update({ where: { user_id: user.user_id }, data: user })
        prismaClient.$disconnect()
        return _user
    } catch (error) {
        console.log(error)
        return false
    }
}
export const deleteUserService = async (user_id: number) => {
    try {
        const _user = await prismaClient.tbl_users.delete({ where: { user_id } })
        prismaClient.$disconnect()
        return _user
    } catch (error) {
        console.log(error)
        return false
    }
}
