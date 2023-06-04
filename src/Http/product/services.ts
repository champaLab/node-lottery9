import { tbl_products } from "@prisma/client"
import prismaClient from "../../prisma/prismaClient"
import { unlink } from "fs/promises"
import { stat, statSync, unlinkSync } from "fs-extra"
import fs from "fs"
import environment from "../../utils/environment"

export const getAllProductService = async (limit: number, offset: number) => {
    try {
        const products = await prismaClient.$queryRaw`
        SELECT 
        PRO.product_id,
        PRO.product_code,
        PRO.title,
        CONCAT(${environment.DOMAIN_IMAGE}, PRO.image_path) AS image_path,
        PRO.image_path AS image_path_old,
        PRT.product_type_id,
        PRT.product_type_name
        FROM tbl_products PRO
        LEFT JOIN tbl_product_types PRT ON PRT.product_type_id = PRO.product_type_id
        LIMIT ${limit} OFFSET ${offset}
        `

        const count: any[] = await prismaClient.$queryRaw`
        SELECT 
        COUNT(product_id) AS count
        FROM tbl_products
        `

        let _count = 1
        if (count.length > 0) {
            _count = Math.floor((Number(count[0].count) / limit) + 1);
        }

        await prismaClient.$disconnect()
        return { products, count: _count }
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