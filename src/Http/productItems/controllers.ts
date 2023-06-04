import { Request, Response } from "express"
import { createProductItemService, deleteImageService, deleteProductItemService, getProductItemByProductIDService, updateProductItemService, } from "./services";
import environment from "../../utils/environment";


export const getProductItemByProductIDController = async (req: Request, res: Response) => {

    const product_id = req.params.id ? Number(req.params.id) : null
    if (!product_id) {
        return res.json({
            status: "success",
            productItems: [],
        })
    }
    const productItems = await getProductItemByProductIDService(product_id)

    if (!productItems) {
        return res.json({
            status: "error",
            message: "ຜິດພາດລອງອິກຄັ້ງ",
        })
    }

    return res.json({
        status: "success",
        productItems,
    })

}

export const createProductItemController = async (req: Request, res: Response) => {

    const folder = environment.PWD.split('/')
    const folderPath = folder[folder.length - 1]
    const image_path = req.file?.path.split(folderPath)[1]

    const createUser = await createProductItemService({ ...req.body, image_path })

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

export const updateProductItemController = async (req: Request, res: Response) => {

    const folder = environment.PWD.split('/')
    const folderPath = folder[folder.length - 1]
    const imagePath = req.file?.path.split(folderPath)[1]
    let image_path = req.body.image_path_old
    const product_item_id = Number(req.body.product_item_id)

    if (imagePath) {
        console.log("============================= Product update image =============================")
        await deleteImageService(image_path)
        image_path = imagePath
    }

    const createUser = await updateProductItemService(product_item_id, { ...req.body, image_path })

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

export const deleteProductItemController = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if (typeof id !== "number") {
        return res.json({
            status: "error",
            message: "ບໍ່ພົບຂໍ້ມູນ",
        })
    }

    const result = await deleteProductItemService(id)
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