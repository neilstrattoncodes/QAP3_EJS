const axios = require("axios");

exports.homeRoutes = (req, res) => {
  // make a get request to /api/games
  axios
    .get("http://localhost:3000/api/games")
    .then(function (response) {
      // to test if the data receives.
      console.log(response.data);
      res.render("index", { games: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.add_game = (req, res) => {
  res.render("add_game");
};

exports.update_game = (req, res) => {
  axios
    .get("http://localhost:3000/api/games", { params: { id: req.query.id } })
    .then(function (gamedata) {
      res.render("update_game", { game: gamedata.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
