"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const extension_1 = __importDefault(require("../utils/extension"));
extension_1.default; // do not delete extension
const prismaClient = new client_1.PrismaClient({
    // log: ['query'],
    errorFormat: 'pretty',
});
exports.default = prismaClient;
