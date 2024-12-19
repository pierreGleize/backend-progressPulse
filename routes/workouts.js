var express = require("express");
var router = express.Router();
const Workout = require("../models/workout");

//affiche tous les programmes pré-définis
router.get("/", (req, res) => {
  Workout.find({}).then((data) => {
    res.json({ result: true, data: data });
  });
});

//affiche les programmes selon la difficultée
router.get("/byDifficulty/:byDifficulty", (req, res) => {
  Workout.find({
    difficulty: { $regex: new RegExp(`${req.params.byDifficulty}$`, "i") },
  })
    .populate("exercices.exercice")
    .then((data) => {
      if (data) {
        res.json({ result: true, data });
      } else {
        res.json({ result: false, error: "Workout not found" });
      }
    });
});

//affiche les programmes selon son nom
router.get("/byName/:byName", (req, res) => {
  Workout.find({
    name: { $regex: new RegExp(`${req.params.byName}$`, "i") },
  }).then((data) => {
    if (data) {
      res.json({ result: true, data });
    } else {
      res.json({ result: false, error: "Workout not found" });
    }
  });
});

module.exports = router;
