import dotenv from "dotenv"
dotenv.config()

export const configModel = {
    porthost: process.env.PORTHOST,
    mongoUri: process.env.MONGOURI,
    KEYACCES: process.env.KEYACCES,
    KEYREFRESH: process.env.KEYREFRESH,
}