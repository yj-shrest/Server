const authRouter = require("express").Router()
const {login, register} = require("../controllers/auth")

authRouter.route("/auth/login").post(login)
authRouter.route("/auth/register").post(register)

module.exports = {authRouter}