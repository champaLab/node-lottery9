"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAwardController = exports.getAwardController = void 0;
const services_1 = require("./services");
const getAwardController = async (req, res) => {
    let award = await (0, services_1.getAwardService)();
    if (!award) {
        return res.json({
            status: "error",
            award: null
        });
    }
    return res.json({
        status: "success",
        award
    });
};
exports.getAwardController = getAwardController;
const createAwardController = async (req, res) => {
    const create = await (0, services_1.createAwardService)(req.body);
    if (!create) {
        return res.json({
            status: "error",
            message: "ບັນທຶກຂໍ້ມູນ ຜິດພາດ ລອງອີກຄັ້ງ",
        });
    }
    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    });
};
exports.createAwardController = createAwardController;
