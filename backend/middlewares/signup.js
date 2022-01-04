const req = require("express/lib/request")
let users =  require("../users.json")
const sameNameAndEmail = (req, res, next) => {
    const { username, email } = req.body
    const checkNameAndEmail = users.find(user => user.username === username || user.email === email)
    if(checkNameAndEmail) {
        res.status(401).json("nom utilisateur et email déja utiliser")
    } else {
        next()
    }
}
module.exports = {
    sameNameAndEmail
}