const express = require("express")
const app = express()
const port = 5000
const session = require("express-session")
const passport = require("./config/passport")

const authRoutes = require("./routes/auth")
const usersRoutes = require("./routes/admin")
// permet de récup les donné envoyer au backend avec req.body
app.use(express.json())
//methode qui nous vient de express-session pour initialiser la session
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/", usersRoutes)
app.use("/auth", authRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})