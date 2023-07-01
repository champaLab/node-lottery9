"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBillService = exports.checkoutService = exports.getLotteryService = exports.getInvoiceByBillService = exports.createManyService = exports.createService = exports.getBillService = exports.getAwardService = void 0;
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const getAwardService = async () => {
    try {
        const result = await prismaClient_1.default.tbl_award.findFirst({ orderBy: { award_id: "desc" } });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getAwardService = getAwardService;
const getBillService = async (user_id) => {
    try {
        const result = await prismaClient_1.default.tbl_bills.create({ data: { user_id } });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getBillService = getBillService;
const createService = async (number, price, bill_id, type, user_id, agent) => {
    try {
        const created_at = new Date();
        const result = await prismaClient_1.default.tbl_invoices.create({
            data: {
                number: number,
                price: Number(price),
                type: type,
                bill_id: Number(bill_id),
                created_at: new Date(),
                created_by: Number(user_id),
                agent,
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
exports.createService = createService;
const createManyService = async (lottery) => {
    try {
        const result = await prismaClient_1.default.tbl_invoices.createMany({
            data: lottery
        });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.createManyService = createManyService;
const getInvoiceByBillService = async (bill_id) => {
    try {
        const result = await prismaClient_1.default.tbl_invoices.findMany({
            where: { bill_id }
        });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getInvoiceByBillService = getInvoiceByBillService;
const getLotteryService = async (number) => {
    try {
        const result = await prismaClient_1.default.tbl_lottery.findFirst({
            where: { number }
        });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getLotteryService = getLotteryService;
const checkoutService = async (bill_id) => {
    try {
        const result = await prismaClient_1.default.$queryRaw `
        UPDATE tbl_invoices SET checkout = 'yes' WHERE bill_id = ${bill_id}
        `;
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.checkoutService = checkoutService;
const cancelBillService = async (bill_id, cancel_by, cancel_date) => {
    try {
        const result = await prismaClient_1.default.$queryRaw `
        UPDATE tbl_invoices SET cancel = 'yes', cancel_by = ${cancel_by}, cancel_date=${cancel_date}  WHERE bill_id = ${bill_id}
        `;
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.cancelBillService = cancelBillService;
