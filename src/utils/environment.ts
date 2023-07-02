import { config } from "dotenv";
config()

export default {
    NODE_PORT: parseInt(`${process.env.NODE_PORT}`) || 8899,
    BASE_PATH: process.env.BASE_PATH || "/api",
    NODE_HOST: process.env.NODE_HOST || "0.0.0.0",
    PWD: process.env.PWD || process.cwd(),
    DATABASE_URL: process.env.DATABASE_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    DOMAIN_IMAGE: process.env.DOMAIN_IMAGE,
    METRICS_PORT: parseInt(`${process.env.METRICS_PORT}`) || 8800,
    JWT_HEADER: process.env.JWT_HEADER || 'authorization',
};