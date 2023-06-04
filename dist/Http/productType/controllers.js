"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductTypeController = exports.updateProductTypeController = exports.createProductTypeController = exports.getALLProductTypesController = void 0;
const services_1 = require("./services");
const getALLProductTypesController = async (req, res) => {
    const productsTypes = await (0, services_1.getAllProductTypeService)();
    if (!productsTypes) {
        return res.json({
            status: "success",
            productsTypes: []
        });
    }
    return res.json({
        status: "success",
        productsTypes,
    });
};
exports.getALLProductTypesController = getALLProductTypesController;
const createProductTypeController = async (req, res) => {
    const product_type_name = req.body.product_type_name;
    const check = await (0, services_1.checkProductTypeService)(product_type_name);
    if (check) {
        return res.json({
            status: "error",
            message: "ໝວດໝູ່ສິນຄ້ານີ້ ມີໃນລະບົບແລ້ວ",
        });
    }
    const createUser = await (0, services_1.createProductTypeService)(product_type_name);
    if (!createUser) {
        return res.json({
            status: "error",
            message: "ຜິດພາດລອງອີກຄັ້ງ",
        });
    }
    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    });
};
exports.createProductTypeController = createProductTypeController;
const updateProductTypeController = async (req, res) => {
    const product_type_id = Number(req.body.product_type_id);
    const product_type_name = req.body.product_type_name;
    const check = await (0, services_1.checkProductTypeService)(product_type_name);
    if (check && check.product_type_id !== Number(product_type_id)) {
        return res.json({
            status: "error",
            message: "ໝວດໝູ່ສິນຄ້ານີ້ ມີໃນລະບົບແລ້ວ",
        });
    }
    const createUser = await (0, services_1.updateProductTypeService)(product_type_id, product_type_name);
    if (!createUser) {
        return res.json({
            status: "error",
            message: "ຜິດພາດລອງອີກຄັ້ງ",
        });
    }
    return res.json({
        status: "success",
        message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ",
    });
};
exports.updateProductTypeController = updateProductTypeController;
const deleteProductTypeController = async (req, res) => {
    const id = Number(req.params.id);
    if (typeof id !== "number") {
        return res.json({
            status: "error",
            message: "ບໍ່ພົບຂໍ້ມູນ",
        });
    }
    const result = await (0, services_1.deleteProductTypeService)(id);
    if (!result) {
        return res.json({
            status: "error",
            message: "ບໍ່ພົບຂໍ້ມູນ",
        });
    }
    return res.json({
        status: "success",
        message: "ລົບຂໍ້ມູນສຳເລັດແລ້ວ",
    });
};
exports.deleteProductTypeController = deleteProductTypeController;
