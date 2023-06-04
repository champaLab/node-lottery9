import { Router } from "express";
import { readdirSync, statSync } from "fs-extra";
import { join } from "path";

const router = Router();

readdirSync(join(__dirname, "../Http")).map(async (file) => {
    try {
        const path = join(__dirname, `../Http/${file}`)
        await statSync(path)
        router.use(require(path).default)
    } catch (error) {
        console.log(error)
    }
});

export default router

// import { Router } from 'express'
// import helperCheckApi from '../Http/helperCheck/index.js'
// import product from '../Http/product/index.js'
// import productItems from '../Http/productItems/index.js'
// import productType from '../Http/productType/index.js'
// import users from '../Http/users/index.js'

// const router = Router()

// router.use('/', helperCheckApi)
// router.use('/', product)
// router.use('/', productItems)
// router.use('/', productType)
// router.use('/', users)

// export default router
