"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeController = exports.deleteUserController = exports.updateUserController = exports.loginController = exports.createUserController = exports.getUserController = void 0;
const services_1 = require("./services");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../utils/jwt");
const getUserController = async (req, res) => {
    let users = await (0, services_1.getUsersService)();
    if (!users)
        users = [];
    return res.json({
        status: "success",
        users
    });
};
exports.getUserController = getUserController;
const createUserController = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const created_by = req.body.user.user_id;
    const role = req.body.role;
    const percentage = req.body.percentage;
    const check = await (0, services_1.checkUserService)(username);
    if (check) {
        return res.json({
            status: "error",
            message: "ຜູ້ໃຊ້ງານນີ້ ມີໃນລະບົບແລ້ວ",
        });
    }
    const hash = await bcryptjs_1.default.hashSync(password, 10);
    const createUser = await (0, services_1.createUserService)(username, hash, created_by, percentage, role);
    if (!createUser) {
        return res.json({
            status: "error",
            message: "ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ",
        });
    }
    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    });
};
exports.createUserController = createUserController;
const loginController = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const check = await (0, services_1.checkUserService)(username);
    if (!check) {
        return res.json({
            status: "error",
            message: "ຊື່ຜູ້ໃຊ້ນີ້ ບໍ່ມີໃນລະບົບ",
        });
    }
    const compare = await bcryptjs_1.default.compareSync(password, check.password);
    if (!compare) {
        return res.json({
            status: "error",
            message: "ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ",
        });
    }
    if (compare && !check.status) {
        return res.json({
            status: "error",
            message: "ບັນຊີນີ້ຖືກປິດໃຊ້ງານຊົ່ວຄາວ",
        });
    }
    const last_login = new Date();
    const userLatest = await (0, services_1.updateUserLoginService)(check.user_id, last_login);
    const _user = { ...userLatest, password: null };
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
const getMeController = async (req, res) => {
    console.log(req.body.user);
    return res.json({
        status: "success",
        user: req.body.user,
    });
};
exports.getMeController = getMeController;
