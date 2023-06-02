import { Router } from "express";
import { helperCheck } from "../Http/helperCheck/controllers";

import helperCheckApi from "../Http/helperCheck/routes"
import userApi from "../Http/users/routes"
import productApi from "../Http/product/routes"

const router = Router();

router.use('/', helperCheckApi)
router.use('/', userApi)
router.use('/', productApi)


export default router