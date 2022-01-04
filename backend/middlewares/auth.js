const verifyUser = (req, res, next) => {
    if (!req.user) { // si mon utilisateur est connecté
      res.status(401).json("Unauthorized")
    } else {
      next()
    }
  }
  
  module.exports = {
    verifyUser
  }