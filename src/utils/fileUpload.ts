import multer, { diskStorage } from 'multer'
import { resolve } from 'path'
import { Request } from 'express'
import environment from './environment'
import dayjs from 'dayjs'

export const upload = (directory: string = '', separateByDate = false) => {
    return multer({
        storage: diskStorage({
            destination: resolve(
                `${environment.PWD}/uploads/${directory}${separateByDate ? `/${dayjs().format('YYYY-MM-DD')}` : ''}`
            ),
            filename: (req, file, cb) => {
                console.log(file)
                const date = Date.now()
                const fileName = setFileName(dayjs(date).format('YYYYMMDD'), date, '.jpg');
                cb(null, `${fileName}`);
            },
        }),
    })
}


export function setFileName(date: any, timestamp: number, ext: string): string {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    return `${date + timestamp + text + ext}`
}