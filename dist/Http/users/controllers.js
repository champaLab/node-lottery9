"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.loginController = exports.createUserController = exports.getUserController = void 0;
const services_1 = require("./services");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../utils/jwt");
const getUserController = async (req, res) => {
    return res.json({
        status: "error",
        message: "ເພີ່ມຂໍ້ມູນສຳເລັດ",
    });
};
exports.getUserController = getUserController;
const createUserController = async (req, res) => {
    const telephone = req.body.telephone;
    const whatsapp = req.body.whatsapp;
    const password = req.body.password;
    const address = req.body.address;
    const full_name = req.body.full_name;
    const last_login = new Date();
    const status = true;
    const user_id = req.body.user_id;
    const role = req.body.role;
    const check = await (0, services_1.checkUserService)(whatsapp);
    if (check) {
        return res.json({
            status: "error",
            message: "ໝາຍເລກ Whatsapp ມີໃນລະບົບແລ້ວ",
        });
    }
    const hash = await bcryptjs_1.default.hashSync(password, 10);
    const createUser = await (0, services_1.createUserService)({ telephone, whatsapp, password: hash, address, full_name, last_login, status, user_id, role });
    if (!createUser) {
        return res.json({
            status: "error",
            message: "ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ",
        });
    }
    const user = { ...createUser, password: null };
    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    });
};
exports.createUserController = createUserController;
const loginController = async (req, res) => {
    const whatsapp = req.body.whatsapp;
    const password = req.body.password;
    console.log("ok");
    const check = await (0, services_1.checkUserService)(whatsapp);
    if (!check) {
        return res.json({
            status: "error",
            message: "ໝາຍເລກ Whatsapp ບໍ່ມີໃນລະບົບແລ້ວ",
        });
    }
    console.log("ok2");
    const compare = await bcryptjs_1.default.compareSync(password, check.password);
    if (!compare) {
        return res.json({
            status: "error",
            message: "ໝາຍເລກ Whatsapp ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ",
        });
    }
    if (compare && !check.status) {
        return res.json({
            status: "error",
            message: "ບັນຊີນີ້ຖືກປິດໃຊ້ງານແລ້ວ",
        });
    }
    const last_login = new Date();
    const userLatest = await (0, services_1.updateUserLoginService)(check.user_id, last_login);
    const _user = { ...userLatest, password: null };
    console.log("ok3");
    const token = await (0, jwt_1.sign)(_user);
    return res.json({
        status: "success",
        token: token,
        token_type: "Bearer",
        user: _user,
    });
};
exports.loginController = loginController;
const updateUserController = async (req, res) => {
    const telephone = req.body.telephone;
    const whatsapp = req.body.whatsapp;
    const password = `${req.body.password}`.trim();
    const change_password = req.body.change_password;
    const password_confirm = req.body.password_confirm;
    const address = req.body.address;
    const full_name = req.body.full_name;
    const last_login = new Date();
    const status = true;
    const user_id = req.body.user_id;
    const check = await (0, services_1.checkUserService)(whatsapp);
    if (check && check.user_id != user_id) {
        return res.json({
            status: "error",
            message: "ໝາຍເລກ Whatsapp ມີໃນລະບົບແລ້ວ",
        });
    }
    if (change_password && password.length >= 8 && (password != password_confirm)) {
        return res.json({
            status: "error",
            message: "ລະຫັດຜ່ານບໍ່ກົງກັນ",
        });
    }
    else if (change_password && password.length >= 8 && (password == password_confirm)) {
        const hash = await bcryptjs_1.default.hashSync(password, 10);
        await (0, services_1.updateUserAndPasswordService)({ ...req.body, password: hash });
        return res.json({
            status: "success",
            message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ",
        });
    }
    await (0, services_1.updateUserService)({ telephone, whatsapp, address, full_name, status, user_id });
    return res.json({
        status: "success",
        message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ",
    });
};
exports.updateUserController = updateUserController;
const deleteUserController = async (req, res) => {
    const user_id = Number(req.params.id);
    if (typeof user_id == "number") {
        await (0, services_1.deleteUserService)(user_id);
        return res.json({
            status: "success",
            message: "ລົບຂໍ້ມູນສຳເລັດແລ້ວ",
        });
    }
    return res.json({
        status: "error",
        message: "ບໍ່ພົບຂໍ້ມູນຜູ້ໃຊ້ງານ",
    });
};
exports.deleteUserController = deleteUserController;
