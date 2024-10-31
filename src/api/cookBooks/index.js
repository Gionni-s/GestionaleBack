const express = require("express")
const { activity } = require("./controller")
const { token } = require("../../services/token")

const router = express.Router()

//get all foods
router.get("/", token({ required: true }), activity.getBooks)

//get food from id
router.get("/:id", token({ required: true }), activity.getSpecificBook)

//insert new food
router.post("/", token({ required: true }), activity.createBook)

module.exports = router 