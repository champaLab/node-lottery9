import { Router } from "express";
import { helperCheck } from "../Http/helperCheck/controllers";

import helperCheckApi from "../Http/helperCheck/routes"
import userApi from "../Http/users/routes"

const router = Router();

router.use('/', helperCheckApi)
router.use('/', userApi)


export default router