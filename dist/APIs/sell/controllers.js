"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBillController = exports.checkoutController = exports.getInvoiceByBillController = exports.createInvoiceController = exports.getBillController = exports.getAwardController = void 0;
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
const getBillController = async (req, res) => {
    const user_id = Number(req.body.user.user_id);
    let bill = await (0, services_1.getBillService)(user_id);
    if (!bill) {
        return res.json({
            status: "error",
            bill: null
        });
    }
    return res.json({
        status: "success",
        bill
    });
};
exports.getBillController = getBillController;
const createInvoiceController = async (req, res) => {
    let number = req.body.number;
    if (number.length === 3) {
        number = number.slice(1);
    }
    const luk = req.body.number.charAt(0);
    const price = Number(req.body.price);
    const bill_id = Number(req.body.bill_id);
    const type = req.body.type;
    const group = req.body.group;
    const user_id = req.body.user.user_id;
    const agent = req.body.user.created_by ? Number(req.body.user.created_by) : null;
    if (group) {
        const groups = await (0, services_1.getLotteryService)(number);
        if (groups) {
            const lottery = groups.group.split(',').map(num => ({
                number: luk + num,
                price,
                type,
                bill_id,
                created_at: new Date(),
                created_by: user_id,
                agent,
            }));
            const create = await (0, services_1.createManyService)(lottery);
            if (!create) {
                return res.json({
                    status: "error",
                    message: "ບັນທຶກຂໍ້ມູນ ຜິດພາດ ລອງອີກຄັ້ງ",
                });
            }
        }
        else {
            const create = await (0, services_1.createService)(number, price, bill_id, type, user_id, agent);
            if (!create) {
                return res.json({
                    status: "error",
                    message: "ບັນທຶກຂໍ້ມູນ ຜິດພາດ ລອງອີກຄັ້ງ",
                });
            }
        }
        return res.json({
            status: "success",
            message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
        });
    }
    else {
        const create = await (0, services_1.createService)(number, price, bill_id, type, user_id, agent);
        if (!create) {
            return res.json({
                status: "error",
                message: "ບັນທຶກຂໍ້ມູນ ຜິດພາດ ລອງອີກຄັ້ງ",
            });
        }
    }
    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    });
};
exports.createInvoiceController = createInvoiceController;
const getInvoiceByBillController = async (req, res) => {
    console.log(req.params.bill);
    if (!req.params.bill) {
        return res.json({
            status: "error",
            message: "ກະລຸນາລະບຸເລກທີບິນ",
        });
    }
    const bill = Number(req.params.bill);
    const invoice = await (0, services_1.getInvoiceByBillService)(bill);
    console.log(invoice);
    return res.json({
        status: "success",
        invoice: invoice ? invoice : [],
    });
};
exports.getInvoiceByBillController = getInvoiceByBillController;
const checkoutController = async (req, res) => {
    const bill = Number(req.body.bill_id);
    const invoice = await (0, services_1.checkoutService)(bill);
    if (!invoice) {
        return res.json({
            status: "error",
            message: "ກະລຸນາລະບຸເລກທີບິນ",
        });
    }
    return res.json({
        status: "success",
    });
};
exports.checkoutController = checkoutController;
const cancelBillController = async (req, res) => {
    const bill_id = Number(req.body.bill_id);
    const cancel_by = Number(req.body.user.user_id);
    const cancel_date = new Date();
    const cancel = await (0, services_1.cancelBillService)(bill_id, cancel_by, cancel_date);
    if (!cancel) {
        return res.json({
            status: "error",
            message: "ບໍ່ສາມາດຍົກເລີກໃບບິນ",
        });
    }
    return res.json({
        status: "success",
        message: "ຍົກເລີກໃບບິນ ສຳເລັດ",
    });
};
exports.cancelBillController = cancelBillController;
