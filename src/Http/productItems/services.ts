import { tbl_products } from "@prisma/client"
import prismaClient from "../../prisma/prismaClient"
import { unlink } from "fs/promises"
import { stat, statSync, unlinkSync } from "fs-extra"
import fs from "fs"
import environment from "../../utils/environment"

export const getProductItemByProductIDService = async (product_id: number) => {
    try {

        const products = await prismaClient.$queryRaw`
        SELECT 
        amount,
        color,
        created_at,
        price,
        product_id,
        product_item_id,
        size,
        image_path AS image_path_old,
        CONCAT(${environment.DOMAIN_IMAGE}, image_path) AS image_path
        FROM tbl_products_items
        WHERE product_id = ${product_id}
        `

        await prismaClient.$disconnect()
        return products
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createProductItemService = async (data: any) => {
    try {
        const result = await prismaClient.tbl_products_items.create({
            data: {
                image_path: data.image_path,
                amount: Number(data.amount),
                color: data.color,
                price: Number(data.price),
                size: data.size,
                product_id: Number(data.product_id),
            }
        })
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const updateProductItemService = async (product_item_id: number, data: any) => {
    try {
        const result = await prismaClient.tbl_products_items.update({
            where: { product_item_id }, data: {
                image_path: data.image_path,
                amount: data.amount,
                color: data.color,
                price: data.price,
                size: data.size,
                product_id: data.product_id,
                product_item_id: data.product_item_id,
            }
        })
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteProductItemService = async (product_item_id: number) => {
    try {
        const _result = await prismaClient.tbl_products_items.findFirst({ where: { product_item_id }, select: { image_path: true } })
        console.log("=========================== find product for delete  =========================== ")
        console.log(_result)

        if (!_result || !_result.image_path) {
            return null
        }

        await deleteImageService(_result.image_path)
        const result = await prismaClient.tbl_products_items.delete({ where: { product_item_id } })
        console.log(result)
        console.log("Delete product ID: " + product_item_id)
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