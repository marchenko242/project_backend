import dotenv from "dotenv"
dotenv.config()

export const configModel = {
    port: process.env.PORTHOST,
    mongoUri: process.env.MONGOURI,
    jwtAccessSecret: process.env.KEYACCES,
    jwtRefreshSecret: process.env.KEYREFRESH,
}