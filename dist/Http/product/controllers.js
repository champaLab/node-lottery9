"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductController = exports.updateProductController = exports.createProductController = exports.getALLProductsController = void 0;
const services_1 = require("./services");
const environment_1 = __importDefault(require("../../utils/environment"));
const getALLProductsController = async (req, res) => {
    const products = await (0, services_1.getAllProductService)();
    if (!products) {
        return res.json({
            status: "error",
            message: "ເພີ່ມຂໍ້ມູນສຳເລັດ",
        });
    }
    return res.json({
        status: "success",
        products,
    });
};
exports.getALLProductsController = getALLProductsController;
const createProductController = async (req, res) => {
    var _a;
    const folder = environment_1.default.PWD.split('/');
    const folderPath = folder[folder.length - 1];
    const image_path = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.split(folderPath)[1];
    const check = await (0, services_1.checkProductCodeService)(req.body.product_code);
    if (check) {
        return res.json({
            status: "error",
            message: "ລະຫັດສິນຄ້ານີ້ມີໃນລະບົບແລ້ວ",
        });
    }
    const createUser = await (0, services_1.createProductService)({ ...req.body, image_path });
    if (!createUser) {
        return res.json({
            status: "error",
            message: "ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ",
        });
    }
    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    });
};
exports.createProductController = createProductController;
const updateProductController = async (req, res) => {
    var _a;
    const folder = environment_1.default.PWD.split('/');
    const folderPath = folder[folder.length - 1];
    const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.split(folderPath)[1];
    let image_path = req.body.image_path_old;
    const product_id = Number(req.body.product_id);
    if (imagePath) {
        console.log("============================= Product update image =============================");
        await (0, services_1.deleteImageService)(image_path);
        image_path = imagePath;
    }
    const check = await (0, services_1.checkProductCodeService)(req.body.product_code);
    if (!check) {
        return res.json({
            status: "error",
            message: "ລະຫັດສິນຄ້ານີ້ ບໍ່ມີໃນລະບົບແລ້ວ",
        });
    }
    else if (check && check.product_id !== Number(product_id)) {
        return res.json({
            status: "error",
            message: "ລະຫັດສິນຄ້ານີ້ມີໃນລະບົບແລ້ວ",
        });
    }
    const createUser = await (0, services_1.updateProductService)(product_id, { ...req.body, image_path });
    if (!createUser) {
        return res.json({
            status: "error",
            message: "ຜິດພາດລອງອິກຄັ້ງ",
        });
    }
    return res.json({
        status: "success",
        message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ",
    });
};
exports.updateProductController = updateProductController;
const deleteProductController = async (req, res) => {
    const id = Number(req.params.id);
    if (typeof id !== "number") {
        return res.json({
            status: "error",
            message: "ບໍ່ພົບຂໍ້ມູນ",
        });
    }
    const result = await (0, services_1.deleteProductService)(id);
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
exports.deleteProductController = deleteProductController;
