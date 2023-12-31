"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTokenService = exports.toggleUserUserService = exports.deleteUserService = exports.updateUserService = exports.updateUserAndPasswordService = exports.updateUserLoginService = exports.createUserService = exports.checkUserService = exports.getUsersService = void 0;
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const getUsersService = async (created_by, role) => {
    try {
        if (role === "admin") {
            const users = await prismaClient_1.default.tbl_users.findMany({
                select: {
                    created_at: true,
                    created_by: true,
                    last_login: true,
                    percentage: true,
                    role: true,
                    status: true,
                    updated_at: true,
                    user_id: true,
                    username: true,
                }
            });
            await prismaClient_1.default.$disconnect();
            return users;
        }
        else if (role === "agent") {
            const users = await prismaClient_1.default.tbl_users.findMany({
                where: { created_by },
                select: {
                    created_at: true,
                    created_by: true,
                    last_login: true,
                    percentage: true,
                    role: true,
                    status: true,
                    updated_at: true,
                    user_id: true,
                    username: true,
                }
            });
            await prismaClient_1.default.$disconnect();
            return users;
        }
        return [];
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.getUsersService = getUsersService;
const checkUserService = async (username) => {
    try {
        const user = await prismaClient_1.default.tbl_users.findFirst({ where: { username } });
        await prismaClient_1.default.$disconnect();
        return user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.checkUserService = checkUserService;
const createUserService = async (username, password, created_by, percentage, role) => {
    try {
        const _user = await prismaClient_1.default.tbl_users.create({
            data: {
                username,
                password,
                created_by,
                percentage,
                role,
            }
        });
        await prismaClient_1.default.$disconnect();
        return _user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.createUserService = createUserService;
const updateUserLoginService = async (user_id, last_login, token) => {
    try {
        const _user = await prismaClient_1.default.tbl_users.update({ where: { user_id }, data: { last_login, token } });
        await prismaClient_1.default.$disconnect();
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
        await prismaClient_1.default.$disconnect();
        return _user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.updateUserAndPasswordService = updateUserAndPasswordService;
const updateUserService = async (user_id, password, agent, percentage, role, changePassword) => {
    try {
        if (changePassword) {
            const _user = await prismaClient_1.default.tbl_users.update({
                where: { user_id },
                data: {
                    password,
                    created_by: agent,
                    percentage,
                    role,
                    updated_at: new Date()
                }
            });
            await prismaClient_1.default.$disconnect();
            return _user;
        }
        const _user = await prismaClient_1.default.tbl_users.update({
            where: { user_id }, data: {
                created_by: agent,
                percentage,
                role,
                updated_at: new Date()
            }
        });
        await prismaClient_1.default.$disconnect();
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
        await prismaClient_1.default.$disconnect();
        return _user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.deleteUserService = deleteUserService;
const toggleUserUserService = async (user_id, status, role) => {
    try {
        if (role === 'admin' || role === 'agent') {
            const _user = await prismaClient_1.default.tbl_users.updateMany({ where: { created_by: user_id }, data: { status: status ? false : true, token: null, updated_at: new Date() } });
            await prismaClient_1.default.$disconnect();
            return _user;
        }
        const _user = await prismaClient_1.default.tbl_users.update({ where: { user_id }, data: { status: status ? false : true, token: null, updated_at: new Date() } });
        await prismaClient_1.default.$disconnect();
        return _user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.toggleUserUserService = toggleUserUserService;
const checkTokenService = async (user_id, token) => {
    try {
        const _user = await prismaClient_1.default.tbl_users.findFirst({ where: { user_id, token } });
        await prismaClient_1.default.$disconnect();
        return _user;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
exports.checkTokenService = checkTokenService;
