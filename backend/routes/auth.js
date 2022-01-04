const express = require("express")
const app = express()
const passport = require("../config/passport")

app.post("/login", passport.authenticate("local"), (req, res) => {
    if (req.user) {
        req.logIn(req.user , (err) => {
            if (err) {
                res.status(500).send("une erreur est survenue")
            }
            res.json(req.user)
        })
    }
})


module.exports = app