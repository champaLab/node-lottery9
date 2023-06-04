"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const router = (0, express_1.Router)();
(0, fs_extra_1.readdirSync)((0, path_1.join)(__dirname, "../Http")).map(async (file) => {
    try {
        const path = (0, path_1.join)(__dirname, `../Http/${file}`);
        await (0, fs_extra_1.statSync)(path);
        router.use(require(path).default);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
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
