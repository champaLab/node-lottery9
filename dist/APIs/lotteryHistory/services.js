"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLotteryHistoryService = exports.getLotteryHistoryService = void 0;
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const dayjs_1 = __importDefault(require("dayjs"));
const getLotteryHistoryService = async () => {
    try {
        const result = await prismaClient_1.default.$queryRaw `
            SELECT * FROM tbl_lottery_history  ORDER BY  lottery_history_id desc LIMIT 20
        `;
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getLotteryHistoryService = getLotteryHistoryService;
const createLotteryHistoryService = async (number, user_id) => {
    try {
        const date = (0, dayjs_1.default)().format('YYYYMMDD');
        const result = await prismaClient_1.default.tbl_lottery_history.upsert({
            where: { date },
            create: {
                created_by: user_id,
                date,
                number,
            },
            update: {
                updated_by: user_id,
                updated_at: new Date(),
                number,
            },
        });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.createLotteryHistoryService = createLotteryHistoryService;
