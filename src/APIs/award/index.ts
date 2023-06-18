import { Router } from "express";
import { createAwardController, getAwardController } from "./controllers";
import { validate, validateResults, } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();


router.get('/award', verify, getAwardController)
router.post('/award/create', verify, validate, validateResults, createAwardController)


export default router