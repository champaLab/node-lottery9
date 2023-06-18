"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLotteryHistoryController = exports.getLotteryHistoryController = void 0;
const services_1 = require("./services");
const getLotteryHistoryController = async (req, res) => {
    let lottery = await (0, services_1.getLotteryHistoryService)();
    if (!lottery) {
        return res.json({
            status: "error",
            lottery: null
        });
    }
    return res.json({
        status: "success",
        lottery
    });
};
exports.getLotteryHistoryController = getLotteryHistoryController;
const createLotteryHistoryController = async (req, res) => {
    const user_id = Number(req.body.user.user_id);
    const number = req.body.number;
    let bill = await (0, services_1.createLotteryHistoryService)(number, user_id);
    if (!bill) {
        return res.json({
            status: "error",
            message: "ເພີ່ມຜົນຫວຍ ຜິດພາດ ລອງອີກຄັ້ງ"
        });
    }
    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    });
};
exports.createLotteryHistoryController = createLotteryHistoryController;
