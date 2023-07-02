"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeController = exports.toggleUserController = exports.deleteUserController = exports.updateUserController = exports.loginController = exports.createUserController = exports.getUserController = void 0;
const services_1 = require("./services");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../../utils/jwt");
const environment_1 = __importDefault(require("../../utils/environment"));
const getUserController = async (req, res) => {
    const role = `${req.body.user.role}`.toLocaleLowerCase();
    const created_by = Number(req.body.user.created_by);
    let users = await (0, services_1.getUsersService)(created_by, role);
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
    const created_by = Number(req.body.agent);
    const role = req.body.role;
    const percentage = Number(req.body.percentage);
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
    console.log({ check });
    const _user = { ...check, password: null };
    const token = await (0, jwt_1.sign)(_user);
    await (0, services_1.updateUserLoginService)(check.user_id, last_login, token);
    return res.json({
        status: "success",
        token: token,
        token_type: "Bearer",
        user: _user,
    });
};
exports.loginController = loginController;
const updateUserController = async (req, res) => {
    const password = req.body.password;
    const agent = Number(req.body.agent);
    const role = req.body.role;
    const percentage = Number(req.body.percentage);
    const user_id = Number(req.body.user_id);
    const changePassword = req.body.changePassword;
    const hash = await bcryptjs_1.default.hashSync(password, 10);
    const user = await (0, services_1.updateUserService)(user_id, hash, agent, percentage, role, changePassword);
    if (!user) {
        return res.json({
            status: "error",
            message: "ບັນທຶກຂໍ້ມູນການແກ້ໄຂ ຜິດພາດ",
        });
    }
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
const toggleUserController = async (req, res) => {
    const user_id = Number(req.body.user_id);
    const status = req.body.status;
    const role = `${req.body.role}`.toLocaleLowerCase();
    if (typeof user_id == "number") {
        await (0, services_1.toggleUserUserService)(user_id, status, role);
        return res.json({
            status: "success",
            message: "ປິດບັນຊີຜູ້ ໃຊ້ງານ ສຳເລັດແລ້ວ",
        });
    }
    return res.json({
        status: "error",
        message: "ບໍ່ພົບຂໍ້ມູນຜູ້ໃຊ້ງານ",
    });
};
exports.toggleUserController = toggleUserController;
const getMeController = async (req, res) => {
    const header = req.headers[environment_1.default.JWT_HEADER];
    const user_id = Number(req.body.user.user_id);
    if (!header) {
        return res.json({
            status: "error",
            user: 'Token unauthorized',
        });
    }
    const token = `${header}`.split(' ')[1];
    const user = await (0, services_1.checkTokenService)(user_id, token);
    if (!user || (user && !user.status)) {
        return res.json({
            status: "error",
            message: "Invalid"
        });
    }
    return res.json({
        status: "success",
        user: req.body.user,
    });
};
exports.getMeController = getMeController;
