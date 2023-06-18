"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLotterySearchService = exports.getLotteryByBillService = exports.getLotterySaleService = void 0;
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const getLotterySaleService = async (role, user_id, date, type) => {
    try {
        let result = [];
        if (role.toLocaleLowerCase() == 'admin' || role.toLocaleLowerCase() == 'superadmin') {
            result = await prismaClient_1.default.$queryRaw `
            SELECT number, SUM(price) as price FROM tbl_invoices 
            WHERE DATE(created_at) = ${date}
            AND checkout = 'yes'
            AND type = ${type}
            AND cancel = false
            GROUP BY number 
            ORDER BY number asc
            `;
        }
        else {
            result = await prismaClient_1.default.$queryRaw `
            SELECT number, SUM(price) as price FROM tbl_invoices 
            WHERE DATE(created_at) = ${date}
            AND checkout = 'yes' 
            AND created_by = ${user_id}
            AND type = ${type}
            AND cancel = false
            GROUP BY number 
            ORDER BY number asc
            `;
        }
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getLotterySaleService = getLotterySaleService;
const getLotteryByBillService = async (created_at, type) => {
    try {
        let result = await prismaClient_1.default.$queryRaw `
            SELECT 
            I.invoice_id, 
            I.number,
            I.bill_id,
            I.price, 
            I.cancel, 
            I.type, 
            DATE_FORMAT(I.created_at, '%d-%m-%Y %H:%i') AS created_at, 
            DATE_FORMAT(I.cancel_date, '%d-%m-%Y %H:%i') AS cancel_date, 
            I.reason, 
            I.checkout,
            U.username
            FROM tbl_invoices I
            LEFT JOIN tbl_users U ON  I.cancel_by = U.user_id 
            WHERE  DATE(I.created_at) = ${created_at}
            AND I.type = ${type}
            ORDER BY I.bill_id DESC
            `;
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getLotteryByBillService = getLotteryByBillService;
const getLotterySearchService = async (bill_id, type) => {
    try {
        let result = await prismaClient_1.default.$queryRaw `
            SELECT 
            I.invoice_id, 
            I.bill_id,
            I.number, 
            I.price, 
            I.cancel, 
            I.type, 
            DATE_FORMAT(I.created_at, '%d-%m-%Y %H:%i') AS created_at, 
            DATE_FORMAT(I.cancel_date, '%d-%m-%Y %H:%i') AS cancel_date, 
            I.reason, 
            I.checkout,
            U.username
            FROM tbl_invoices I
            LEFT JOIN tbl_users U ON  I.cancel_by = U.user_id 
            WHERE  I.bill_id = ${bill_id}
            AND I.type = ${type}
            ORDER BY I.number  
            `;
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getLotterySearchService = getLotterySearchService;
