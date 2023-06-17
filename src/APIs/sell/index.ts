import { Router } from "express";
import { getInvoiceByBillController, createInvoiceController, getAwardController, getBillController, checkoutController } from "./controllers";
import { validate, validateCheckout, validateResults, } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();


router.get('/award', verify, getAwardController)
router.get('/invoice/:bill', verify, getInvoiceByBillController)
router.post('/invoice/create', verify, validate, validateResults, createInvoiceController)
router.post('/invoice/checkout', verify, validateCheckout, validateResults, checkoutController)
router.post('/bill/create', verify, getBillController)
// router.post('/users/update', verify, validateUpdate, validateResults, updateUserController)
// router.delete('/users/delete/:id', verify, updateUserController)
// router.post('/login', validateLogin, validateResults, loginController)
// router.get('/me', verify, getMeController)


export default router