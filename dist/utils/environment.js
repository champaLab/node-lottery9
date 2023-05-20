"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
try {
    if (process.env.NODE_ENV == "production") {
        (0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, "..", ".env") });
    }
    else {
        (0, dotenv_1.config)({ path: (0, path_1.join)(__dirname, "..", ".env") });
    }
}
catch (e) {
    console.log("Unable to load .env* file, using host's env instead");
}
exports.default = {
    NODE_PORT: parseInt(`${process.env.NODE_PORT}`) || 8899,
    BASE_PATH: `${process.env.BASE_PATH}` || "/",
    NODE_HOST: `${process.env.HOST}` || "0.0.0.0",
    PWD: process.env.PWD || process.cwd(),
    DATABASE_URL: process.env.DATABASE_URL,
};
