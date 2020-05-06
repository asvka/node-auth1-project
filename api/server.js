const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')

const router = require('../auth/router')
const restricted = require('../auth/restricted-middleware')

const server = express()

const sessionConfig = {
    name: "Test Cookie",
    secret: "Pinky swear you won't tell",
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

server.use('/api/users', restricted, router)
server.use('/api/auth', router)

server.get('/', (req, res, next) => {
    res.json({ api: "UP" });
})

module.exports = server;