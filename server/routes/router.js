const express = require("express");
const route = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

route.get("/", services.homeRoutes);

route.get("/add-game", services.add_game);

route.get("/update-game", services.update_game);

// API using URL parameters
route.post("/api/games/", controller.create);
route.get("/api/games", controller.find);
route.put("/api/games/:id", controller.update);
route.delete("/api/games/:id", controller.delete);

module.exports = route;
