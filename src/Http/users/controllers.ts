import { Request, Response } from "express"
import { checkUserService, createUserService, deleteUserService, updateUserAndPasswordService, updateUserLoginService, updateUserService } from "./services";
import bcrypt from 'bcryptjs'
import { sign } from "../../utils/jwt";

export const getUserController = async (req: Request, res: Response) => {




    return res.json({
        status: "error",
        message: "ເພີ່ມຂໍ້ມູນສຳເລັດ",
    })




}


export const createUserController = async (req: Request, res: Response) => {

    const telephone = req.body.telephone;
    const whatsapp = req.body.whatsapp;
    const password = req.body.password;
    const address = req.body.address;
    const full_name = req.body.full_name;
    const last_login = new Date()
    const status = true
    const user_id = req.body.user_id
    const role = req.body.role

    const check = await checkUserService(whatsapp)
    if (check) {
        return res.json({
            status: "error",
            message: "ໝາຍເລກ Whatsapp ມີໃນລະບົບແລ້ວ",
        })
    }
    const hash = await bcrypt.hashSync(password, 10)

    const createUser = await createUserService({ telephone, whatsapp, password: hash, address, full_name, last_login, status, user_id, role })

    if (!createUser) {
        return res.json({
            status: "error",
            message: "ບັນທຶກຂໍ້ມູນບໍ່ສຳເລັດ",
        })
    }

    const user = { ...createUser, password: null }

    return res.json({
        status: "success",
        message: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
    })
}

export const loginController = async (req: Request, res: Response) => {
    const whatsapp = req.body.whatsapp;
    const password = req.body.password;
    console.log("ok")

    const check = await checkUserService(whatsapp)
    if (!check) {
        return res.json({
            status: "error",
            message: "ໝາຍເລກ Whatsapp ບໍ່ມີໃນລະບົບແລ້ວ",
        })
    }
    console.log("ok2")


    const compare = await bcrypt.compareSync(password, check.password)

    if (!compare) {
        return res.json({
            status: "error",
            message: "ໝາຍເລກ Whatsapp ຫຼື ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ",
        })
    }

    if (compare && !check.status) {
        return res.json({
            status: "error",
            message: "ບັນຊີນີ້ຖືກປິດໃຊ້ງານແລ້ວ",
        })
    }
    const last_login = new Date()

    const userLatest = await updateUserLoginService(check.user_id, last_login)
    const _user = { ...userLatest, password: null }
    console.log("ok3")

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