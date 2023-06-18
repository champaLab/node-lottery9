"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLotteryService = exports.checkNumberService = exports.getLotteryService = void 0;
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const getLotteryService = async () => {
    try {
        const result = await prismaClient_1.default.tbl_lottery.findMany({ orderBy: { number: "asc" } });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getLotteryService = getLotteryService;
const checkNumberService = async (number) => {
    try {
        const result = await prismaClient_1.default.tbl_lottery.findFirst({ where: { number } });
        await prismaClient_1.default.$disconnect();
        return result;
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.checkNumberService = checkNumberService;
const createLotteryService = async (lottery) => {
    try {
        const result = await prismaClient_1.default.tbl_lottery.create({
            data: {
                number: lottery.number,
                group: lottery.group,
                lao_limit2: lottery.lao_limit2,
                lao_limit3: lottery.lao_limit3,
                thai_limit2: lottery.thai_limit2,
                thai_limit3: lottery.thai_limit3,
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
exports.createLotteryService = createLotteryService;
// export const updateUserLoginService = async (user_id: number, last_login: Date) => {
//     try {
//         const _user = await prismaClient.tbl_users.update({ where: { user_id }, data: { last_login } })
//         await prismaClient.$disconnect()
//         return _user
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }
// export const updateUserAndPasswordService = async (user: tbl_users) => {
//     try {
//         const _user = await prismaClient.tbl_users.update({ where: { user_id: user.user_id }, data: user })
//         await prismaClient.$disconnect()
//         return _user
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }
// export const updateUserService = async (user: IUser) => {
//     try {
//         const _user = await prismaClient.tbl_users.update({ where: { user_id: user.user_id }, data: user })
//         await prismaClient.$disconnect()
//         return _user
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }
// export const deleteUserService = async (user_id: number) => {
//     try {
//         const _user = await prismaClient.tbl_users.delete({ where: { user_id } })
//         prismaClient.$disconnect()
//         return _user
//     } catch (error) {
//         console.log(error)
//         return false
//     }
// }
