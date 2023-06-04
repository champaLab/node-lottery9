"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.updateUserAndPasswordService = exports.updateUserLoginService = exports.createUserService = exports.checkUserService = exports.getUsersService = void 0;
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const getUsersService = async () => {
    try {
        const users = await prismaClient_1.default.tbl_users.findMany();
        await prismaClient_1.default.$disconnect();
        return users;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.getUsersService = getUsersService;
const checkUserService = async (whatsapp) => {
    try {
        const user = await prismaClient_1.default.tbl_users.findFirst({
            where: { whatsapp }
        });
        prismaClient_1.default.$disconnect();
        return user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.checkUserService = checkUserService;
const createUserService = async (user) => {
    try {
        const _user = await prismaClient_1.default.tbl_users.create({ data: user });
        prismaClient_1.default.$disconnect();
        return _user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.createUserService = createUserService;
const updateUserLoginService = async (user_id, last_login) => {
    try {
        const _user = await prismaClient_1.default.tbl_users.update({ where: { user_id }, data: { last_login } });
        prismaClient_1.default.$disconnect();
        return _user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.updateUserLoginService = updateUserLoginService;
const updateUserAndPasswordService = async (user) => {
    try {
        const _user = await prismaClient_1.default.tbl_users.update({ where: { user_id: user.user_id }, data: user });
        prismaClient_1.default.$disconnect();
        return _user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.updateUserAndPasswordService = updateUserAndPasswordService;
const updateUserService = async (user) => {
    try {
        const _user = await prismaClient_1.default.tbl_users.update({ where: { user_id: user.user_id }, data: user });
        prismaClient_1.default.$disconnect();
        return _user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.updateUserService = updateUserService;
const deleteUserService = async (user_id) => {
    try {
        const _user = await prismaClient_1.default.tbl_users.delete({ where: { user_id } });
        prismaClient_1.default.$disconnect();
        return _user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.deleteUserService = deleteUserService;
