var Gamedb = require("../model/model");

//create and save new game

exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }
  // new game scheme
  const game = new Gamedb({
    name: req.body.name,
    desc: req.body.desc,
    type: req.body.type,
    price: req.body.price,
    sku: req.body.sku,
    platform: req.body.platform,
    status: req.body.status,
  });

  //save game in the database
  game
    .save(game)
    .then((data) => {
      //res.send (data)
      res.redirect("/add-game");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating a create operation",
      });
    });
  // retreive and return all games or return a single game
  exports.find = (req, res) => {
    if (req.query.id) {
      const id = req.query.id;

      Gamedb.findById(id)
        .then((data) => {
          if (!data) {
            res.status(404).send({ message: "Not found game with id " + id });
          } else {
            res.send(data);
          }
        })
        .catch((err) => {
          res
            .status(500)
            .send({ message: "Error retrieving game with id " + id });
        });
    } else {
      Gamedb.find()
        .then((game) => {
          res.send(game);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Error Occurred while retriving game information",
          });
        });
    }
  };
};

// update a new game by ID
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Gamedb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot Update game with ${id}. Maybe game not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update game information" });
    });
};

// delete a game
exports.delete = (req, res) => {
  const id = req.params.id;

  Gamedb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: "Game was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Game with id=" + id,
      });
    });
};
