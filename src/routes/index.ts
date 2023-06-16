import { Router } from "express";
import { readdirSync, statSync } from "fs-extra";
import { join } from "path";

const router = Router();

readdirSync(join(__dirname, "../APIs")).map(async (file) => {
    try {
        const path = join(__dirname, `../APIs/${file}`)
        await statSync(path)
        router.use(require(path).default)
    } catch (error) {
        console.log(error)
    }
});

export default router
