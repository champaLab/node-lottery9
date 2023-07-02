import { tbl_users } from "@prisma/client"
import prismaClient from "../../prisma/prismaClient"
import { IUser } from "../../types"

export const getUsersService = async (created_by: number, role: string) => {
    try {
        if (role === "admin") {
            const users = await prismaClient.tbl_users.findMany({
                select: {
                    created_at: true,
                    created_by: true,
                    last_login: true,
                    percentage: true,
                    role: true,
                    status: true,
                    updated_at: true,
                    user_id: true,
                    username: true,
                }
            })
            await prismaClient.$disconnect()
            return users
        } else if (role === "agent") {
            const users = await prismaClient.tbl_users.findMany({
                where: { created_by },
                select: {
                    created_at: true,
                    created_by: true,
                    last_login: true,
                    percentage: true,
                    role: true,
                    status: true,
                    updated_at: true,
                    user_id: true,
                    username: true,
                }
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

export const updateUserLoginService = async (user_id: number, last_login: Date, token: string) => {
    try {
        const _user = await prismaClient.tbl_users.update({ where: { user_id }, data: { last_login, token } })
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

export const updateUserService = async (user_id: number, password: string, agent: number, percentage: number, role: string, changePassword: boolean) => {
    try {
        if (changePassword) {
            const _user = await prismaClient.tbl_users.update({
                where: { user_id },
                data: {
                    password,
                    created_by: agent,
                    percentage,
                    role,
                    updated_at: new Date()
                }
            })
            await prismaClient.$disconnect()
            return _user
        }

        const _user = await prismaClient.tbl_users.update({
            where: { user_id }, data: {
                created_by: agent,
                percentage,
                role,
                updated_at: new Date()
            }
        })
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
        await prismaClient.$disconnect()
        return _user
    } catch (error) {
        console.log(error)
        return false
    }
}

export const toggleUserUserService = async (user_id: number, status: boolean, role: string) => {
    try {
        if (role === 'admin' || role === 'agent') {
            const _user = await prismaClient.tbl_users.updateMany({ where: { created_by: user_id }, data: { status: status ? false : true, token: null, updated_at: new Date() } })
            await prismaClient.$disconnect()
            return _user
        }

        const _user = await prismaClient.tbl_users.update({ where: { user_id }, data: { status: status ? false : true, token: null, updated_at: new Date() } })
        await prismaClient.$disconnect()
        return _user

    } catch (error) {
        console.log(error)
        return false
    }
}

export const checkTokenService = async (user_id: number, token: string) => {
    try {
        const _user = await prismaClient.tbl_users.findFirst({ where: { user_id, token } })
        await prismaClient.$disconnect()
        return _user
    } catch (error) {
        console.log(error)
        return false
    }
}