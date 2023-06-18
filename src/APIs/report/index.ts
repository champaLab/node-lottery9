import { Router } from "express";
import { getLotteryBillController, getLotterySaleController } from "./controllers";
import { validate, validateResults, } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();


router.post('/summery-of-sale', verify, validate, validateResults, getLotterySaleController)
router.post('/report/bills', verify, validate, validateResults, getLotteryBillController)


export default router