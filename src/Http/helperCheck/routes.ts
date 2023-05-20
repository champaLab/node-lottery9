import { Router } from "express";
import { helperCheck } from "./controllers";

const router = Router();

router.get('/', helperCheck)


export default router