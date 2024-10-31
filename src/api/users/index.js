const express = require("express")
const { token } = require("../../services/token")
const { activity } = require("./controller")

const router = express.Router()

//login user
router.get("/:mail/:psw", token({ required: false }), activity.login)

// refresh token
router.get("/newToken", token({ required: true }), activity.refreshToken)

//createUser
router.post("/", token({ required: false }), activity.createUser)

module.exports = router 