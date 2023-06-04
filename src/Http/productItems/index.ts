import { Router } from "express";
import { createProductItemController, getProductItemByProductIDController, deleteProductItemController, updateProductItemController } from "./controllers";
import { validate, validateResults, validateUpdate, } from "./validates";
import { verify } from "../../utils/jwt";
import { upload } from "../../utils/fileUpload";


const router = Router();

router.get('/product-items/:id', verify, getProductItemByProductIDController)
router.post('/product-items/create', verify, upload('products', true).single('image'), validate, validateResults, createProductItemController)
router.post('/product-items/update', verify, upload('products', true).single('image'), validateUpdate, validateResults, updateProductItemController)
router.delete('/product-items/delete/:id', verify, deleteProductItemController)

export default router