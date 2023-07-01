"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summaryAwardByAgentController = exports.getSummaryByAgentController = exports.getLotteryBillController = exports.getLotterySaleController = void 0;
const services_1 = require("./services");
const dayjs_1 = __importDefault(require("dayjs"));
const getLotterySaleController = async (req, res) => {
    const date = req.body.date;
    const type = req.body.type;
    const role = `${req.body.user.role}`.toLocaleLowerCase();
    const userId = Number(req.body.user.user_id);
    const agent = Number(req.body.user.created_by);
    let report = await (0, services_1.getLotterySaleService)(role, userId, date, type, agent);
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
    let bills = null;
    if (bill_id) {
        bills = await (0, services_1.getLotterySearchService)(bill_id, type);
    }
    else {
        bills = await (0, services_1.getLotteryByBillService)(date, type);
    }
    let billId = await Array.from(new Set(bills.map((bill) => bill.bill_id)));
    if (bills) {
        bills = billId.map((item) => {
            const items = bills.filter((bill) => bill.bill_id == item);
            if (items) {
                return { ...items[0], items };
            }
        });
    }
    return res.json({
        status: "success",
        bills,
    });
};
exports.getLotteryBillController = getLotteryBillController;
const getSummaryByAgentController = async (req, res) => {
    const date = req.body.date;
    const type = req.body.type;
    const user_id = Number(req.body.user.user_id);
    const role = `${req.body.user.role}`.toLocaleLowerCase();
    const report = await (0, services_1.getSummaryByAgentService)(date, type, user_id, role);
    if (!report) {
        return res.json({
            status: "error",
            message: 'server error'
        });
    }
    return res.json({
        status: "success",
        report,
    });
};
exports.getSummaryByAgentController = getSummaryByAgentController;
const summaryAwardByAgentController = async (req, res) => {
    const date = (0, dayjs_1.default)(req.body.date).format('YYYYMMDD');
    const type = req.body.type;
    const user_id = Number(req.body.user.user_id);
    const role = `${req.body.user.role}`.toLocaleLowerCase();
    const award = await (0, services_1.getAwardService)();
    if (!award) {
        return res.json({
            status: "error",
            message: 'ບໍ່ພົບຂໍ້ມູນລາງວັນ'
        });
    }
    const number = await (0, services_1.getAwardNumberService)(date);
    if (!number) {
        return res.json({
            status: "error",
            message: 'ບໍ່ພົບຜົນຫວຍຂອງວັນທີ ທີ່ທ່ານເລືອກ'
        });
    }
    const three = number.number;
    const two = number.number.slice(1);
    const report = await (0, services_1.summaryAwardAgentService)(type, two, three, role, user_id);
    if (!report) {
        return res.json({
            status: "error",
            message: 'server error'
        });
    }
    const _report = [];
    for await (const item of report) {
        let multiplier = 1;
        if (type === 'lao' && item.number.length === 2) {
            multiplier = award.lao2;
        }
        else if (type === 'lao' && item.number.length === 3) {
            multiplier = award.lao3;
        }
        else if (type === 'thai' && item.number.length === 2) {
            multiplier = award.thai2;
        }
        else if (type === 'thai' && item.number.length === 3) {
            multiplier = award.thai3;
        }
        const multipliedItem = { ...item, price: Number(item.count) * multiplier, award: multiplier };
        _report.push(multipliedItem);
    }
    return res.json({
        status: "success",
        report: _report,
    });
};
exports.summaryAwardByAgentController = summaryAwardByAgentController;
