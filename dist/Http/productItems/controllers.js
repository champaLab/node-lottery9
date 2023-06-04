"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductItemController = exports.updateProductItemController = exports.createProductItemController = exports.getProductItemByProductIDController = void 0;
const services_1 = require("./services");
const environment_1 = __importDefault(require("../../utils/environment"));
const getProductItemByProductIDController = async (req, res) => {
    const product_id = req.params.id ? Number(req.params.id) : null;
    if (!product_id) {
        return res.json({
            status: "success",
            productItems: [],
        });
    }
    const productItems = await (0, services_1.getProductItemByProductIDService)(product_id);
    if (!productItems) {
        return res.json({
            status: "error",
            message: "ຜິດພາດລອງອິກຄັ້ງ",
        });
    }
    return res.json({
        status: "success",
        productItems,
    });
};
exports.getProductItemByProductIDController = getProductItemByProductIDController;
const createProductItemController = async (req, res) => {
    var _a;
    const folder = environment_1.default.PWD.split('/');
    const folderPath = folder[folder.length - 1];
    const image_path = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.split(folderPath)[1];
    const createUser = await (0, services_1.createProductItemService)({ ...req.body, image_path });
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
exports.createProductItemController = createProductItemController;
const updateProductItemController = async (req, res) => {
    var _a;
    const folder = environment_1.default.PWD.split('/');
    const folderPath = folder[folder.length - 1];
    const imagePath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path.split(folderPath)[1];
    let image_path = req.body.image_path_old;
    const product_item_id = Number(req.body.product_item_id);
    if (imagePath) {
        console.log("============================= Product update image =============================");
        await (0, services_1.deleteImageService)(image_path);
        image_path = imagePath;
    }
    const createUser = await (0, services_1.updateProductItemService)(product_item_id, { ...req.body, image_path });
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
exports.updateProductItemController = updateProductItemController;
const deleteProductItemController = async (req, res) => {
    const id = Number(req.params.id);
    if (typeof id !== "number") {
        return res.json({
            status: "error",
            message: "ບໍ່ພົບຂໍ້ມູນ",
        });
    }
    const result = await (0, services_1.deleteProductItemService)(id);
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
exports.deleteProductItemController = deleteProductItemController;
