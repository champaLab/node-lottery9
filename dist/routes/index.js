"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const router = (0, express_1.Router)();
(0, fs_extra_1.readdirSync)((0, path_1.join)(__dirname, "../APIs")).map(async (file) => {
    try {
        const path = (0, path_1.join)(__dirname, `../APIs/${file}`);
        await (0, fs_extra_1.statSync)(path);
        router.use(require(path).default);
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = router;
