"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageService = exports.deleteProductService = exports.updateProductService = exports.createProductService = exports.checkProductCodeService = exports.getAllProductService = void 0;
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const fs_extra_1 = require("fs-extra");
const environment_1 = __importDefault(require("../../utils/environment"));
const getAllProductService = async (limit, offset) => {
    try {
        const products = await prismaClient_1.default.$queryRaw `
        SELECT 
        PRO.product_id,
        PRO.product_code,
        PRO.title,
        CONCAT(${environment_1.default.DOMAIN_IMAGE}, PRO.image_path) AS image_path,
        PRO.image_path AS image_path_old,
        PRT.product_type_id,
        PRT.product_type_name
        FROM tbl_products PRO
        LEFT JOIN tbl_product_types PRT ON PRT.product_type_id = PRO.product_type_id
        LIMIT ${limit} OFFSET ${offset}
        `;
        const count = await prismaClient_1.default.$queryRaw `
        SELECT 
        COUNT(product_id) AS count
        FROM tbl_products
        `;
        let _count = 1;
        if (count.length > 0) {
            _count = Math.floor((Number(count[0].count) / limit) + 1);
        }
        await prismaClient_1.default.$disconnect();
        return { products, count: _count };
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
