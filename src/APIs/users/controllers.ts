import { Request, Response } from "express"
import { checkTokenService, checkUserService, createUserService, deleteUserService, getUsersService, toggleUserUserService, updateUserAndPasswordService, updateUserLoginService, updateUserService } from "./services";
import bcrypt from 'bcryptjs'
import { sign } from "../../utils/jwt";
import environment from "../../utils/environment";

export const getUserController = async (req: Request, res: Response) => {

    const role = `${req.body.user.role}`.toLocaleLowerCase()
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
    const created_by = Number(req.body.agent)
    const role = req.body.role
    const percentage = Number(req.body.percentage)

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
    console.log({ check })

    const _user = { ...check, password: null }
    const token = await sign(_user)

    await updateUserLoginService(check.user_id, last_login, token)

    return res.json({
        status: "success",
        token: token,
        token_type: "Bearer",
        user: _user,
    })


}

export const updateUserController = async (req: Request, res: Response) => {
    const password = req.body.password
    const agent = Number(req.body.agent)
    const role = req.body.role
    const percentage = Number(req.body.percentage)
    const user_id = Number(req.body.user_id)
    const changePassword = req.body.changePassword

    const hash = await bcrypt.hashSync(password, 10)

    const user = await updateUserService(user_id, hash, agent, percentage, role, changePassword)
    if (!user) {
        return res.json({
            status: "error",
            message: "ບັນທຶກຂໍ້ມູນການແກ້ໄຂ ຜິດພາດ",
        })
    }

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
export const toggleUserController = async (req: Request, res: Response) => {
    const user_id = Number(req.body.user_id)
    const status = req.body.status
    const role = `${req.body.role}`.toLocaleLowerCase()

    if (typeof user_id == "number") {
        await toggleUserUserService(user_id, status, role)
        return res.json({
            status: "success",
            message: "ປິດບັນຊີຜູ້ ໃຊ້ງານ ສຳເລັດແລ້ວ",
        })
    }

    return res.json({
        status: "error",
        message: "ບໍ່ພົບຂໍ້ມູນຜູ້ໃຊ້ງານ",
    })
}

export const getMeController = async (req: Request, res: Response) => {

    const header = req.headers[environment.JWT_HEADER]
    const user_id = Number(req.body.user.user_id)
    if (!header) {
        return res.json({
            status: "error",
            user: 'Token unauthorized',
        })
    }

    const token = `${header}`.split(' ')[1]
    const user = await checkTokenService(user_id, token)
    if (!user || (user && !user.status)) {
        return res.json({
            status: "error",
            message: "Invalid"
        })
    }

    return res.json({
        status: "success",
        user: req.body.user,
    })
}
