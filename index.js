require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./DB/connection')
const router = require('./Routes/router')

const dropCartServer = express()

dropCartServer.use(cors())
dropCartServer.use(express.json())
dropCartServer.use(router)

const PORT = 3000 || process.env.PORT

dropCartServer.listen(PORT,()=>{
    console.log(`DropCart Server listening at port ${PORT} and waiting for client request!!!`);
})

dropCartServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>DropCart Server Connected successfully and wainting for request!!</h1>`)
})