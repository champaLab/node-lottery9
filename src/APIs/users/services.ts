import { tbl_users } from "@prisma/client"
import prismaClient from "../../prisma/prismaClient"
import { IUser } from "../../types"

export const getUsersService = async (created_by: number, role: string) => {
    try {
        if (role === "admin") {
            const users = await prismaClient.tbl_users.findMany()
            await prismaClient.$disconnect()
            return users
        } else if (role === "agent") {
            const users = await prismaClient.tbl_users.findMany({
                where: { created_by }
            })
            await prismaClient.$disconnect()
            return users
        }
        return []
    } catch (error) {
        console.log(error)
        return false
    }
}

export const checkUserService = async (username: string) => {
    try {
        const user = await prismaClient.tbl_users.findFirst(
            { where: { username } }
        )

        await prismaClient.$disconnect()
        return user
    } catch (error) {
        console.log(error)
        return false
    }
}

export const createUserService = async (username: string, password: string, created_by: number, percentage: number, role: string) => {
    try {
        const _user = await prismaClient.tbl_users.create({
            data: {
                username,
                password,
                created_by,
                percentage,
                role,
            }
        })

        await prismaClient.$disconnect()
        return _user
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateUserLoginService = async (user_id: number, last_login: Date) => {
    try {
        const _user = await prismaClient.tbl_users.update({ where: { user_id }, data: { last_login } })
        await prismaClient.$disconnect()
        return _user
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateUserAndPasswordService = async (user: tbl_users) => {
    try {
        const _user = await prismaClient.tbl_users.update({ where: { user_id: user.user_id }, data: user })
        await prismaClient.$disconnect()
        return _user
    } catch (error) {
        console.log(error)
        return false
    }
}

export const updateUserService = async (user: IUser) => {
    try {
        const _user = await prismaClient.tbl_users.update({ where: { user_id: user.user_id }, data: user })
        await prismaClient.$disconnect()
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
