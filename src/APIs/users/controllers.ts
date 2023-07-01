import { Request, Response } from "express"
import { checkUserService, createUserService, deleteUserService, getUsersService, updateUserAndPasswordService, updateUserLoginService, updateUserService } from "./services";
import bcrypt from 'bcryptjs'
import { sign } from "../../utils/jwt";

export const getUserController = async (req: Request, res: Response) => {

    const role = req.body.user.role
    const created_by = Number(req.body.user.created_by)

    let users = await getUsersService(created_by, role)
    if (!users) users = []

    return res.json({
        status: "success",
        users
    })
}


export const createUserController = async (req: Request, res: Response) => {

    const username = req.body.username;
    const password = req.body.password;
    const created_by = req.body.user.user_id
    const role = req.body.role
    const percentage = req.body.percentage

    const check = await checkUserService(username)
    if (check) {
        return res.json({
            status: "error",
            message: "ຜູ້ໃຊ້ງານນີ້ ມີໃນລະບົບແລ້ວ",
        })
    }
    const hash = await bcrypt.hashSync(password, 10)

    const createUser = await createUserService(username, hash, created_by, percentage, role)

    if (!createUser) {
        return res.json({
            status: "error",
            message: "ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ",
        })
    }

    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    })
}

export const loginController = async (req: Request, res: Response) => {
    const username = req.body.username;
    const password = req.body.password;

    const check = await checkUserService(username)
    if (!check) {
        return res.json({
            status: "error",
            message: "ຊື່ຜູ້ໃຊ້ນີ້ ບໍ່ມີໃນລະບົບ",
        })
    }

    const compare = await bcrypt.compareSync(password, check.password)
    if (!compare) {
        return res.json({
            status: "error",
            message: "ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ",
        })
    }

    if (compare && !check.status) {
        return res.json({
            status: "error",
            message: "ບັນຊີນີ້ຖືກປິດໃຊ້ງານຊົ່ວຄາວ",
        })
    }
    const last_login = new Date()

    const userLatest = await updateUserLoginService(check.user_id, last_login)
    const _user = { ...userLatest, password: null }

    const token = await sign(_user)
    return res.json({
        status: "success",
        token: token,
        token_type: "Bearer",
        user: _user,
    })


}

export const updateUserController = async (req: Request, res: Response) => {
    const telephone = req.body.telephone;
    const whatsapp = req.body.whatsapp;
    const password = `${req.body.password}`.trim();
    const change_password = req.body.change_password;
    const password_confirm = req.body.password_confirm;
    const address = req.body.address;
    const full_name = req.body.full_name;
    const last_login = new Date()
    const status = true
    const user_id = req.body.user_id

    const check = await checkUserService(whatsapp)
    if (check && check.user_id != user_id) {
        return res.json({
            status: "error",
            message: "ໝາຍເລກ Whatsapp ມີໃນລະບົບແລ້ວ",
        })
    }

    if (change_password && password.length >= 8 && (password != password_confirm)) {
        return res.json({
            status: "error",
            message: "ລະຫັດຜ່ານບໍ່ກົງກັນ",
        })
    } else if (change_password && password.length >= 8 && (password == password_confirm)) {
        const hash = await bcrypt.hashSync(password, 10)
        await updateUserAndPasswordService({ ...req.body, password: hash })
        return res.json({
            status: "success",
            message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ",
        })
    }


    await updateUserService({ telephone, whatsapp, address, full_name, status, user_id })
    return res.json({
        status: "success",
        message: "ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ",
    })

}

export const deleteUserController = async (req: Request, res: Response) => {
    const user_id = Number(req.params.id)

    if (typeof user_id == "number") {
        await deleteUserService(user_id)
        return res.json({
            status: "success",
            message: "ລົບຂໍ້ມູນສຳເລັດແລ້ວ",
        })
    }

    return res.json({
        status: "error",
        message: "ບໍ່ພົບຂໍ້ມູນຜູ້ໃຊ້ງານ",
    })
}

export const getMeController = async (req: Request, res: Response) => {
    console.log(req.body.user)
    return res.json({
        status: "success",
        user: req.body.user,
    })
}
