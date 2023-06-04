import { Router } from "express";
import { createProductTypeController, deleteProductTypeController, getALLProductTypesController, updateProductTypeController, } from "./controllers";
import { validate, validateResults, validateUpdate, } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();

router.get('/product-types', verify, getALLProductTypesController)
router.post('/product-types/create', verify, validate, validateResults, createProductTypeController)
router.post('/product-types/update', verify, validateUpdate, validateResults, updateProductTypeController)
router.delete('/product-types/delete/:id', verify, deleteProductTypeController)

export default router