import { Router } from "express";
import { createAwardController, getAwardController } from "./controllers";
import { validate, validateLogin, validateResults, validateUpdate } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();


router.get('/award', verify, getAwardController)
router.post('/award/create', verify, validate, validateResults, createAwardController)
// router.post('/users/update', verify, validateUpdate, validateResults, updateUserController)
// router.delete('/users/delete/:id', verify, updateUserController)
// router.post('/login', validateLogin, validateResults, loginController)
// router.get('/me', verify, getMeController)


export default router