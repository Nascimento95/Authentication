const express = require("express")
const app = express()
const users =  require("../users.json")
// middleware quon a crée pour savoir si l'utilisateur est connecter 
// et autoriser l'accès au route que nous avons defini
const { verifyUser } = require("../middlewares/auth")

app.get("/admin", verifyUser, (req, res) => {
  res.json(users)
})

module.exports = app