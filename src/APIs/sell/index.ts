import { Router } from "express";
import { getInvoiceByBillController, createInvoiceController, getAwardController, getBillController, checkoutController, cancelBillController } from "./controllers";
import { validate, validateCancel, validateCheckout, validateResults, } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();


router.get('/award', verify, getAwardController)
router.get('/invoice/:bill', verify, getInvoiceByBillController)
router.post('/invoice/cancel', verify, validateCancel, validateResults, cancelBillController)
router.post('/invoice/create', verify, validate, validateResults, createInvoiceController)
router.post('/invoice/checkout', verify, validateCheckout, validateResults, checkoutController)
router.post('/bill/create', verify, getBillController)
// router.post('/users/update', verify, validateUpdate, validateResults, updateUserController)
// router.delete('/users/delete/:id', verify, updateUserController)
// router.post('/login', validateLogin, validateResults, loginController)
// router.get('/me', verify, getMeController)


export default router