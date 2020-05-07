const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

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

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.findBy({ username })
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)) {
                req.session.user = {
                    id: user.id,
                    username: user.username,
                };
                res.status(200).json({
                    message: 'Success!',
                });
            } else {
                res.status(401).json({message: "Invalid credentials"})
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Nah."})
    })   
  });
 
router.get("/", (req, res) => {
    db.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

module.exports = router