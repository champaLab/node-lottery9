import { Router } from "express";
import { getLotteryHistoryController, createLotteryHistoryController } from "./controllers";
import { validate, validateResults, } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();


router.get('/lottery-history', verify, getLotteryHistoryController)
router.post('/lottery-history/create', verify, validate, validateResults, createLotteryHistoryController)


export default router