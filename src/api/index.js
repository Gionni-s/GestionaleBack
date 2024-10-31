const express = require("express")
const { port } = require("../config")

const app = express()
const cors = require('cors')

app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerFoods = require("./foods")
const routerLocations = require("./locations")
const routerWerehouses = require("./werehouses")
const routerWerehouseEntities = require("./werehouseEntities")
const routerUsers = require("./users")
const routerBooks = require("./cookBooks")
const routerRecipes = require("./recipes")



app.use("/foods", routerFoods)
app.use("/location", routerLocations)
app.use("/werehouses", routerWerehouses)
app.use("/werehouseEntities", routerWerehouseEntities)
app.use("/users", routerUsers)
app.use("/cookBooks", routerBooks)
app.use("/recipes", routerRecipes)



app.listen(port, () => {
  logger.info("server attivo alla porta: " + port)
})