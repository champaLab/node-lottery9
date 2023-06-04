import { tbl_products } from "@prisma/client"
import prismaClient from "../../prisma/prismaClient"
import { unlink } from "fs/promises"
import { stat, statSync, unlinkSync } from "fs-extra"
import fs from "fs"
import environment from "../../utils/environment"

export const getAllProductTypeService = async () => {
    try {
        const result = await prismaClient.tbl_product_types.findMany()
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const checkProductTypeService = async (product_type_name: string) => {
    try {
        const result = await prismaClient.tbl_product_types.findFirst(
            {
                where: { product_type_name }
            }
        )

        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createProductTypeService = async (product_type_name: string) => {
    try {
        const result = await prismaClient.tbl_product_types.create({
            data: {
                product_type_name
            }
        })
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const updateProductTypeService = async (product_type_id: number, product_type_name: string) => {
    try {
        const result = await prismaClient.tbl_product_types.update({
            where: { product_type_id: product_type_id },
            data: {
                product_type_name: product_type_name
            }
        })
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteProductTypeService = async (product_type_id: number) => {
    try {

        const result = await prismaClient.tbl_product_types.delete({ where: { product_type_id } })
        console.log(result)
        console.log("Delete product type ID: " + product_type_id)
        await prismaClient.$disconnect()
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}
