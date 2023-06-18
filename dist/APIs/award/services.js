"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAwardService = exports.getAwardService = void 0;
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
const createAwardService = async (award) => {
    try {
        const result = await prismaClient_1.default.tbl_award.create({
            data: {
                lao2: Number(award.lao2),
                lao3: Number(award.lao3),
                thai2: Number(award.thai2),
                thai3: Number(award.thai3),
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
exports.createAwardService = createAwardService;
