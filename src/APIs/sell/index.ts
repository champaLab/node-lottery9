import { Router } from "express";
import { getInvoiceByBillController, createInvoiceController, getAwardController, getBillController } from "./controllers";
import { validate, validateLogin, validateResults, validateUpdate } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();


router.get('/award', verify, getAwardController)
router.get('/invoice/:bill', verify, getInvoiceByBillController)
router.post('/invoice/create', verify, validate, validateResults, createInvoiceController)
router.post('/bill/create', verify, getBillController)
// router.post('/users/update', verify, validateUpdate, validateResults, updateUserController)
// router.delete('/users/delete/:id', verify, updateUserController)
// router.post('/login', validateLogin, validateResults, loginController)
// router.get('/me', verify, getMeController)


export default router