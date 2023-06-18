"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLotteryBillController = exports.getLotterySaleController = void 0;
const services_1 = require("./services");
const getLotterySaleController = async (req, res) => {
    const date = req.body.date;
    const type = req.body.type;
    const role = req.body.user.role;
    const userId = Number(req.body.user.user_id);
    let report = await (0, services_1.getLotterySaleService)(role, userId, date, type);
    if (!report) {
        return res.json({
            status: "error",
            report: null
        });
    }
    return res.json({
        status: "success",
        report
    });
};
exports.getLotterySaleController = getLotterySaleController;
const getLotteryBillController = async (req, res) => {
    const date = req.body.date;
    const type = req.body.type;
    const bill_id = Number(req.body.bill_id);
    let bills;
    if (bill_id) {
        bills = await (0, services_1.getLotterySearchService)(bill_id, type);
    }
    else {
        bills = await (0, services_1.getLotteryByBillService)(date, type);
    }
    const groupedBills = await Array.from(new Set(bills.map((bill) => bill.bill_id)));
    return res.json({
        status: "success",
        bills,
        groupedBills
    });
};
exports.getLotteryBillController = getLotteryBillController;
