import { Request, Response } from "express"
import { checkProductTypeService, createProductTypeService, deleteProductTypeService, getAllProductTypeService, updateProductTypeService } from "./services";
import environment from "../../utils/environment";


export const getALLProductTypesController = async (req: Request, res: Response) => {
    const productsTypes = await getAllProductTypeService()

    if (!productsTypes) {
        return res.json({
            status: "success",
            productsTypes: []
        })
    }

    return res.json({
        status: "success",
        productsTypes,
    })

}

export const createProductTypeController = async (req: Request, res: Response) => {

    const product_type_name = req.body.product_type_name

    const check = await checkProductTypeService(product_type_name)
    if (check) {
        return res.json({
            status: "error",
            message: "ໝວດໝູ່ສິນຄ້ານີ້ ມີໃນລະບົບແລ້ວ",
        })
    }

    const createUser = await createProductTypeService(product_type_name)

    if (!createUser) {
        return res.json({
            status: "error",
            message: "ຜິດພາດລອງອີກຄັ້ງ",
        })
    }

    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    })
}

export const updateProductTypeController = async (req: Request, res: Response) => {

    const product_type_id = Number(req.body.product_type_id)
    const product_type_name = req.body.product_type_name

    const check = await checkProductTypeService(product_type_name)
    if (check && check.product_type_id !== Number(product_type_id)) {
        return res.json({
            status: "error",
            message: "ໝວດໝູ່ສິນຄ້ານີ້ ມີໃນລະບົບແລ້ວ",
        })
    }

    const createUser = await updateProductTypeService(product_type_id, product_type_name,)
    if (!createUser) {
        return res.json({
            status: "error",
            message: "ຜິດພາດລອງອີກຄັ້ງ",
        })
    }

    return res.json({
        status: "success",
        message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ",
    })
}

export const deleteProductTypeController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (typeof id !== "number") {
        return res.json({
            status: "error",
            message: "ບໍ່ພົບຂໍ້ມູນ",
        })
    }

    const result = await deleteProductTypeService(id)
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