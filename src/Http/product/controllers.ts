import { Request, Response } from "express"
import bcrypt from 'bcryptjs'
import { sign } from "../../utils/jwt";
import { checkProductCodeService, createProductService, deleteImageService, deleteProductService, getAllProductService, updateProductService } from "./services";
import environment from "../../utils/environment";
import { tbl_products } from "@prisma/client"


export const getALLProductsController = async (req: Request, res: Response) => {
    const products = await getAllProductService()

    if (!products) {
        return res.json({
            status: "error",
            message: "ເພີ່ມຂໍ້ມູນສຳເລັດ",
        })
    }

    return res.json({
        status: "success",
        products,
    })

}

export const createProductController = async (req: Request, res: Response) => {

    const folder = environment.PWD.split('/')
    const folderPath = folder[folder.length - 1]
    const image_path = req.file?.path.split(folderPath)[1]

    const check = await checkProductCodeService(req.body.product_code)
    if (check) {
        return res.json({
            status: "error",
            message: "ລະຫັດສິນຄ້ານີ້ມີໃນລະບົບແລ້ວ",
        })
    }

    const createUser = await createProductService({ ...req.body, image_path })

    if (!createUser) {
        return res.json({
            status: "error",
            message: "ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ",
        })
    }

    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    })
}

export const updateProductController = async (req: Request, res: Response) => {

    const folder = environment.PWD.split('/')
    const folderPath = folder[folder.length - 1]
    const imagePath = req.file?.path.split(folderPath)[1]
    let image_path = req.body.image_path_old
    const product_id = Number(req.body.product_id)

    if (imagePath) {
        console.log("============================= Product update image =============================")
        await deleteImageService(image_path)
        image_path = imagePath
    }

    const check = await checkProductCodeService(req.body.product_code)
    if (!check) {
        return res.json({
            status: "error",
            message: "ລະຫັດສິນຄ້ານີ້ ບໍ່ມີໃນລະບົບແລ້ວ",
        })
    } else if (check && check.product_id !== Number(product_id)) {
        return res.json({
            status: "error",
            message: "ລະຫັດສິນຄ້ານີ້ມີໃນລະບົບແລ້ວ",
        })
    }

    const createUser = await updateProductService(product_id, { ...req.body, image_path })

    if (!createUser) {
        return res.json({
            status: "error",
            message: "ຜິດພາດລອງອິກຄັ້ງ",
        })
    }

    return res.json({
        status: "success",
        message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ",
    })
}

export const deleteProductController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (typeof id !== "number") {
        return res.json({
            status: "error",
            message: "ບໍ່ພົບຂໍ້ມູນ",
        })
    }

    const result = await deleteProductService(id)
    if (!result) {
        return res.json({
            status: "error",
            message: "ບໍ່ພົບຂໍ້ມູນ",
        })
    }

    return res.json({
        status: "success",
        message: "ລົບຂໍ້ມູນສຳເລັດແລ້ວ",
    })
}