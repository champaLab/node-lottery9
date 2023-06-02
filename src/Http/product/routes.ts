import { Router } from "express";
import { createProductController, deleteProductController, getALLProductsController, updateProductController, } from "./controllers";
import { validate, validateResults, validateUpdate, } from "./validates";
import { verify } from "../../utils/jwt";
import { upload } from "../../utils/fileUpload";

const router = Router();

router.get('/products', getALLProductsController)
router.post('/products/create', verify, upload('products', true).single('image'), validate, validateResults, createProductController)
router.post('/products/update', verify, upload('products', true).single('image'), validateUpdate, validateResults, updateProductController)
router.delete('/products/delete/:id', deleteProductController)

export default router