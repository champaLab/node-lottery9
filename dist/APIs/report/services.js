"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAwardNumberService = exports.getAwardService = exports.summaryAwardAgentService = exports.getSummaryByAgentService = exports.getLotterySearchService = exports.getLotteryByBillService = exports.getLotterySaleService = void 0;
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const getLotterySaleService = async (role, created_by, date, type, agent) => {
    try {
        console.log({ agent, role });
        let result = [];
        if (role === 'admin' || role == 'superadmin') {
            result = await prismaClient_1.default.$queryRaw `
            SELECT number, SUM(price) as price FROM tbl_invoices 
            WHERE DATE(created_at) = ${date}
            AND checkout = 'yes'
            AND type = ${type}
            AND cancel IS NULL
            GROUP BY number 
            ORDER BY number asc
            `;
        }
        else if (role === 'agent') {
            result = await prismaClient_1.default.$queryRaw `
            SELECT number, SUM(price) as price FROM tbl_invoices 
            WHERE DATE(created_at) = ${date}
            AND checkout = 'yes' 
            AND (agent = ${created_by} OR created_by = ${created_by})
            AND type = ${type}
            AND cancel IS NULL
            GROUP BY number 
            ORDER BY number asc
            `;
        }
        else {
            result = await prismaClient_1.default.$queryRaw `
            SELECT number, SUM(price) as price FROM tbl_invoices 
            WHERE DATE(created_at) = ${date}
            AND checkout = 'yes' 
            AND created_by = ${created_by}
            AND type = ${type}
            AND cancel IS NULL
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
            AND I.checkout = 'yes'
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
const getSummaryByAgentService = async (created_at, type, agent) => {
    try {
        let result = await prismaClient_1.default.$queryRaw `
            SELECT   US.username, US.percentage,
            (SUM(IV.price) * US.percentage/100) as percent,
            SUM(IV.price) as price
            FROM tbl_invoices IV
            LEFT JOIN tbl_users AS US
            ON US.user_id = IV.agent
            WHERE DATE(IV.created_at) = ${created_at}
            AND IV.checkout = 'yes'
            AND IV.agent = ${agent}
            AND IV.type = ${type}
            AND IV.cancel IS NULL
            GROUP BY IV.created_by
            `;
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getSummaryByAgentService = getSummaryByAgentService;
const summaryAwardAgentService = async (type, two, three, role, created_by) => {
    try {
        let result = null;
        if (role === 'admin' || role == 'superadmin') {
            result = await prismaClient_1.default.$queryRaw `
            SELECT  US.username, IV.number,
            COUNT(IV.number) as count,
            SUM(IV.price) as price
            FROM tbl_invoices IV
            LEFT JOIN tbl_users AS US
            ON US.user_id = IV.agent
            WHERE (IV.number = ${two} OR IV.number = ${three})
            AND IV.checkout = 'yes'
            AND IV.type = ${type}
            AND IV.cancel IS NULL
            GROUP BY IV.agent, IV.number
            `;
        }
        else if (role === 'agent') {
            result = await prismaClient_1.default.$queryRaw `
            SELECT  US.username, IV.number,
            COUNT(IV.number) as count,
            SUM(IV.price) as price
            FROM tbl_invoices IV
            LEFT JOIN tbl_users AS US
            ON US.user_id = IV.agent
            WHERE (IV.number = ${two} OR IV.number = ${three})
            AND IV.agent = ${created_by}
            AND IV.checkout = 'yes'
            AND IV.type = ${type}
            AND IV.cancel IS NULL
            GROUP BY IV.agent, IV.number
            `;
        }
        else {
            result = await prismaClient_1.default.$queryRaw `
            SELECT  US.username, IV.number,
            COUNT(IV.number) as count,
            SUM(IV.price) as price
            FROM tbl_invoices IV
            LEFT JOIN tbl_users AS US
            ON US.user_id = IV.agent
            WHERE (IV.number = ${two} OR IV.number = ${three})
            AND IV.created_by = ${created_by}
            AND IV.checkout = 'yes'
            AND IV.type = ${type}
            AND IV.cancel IS NULL
            GROUP BY IV.agent, IV.number
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
exports.summaryAwardAgentService = summaryAwardAgentService;
const getAwardService = async () => {
    try {
        const result = await prismaClient_1.default.tbl_award.findFirst({
            orderBy: { award_id: 'desc' }
        });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getAwardService = getAwardService;
const getAwardNumberService = async (date) => {
    try {
        const result = await prismaClient_1.default.tbl_lottery_history.findFirst({
            where: { date }
        });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getAwardNumberService = getAwardNumberService;
