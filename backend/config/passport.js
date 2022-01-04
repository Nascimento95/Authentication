const passport = require("passport")
const passportLocal = require("passport-local")
const fs = require("fs")
//on met la clef pour dire la strategie quon utilise
const LocalStrategy = passportLocal.Strategy

const users = "./users.json"
// une sorte de middleware qui regarde si le username et le password existe et son exact pour 
// récupere l utilisateur
passport.use(new LocalStrategy((username, password, done) => {
  fs.readFile(users, (err ,data) => {
    if (err) {
      return console.log(err);
    }
    
    let users = JSON.parse(data)
    const user = users.find(user => user.username === username && user.password === password)
    console.log(username, password, user);
    if (!user) {
      return done(null, false)
    }
  
    return done(null, user)
  })
}))
// permet  de renvoie l user si c'est bien lui
passport.serializeUser((user, done) => {
  done(null, user.id)
})
// permet de savoir di id de l user est le bon vien du package passport
passport.deserializeUser((id, done) => {
  fs.readFile(users , (err , data) => {
    if (err) {
      return console.log(err);
    }
    let users = JSON.parse(data)
    const user = users.find(user => user.id === id)
    done(null, user)
  })
})

module.exports = passport