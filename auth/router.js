const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router({
    mergeParams: true,
})

const db = require('./model')

router.post('/register', async (req, res, next) => {
    try {
        const userData = req.body;
        const ROUNDS = process.env.HASHING_ROUNDS || 8
        const hash = bcrypt.hashSync(userData.password, ROUNDS)

        userData.password = hash

        const data = await db.add(userData)
        res.json(data)
    }
    catch (err) {
        next(err)
    }
})

module.exports = router