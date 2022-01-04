const express = require("express")
const app = express()
const fs = require("fs")
const users =  require("../users.json")
const { sameNameAndEmail } = require ("../middlewares/signup")
const path = "./users.json"

app.post('/signup',sameNameAndEmail, (req, res) => {
    // console.log(req.body);
    const user = {
        id : users.length +1,
      ...req.body
    }
  
    // on utilise readfile pour avoir acces 
    // a tous nos users de facon persistante
    // comme si on utilisait une base de donnée
    // ca veut dire que si j'eteins mon serveur, 
    // mon fichier json sera toujours à jour
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log("error", err)
        // l'erreur arrive coté serveur (typiquement, mauvais chemin de fichier)
        // on renvoie un status 500
        res.status(500).send("Internal server error")
      }
  
      // je décode le contenu de mon fichier
      let users = JSON.parse(data)
      // j'ajoute un user a mon tableau de users
      users = [ ...users, user ]
  
      // j'ecris dans mon fichier (litéralement)
      // en utilisant JSON.stringify pour réencoder mes users
      fs.writeFile(path, JSON.stringify(users), (err) => {
        if (err) {
          res.status(500).send("Internal server error")
        }
        res.json(user)
      })
    })
  
    // if (req.user) {
    //     req.logIn(req.user, (err) => {
    //         if (err) throw err
    //         res.status(200).json(req.user)
    //     })
    // }
    
})

module.exports = app