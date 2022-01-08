const express = require("express")
const app = express()
const port = 5000
var cors = require('cors')
const session = require("express-session")
const passport = require("./config/passport")
const authRoutes = require("./routes/auth")
const usersRoutes = require("./routes/admin")
const signupRoutes = require("./routes/signup")
const uploadRoutes = require("./routes/uploadFiles")
// permet de récup les donné envoyer au backend avec req.body
app.use(express.json())
// permet de rendre mon dossier public accessible a tout le monde 
// grace a express.static
app.use(express.static('public'))
//methode qui nous vient de express-session pour initialiser la session
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
}))
// permet au front de récup le backend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/", usersRoutes)
app.use("/auth", authRoutes)
app.use("/auth", signupRoutes)
app.use("/", uploadRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})