const express = require("express")
const app = express()
const fs = require("fs")
const path = require("path")
const users = require("../users.json")
// import du package multer
const multer  = require('multer')
// let users = require('../users.json')
const moment = require('moment')
// pour obtenir la date acctuelle
const date = moment('fr')
// création d'une "mini" config multer
// cette ligne va créer le dossier /public s'il n'existe pas
const upload = multer({ dest: 'public' })

app.post('/file/:id', upload.single('file'), function (req, res, next) {
   const {id} = req.params
// ON LOG req.file pour avoir toute les infos du fichier quon a poster 
// console.log(req.file)
// on renomme le fichier créé avec fs.renameSync()
    const namePicture = `${moment().format("DD-MM-YYYY-hh-mm-ss")}${req.file.originalname}`
    fs.renameSync(req.file.path,`${req.file.destination }/${namePicture}`)
    // je li mon fichier json avec fs et je cherche l id du user avec id de req.param
    fs.readFile('./users.json', (err, data) => {
        if(err){
            res.status(500).json({ error:"une erreur est survenue" })
        }
        // je decode le data grace a json.parse
        let users = JSON.parse(data)
        // je recherche le user grace au id passer dans postman que je compare avec son id
        let userSelected = users.find(user => user.id === Number(id))
        // une fois le user selectionner je lui met dans la clef profilepicture le nom que j'ai choisi
        userSelected.profilepicture = `http://localhost:5000/${namePicture}`
        // avec fs.writefile je stringify le array et je renvoie mes user a jour 
        fs.writeFile('./users.json', JSON.stringify(users), (err) => {
            if (err) {
                res.status(500).json({ error:"une erreur est survenue" })
            } else {
                res.json({ success: "File uploaded" })
            }
        })
    })

})

app.get("/user/:id", (req, res) => {
    // avec cette ligne on recupère le parametre dynamique
    const {id} = req.params
    
    const selectedUser = users.find(user => user.id === Number(id))
    res.status(200).json(selectedUser)
})

module.exports = app