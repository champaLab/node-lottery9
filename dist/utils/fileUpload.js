"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFileName = exports.upload = void 0;
const multer_1 = __importStar(require("multer"));
const path_1 = require("path");
const environment_1 = __importDefault(require("./environment"));
const dayjs_1 = __importDefault(require("dayjs"));
const upload = (directory = '', separateByDate = false) => {
    return (0, multer_1.default)({
        storage: (0, multer_1.diskStorage)({
            destination: (0, path_1.resolve)(`${environment_1.default.PWD}/uploads/${directory}${separateByDate ? `/${(0, dayjs_1.default)().format('YYYY-MM-DD')}` : ''}`),
            filename: (req, file, cb) => {
                console.log(file);
                const date = Date.now();
                const fileName = setFileName((0, dayjs_1.default)(date).format('YYYYMMDD'), date, '.jpg');
                cb(null, `${fileName}`);
            },
        }),
    });
};
exports.upload = upload;
function setFileName(date, timestamp, ext) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return `${date + timestamp + text + ext}`;
}
exports.setFileName = setFileName;
