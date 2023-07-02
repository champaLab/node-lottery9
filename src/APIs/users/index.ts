import { Router } from "express";
import { createUserController, getMeController, getUserController, loginController, toggleUserController, updateUserController } from "./controllers";
import { validate, validateLogin, validateResults, validateUpdate } from "./validates";
import { verify } from "../../utils/jwt";

const router = Router();


router.get('/users', verify, getUserController)
router.post('/users/create', verify, validate, validateResults, createUserController)
router.post('/users/update', verify, validateUpdate, validateResults, updateUserController)
router.delete('/users/delete/:id', verify, updateUserController)
router.post('/login', validateLogin, validateResults, loginController)
router.get('/me', verify, getMeController)
router.post('/users/toggle-status', verify, toggleUserController)


export default router