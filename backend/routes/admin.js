const express = require("express")
const app = express()
const users =  "./users.json"
const fs = require("fs")
// middleware quon a crée pour savoir si l'utilisateur est connecter 
// et autoriser l'accès au route que nous avons defini
const { verifyUser } = require("../middlewares/auth")

app.get("/admin", verifyUser, (req, res) => {
  fs.readFile (users, (err , data) => {
    if (err) {
      console.log(err);
    } else {
      let users = JSON.parse(data)
  
      res.json(users)

    }
  })
})

module.exports = app