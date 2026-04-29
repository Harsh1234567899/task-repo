import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/db.js'
dotenv.config({
    path: '.env',
    debug: true
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("app is running");
    })
}).catch(() => {
    console.log("failed to connect db so app is not running");

})
app.get('/', (req, res) => {
    res.send("app is running")
})

import userRouter from "./routes/user.routes.js"
app.use('/api/v1/user',userRouter)

import taskRouter from "./routes/task.routes.js"
app.use("/api/v1/task",taskRouter)