import { Router } from "express";
import { createUserController, getUserController, loginController, updateUserController } from "./controllers";
import { validate, validateLogin, validateResults, validateUpdate } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();


router.get('/users', getUserController)
router.post('/user/create', verify, validate, validateResults, createUserController)
router.post('/user/update', verify, validateUpdate, validateResults, updateUserController)
router.delete('/user/delete/:id', verify, updateUserController)
router.post('/login', validateLogin, validateResults, loginController)


export default router