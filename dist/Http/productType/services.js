"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductTypeService = exports.updateProductTypeService = exports.createProductTypeService = exports.checkProductTypeService = exports.getAllProductTypeService = void 0;
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const getAllProductTypeService = async () => {
    try {
        const result = await prismaClient_1.default.tbl_product_types.findMany();
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getAllProductTypeService = getAllProductTypeService;
const checkProductTypeService = async (product_type_name) => {
    try {
        const result = await prismaClient_1.default.tbl_product_types.findFirst({
            where: { product_type_name }
        });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.checkProductTypeService = checkProductTypeService;
const createProductTypeService = async (product_type_name) => {
    try {
        const result = await prismaClient_1.default.tbl_product_types.create({
            data: {
                product_type_name
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
exports.createProductTypeService = createProductTypeService;
const updateProductTypeService = async (product_type_id, product_type_name) => {
    try {
        const result = await prismaClient_1.default.tbl_product_types.update({
            where: { product_type_id: product_type_id },
            data: {
                product_type_name: product_type_name
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
exports.updateProductTypeService = updateProductTypeService;
const deleteProductTypeService = async (product_type_id) => {
    try {
        const result = await prismaClient_1.default.tbl_product_types.delete({ where: { product_type_id } });
        console.log(result);
        console.log("Delete product type ID: " + product_type_id);
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.deleteProductTypeService = deleteProductTypeService;
