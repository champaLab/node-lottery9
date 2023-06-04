"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteImageService = exports.deleteProductItemService = exports.updateProductItemService = exports.createProductItemService = exports.getProductItemByProductIDService = void 0;
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const fs_extra_1 = require("fs-extra");
const environment_1 = __importDefault(require("../../utils/environment"));
const getProductItemByProductIDService = async (product_id) => {
    try {
        const products = await prismaClient_1.default.$queryRaw `
        SELECT 
        amount,
        color,
        created_at,
        price,
        product_id,
        product_item_id,
        size,
        image_path AS image_path_old,
        CONCAT(${environment_1.default.DOMAIN_IMAGE}, image_path) AS image_path
        FROM tbl_products_items
        WHERE product_id = ${product_id}
        `;
        await prismaClient_1.default.$disconnect();
        return products;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getProductItemByProductIDService = getProductItemByProductIDService;
const createProductItemService = async (data) => {
    try {
        const result = await prismaClient_1.default.tbl_products_items.create({
            data: {
                image_path: data.image_path,
                amount: Number(data.amount),
                color: data.color,
                price: Number(data.price),
                size: data.size,
                product_id: Number(data.product_id),
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
exports.createProductItemService = createProductItemService;
const updateProductItemService = async (product_item_id, data) => {
    try {
        const result = await prismaClient_1.default.tbl_products_items.update({
            where: { product_item_id }, data: {
                image_path: data.image_path,
                amount: data.amount,
                color: data.color,
                price: data.price,
                size: data.size,
                product_id: data.product_id,
                product_item_id: data.product_item_id,
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
exports.updateProductItemService = updateProductItemService;
const deleteProductItemService = async (product_item_id) => {
    try {
        const _result = await prismaClient_1.default.tbl_products_items.findFirst({ where: { product_item_id }, select: { image_path: true } });
        console.log("=========================== find product for delete  =========================== ");
        console.log(_result);
        if (!_result || !_result.image_path) {
            return null;
        }
        await (0, exports.deleteImageService)(_result.image_path);
        const result = await prismaClient_1.default.tbl_products_items.delete({ where: { product_item_id } });
        console.log(result);
        console.log("Delete product ID: " + product_item_id);
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.deleteProductItemService = deleteProductItemService;
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
