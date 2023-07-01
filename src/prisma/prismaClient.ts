import { PrismaClient } from "@prisma/client";
import extension from '../utils/extension'
extension // do not delete extension

const prismaClient = new PrismaClient({
    // log: ['query'],
    errorFormat: 'pretty',
})

export default prismaClient