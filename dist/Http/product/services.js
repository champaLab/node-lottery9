"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageService = exports.deleteProductService = exports.updateProductService = exports.createProductService = exports.checkProductCodeService = exports.getAllProductService = void 0;
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const fs_extra_1 = require("fs-extra");
const environment_1 = __importDefault(require("../../utils/environment"));
const getAllProductService = async () => {
    try {
        const result = await prismaClient_1.default.tbl_products.findMany();
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getAllProductService = getAllProductService;
const checkProductCodeService = async (product_code) => {
    try {
        const result = await prismaClient_1.default.tbl_products.findFirst({
            where: { product_code }
        });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.checkProductCodeService = checkProductCodeService;
const createProductService = async (data) => {
    try {
        const result = await prismaClient_1.default.tbl_products.create({
            data: {
                image_path: data.image_path,
                product_code: data.product_code,
                product_type_id: data.product_type_id,
                title: data.title,
            }
        });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.createProductService = createProductService;
const updateProductService = async (product_id, data) => {
    try {
        const result = await prismaClient_1.default.tbl_products.update({
            where: { product_id }, data: {
                image_path: data.image_path,
                product_code: data.product_code,
                product_type_id: data.product_type_id,
                title: data.title,
            }
        });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.updateProductService = updateProductService;
const deleteProductService = async (product_id) => {
    try {
        const _result = await prismaClient_1.default.tbl_products.findFirst({ where: { product_id }, select: { image_path: true } });
        console.log("=========================== find product for delete  =========================== ");
        console.log(_result);
        if (!_result || !_result.image_path) {
            return null;
        }
        await (0, exports.deleteImageService)(_result.image_path);
        const result = await prismaClient_1.default.tbl_products.delete({ where: { product_id } });
        console.log(result);
        console.log("Delete product ID: " + product_id);
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.deleteProductService = deleteProductService;
const deleteImageService = async (image_path) => {
    try {
        const path = environment_1.default.PWD + image_path;
        console.log("============================ delete file ============================");
        console.log(path);
        const stat = await (0, fs_extra_1.statSync)(path);
        console.log({ stat });
        await (0, fs_extra_1.unlinkSync)(path);
        return true;
    }
    catch (error) {
        console.log({ error });
        return null;
    }
};
exports.deleteImageService = deleteImageService;
