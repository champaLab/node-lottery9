"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helperCheck = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const environment_1 = __importDefault(require("../../utils/environment"));
const helperCheck = (req, res) => {
    const helper = {
        ip: req.hostname,
        base_path: environment_1.default.BASE_PATH,
        message: "ok",
        time: (0, dayjs_1.default)().format("D-MM-YY HH:mm:ss")
    };
    console.log(req.hostname);
    return res.json(helper);
};
exports.helperCheck = helperCheck;
