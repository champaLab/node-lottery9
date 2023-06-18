"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLotteryController = exports.getLotteryController = void 0;
const services_1 = require("./services");
const getLotteryController = async (req, res) => {
    let lottery = await (0, services_1.getLotteryService)();
    if (!lottery)
        lottery = [];
    return res.json({
        status: "success",
        lottery
    });
};
exports.getLotteryController = getLotteryController;
const createLotteryController = async (req, res) => {
    const number = req.body.number;
    const check = await (0, services_1.checkNumberService)(number);
    if (check) {
        return res.json({
            status: "error",
            message: "ເລກສ່ຽງນີ້ ມີໃນລະບົບແລ້ວ",
        });
    }
    const createUser = await (0, services_1.createLotteryService)(req.body);
    if (!createUser) {
        return res.json({
            status: "error",
            message: "ບັນທຶກຂໍ້ມູນ ຜິດພາດ ລອງອີກຄັ້ງ",
        });
    }
    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    });
};
exports.createLotteryController = createLotteryController;
// export const loginController = async (req: Request, res: Response) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const check = await checkUserService(username)
//     if (!check) {
//         return res.json({
//             status: "error",
//             message: "ຊື່ຜູ້ໃຊ້ນີ້ ບໍ່ມີໃນລະບົບ",
//         })
//     }
//     const compare = await bcrypt.compareSync(password, check.password)
//     if (!compare) {
//         return res.json({
//             status: "error",
//             message: "ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ",
//         })
//     }
//     if (compare && !check.status) {
//         return res.json({
//             status: "error",
//             message: "ບັນຊີນີ້ຖືກປິດໃຊ້ງານຊົ່ວຄາວ",
//         })
//     }
//     const last_login = new Date()
//     const userLatest = await updateUserLoginService(check.user_id, last_login)
//     const _user = { ...userLatest, password: null }
//     const token = await sign(_user)
//     return res.json({
//         status: "success",
//         token: token,
//         token_type: "Bearer",
//         user: _user,
//     })
// }
// export const updateUserController = async (req: Request, res: Response) => {
//     const telephone = req.body.telephone;
//     const whatsapp = req.body.whatsapp;
//     const password = `${req.body.password}`.trim();
//     const change_password = req.body.change_password;
//     const password_confirm = req.body.password_confirm;
//     const address = req.body.address;
//     const full_name = req.body.full_name;
//     const last_login = new Date()
//     const status = true
//     const user_id = req.body.user_id
//     const check = await checkUserService(whatsapp)
//     if (check && check.user_id != user_id) {
//         return res.json({
//             status: "error",
//             message: "ໝາຍເລກ Whatsapp ມີໃນລະບົບແລ້ວ",
//         })
//     }
//     if (change_password && password.length >= 8 && (password != password_confirm)) {
//         return res.json({
//             status: "error",
//             message: "ລະຫັດຜ່ານບໍ່ກົງກັນ",
//         })
//     } else if (change_password && password.length >= 8 && (password == password_confirm)) {
//         const hash = await bcrypt.hashSync(password, 10)
//         await updateUserAndPasswordService({ ...req.body, password: hash })
//         return res.json({
//             status: "success",
//             message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ",
//         })
//     }
//     await updateUserService({ telephone, whatsapp, address, full_name, status, user_id })
//     return res.json({
//         status: "success",
//         message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ",
//     })
// }
// export const deleteUserController = async (req: Request, res: Response) => {
//     const user_id = Number(req.params.id)
//     if (typeof user_id == "number") {
//         await deleteUserService(user_id)
//         return res.json({
//             status: "success",
//             message: "ລົບຂໍ້ມູນສຳເລັດແລ້ວ",
//         })
//     }
//     return res.json({
//         status: "error",
//         message: "ບໍ່ພົບຂໍ້ມູນຜູ້ໃຊ້ງານ",
//     })
// }
// export const getMeController = async (req: Request, res: Response) => {
//     console.log(req.body.user)
//     return res.json({
//         status: "success",
//         user: req.body.user,
//     })
// }
