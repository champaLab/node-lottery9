import { Router } from "express";
import { getLotteryBillController, getLotterySaleController, getSummaryByAgentController, summaryAwardByAgentController } from "./controllers";
import { validate, validateResults, } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();


router.post('/summery-of-sale', verify, validate, validateResults, getLotterySaleController)
router.post('/report/bills', verify, validate, validateResults, getLotteryBillController)
router.post('/report/summary-by-agent', verify, validate, validateResults, getSummaryByAgentController)
router.post('/report/summary-award', verify, validate, validateResults, summaryAwardByAgentController)


export default router