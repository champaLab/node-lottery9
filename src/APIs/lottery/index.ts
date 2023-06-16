import { Router } from "express";
import { createLotteryController, getLotteryController } from "./controllers";
import { validate, validateLogin, validateResults, validateUpdate } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();


router.get('/lottery', verify, getLotteryController)
router.post('/lottery/create', verify, validate, validateResults, createLotteryController)
// router.post('/users/update', verify, validateUpdate, validateResults, updateUserController)
// router.delete('/users/delete/:id', verify, updateUserController)
// router.post('/login', validateLogin, validateResults, loginController)
// router.get('/me', verify, getMeController)


export default router