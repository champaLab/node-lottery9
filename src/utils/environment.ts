import { config } from "dotenv";
config()

export default {
    NODE_PORT: parseInt(`${process.env.NODE_PORT}`) || 8899,
    BASE_PATH: process.env.BASE_PATH || "/api/v1",
    NODE_HOST: process.env.NODE_HOST || "0.0.0.0",
    PWD: process.env.PWD || process.cwd(),
    DATABASE_URL: process.env.DATABASE_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
};