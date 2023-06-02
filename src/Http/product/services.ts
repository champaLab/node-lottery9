import { tbl_products } from "@prisma/client"
import prismaClient from "../../prisma/prismaClient"
import { unlink } from "fs/promises"
import { stat, statSync, unlinkSync } from "fs-extra"
import fs from "fs"
import environment from "../../utils/environment"

export const getAllProductService = async () => {
    try {
        const result = await prismaClient.tbl_products.findMany()
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const checkProductCodeService = async (product_code: string) => {
    try {
        const result = await prismaClient.tbl_products.findFirst(
            {
                where: { product_code }
            }
        )

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createProductService = async (data: tbl_products) => {
    try {
        const result = await prismaClient.tbl_products.create({
            data: {
                image_path: data.image_path,
                product_code: data.product_code,
                product_type_id: data.product_type_id,
                title: data.title,
            }
        })
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const updateProductService = async (product_id: number, data: any) => {
    try {
        const result = await prismaClient.tbl_products.update({
            where: { product_id }, data: {
                image_path: data.image_path,
                product_code: data.product_code,
                product_type_id: data.product_type_id,
                title: data.title,
            }
        })
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteProductService = async (product_id: number) => {
    try {
        const _result = await prismaClient.tbl_products.findFirst({ where: { product_id }, select: { image_path: true } })
        console.log("=========================== find product for delete  =========================== ")
        console.log(_result)

        if (!_result || !_result.image_path) {
            return null
        }

        await deleteImageService(_result.image_path)
        const result = await prismaClient.tbl_products.delete({ where: { product_id } })
        console.log(result)
        console.log("Delete product ID: " + product_id)
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteImageService = async (image_path: string) => {
    try {
        const path = environment.PWD + image_path
        console.log("============================ delete file ============================",)
        console.log(path)
        const stat = await statSync(path)
        console.log({ stat })
        await unlinkSync(path)
        return true
    } catch (error) {
        console.log({ error })
        return null
    }
}