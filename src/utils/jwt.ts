import jwt, { SignOptions } from 'jsonwebtoken'
import environment from './environment'
import { NextFunction, Request, Response } from 'express'


const i = "Champalab"
const s = "sonephetmnl@gmail.com"
const a = "https://champalab.com"

const signOption: SignOptions = {
    issuer: i,
    algorithm: 'RS256',
    subject: s,
    audience: a,
    expiresIn: "356day",
}

export const sign = (payload: any) => {
    const privateKey = environment.PRIVATE_KEY || ""


    return jwt.sign(payload, privateKey, signOption)

}

export const verify = (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers["x-signature"]
    let token = null
    if (headers) {
        token = `${headers}`.replace('Bearer ', '')
    }

    if (!token) {
        return res.json({
            status: "error",
            message: "Token is invalid"
        })
    }

    const public_key = environment.PUBLIC_KEY ?? ""

    jwt.verify(token, public_key, signOption, (error: any, decoded: any) => {
        if (error) {
            console.log(error)
            return res.json({
                status: "error",
                message: "Can not verify signature"
            })
        }
        req.body.user = decoded
        next()
    })
}