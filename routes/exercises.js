var express = require("express");
var router = express.Router();
const Exercise = require("../models/exercise");

// Récup tous les exercices
router.get("/", (req, res) => {
  Exercise.find({}).then((data) => {
    res.json({ result: true, data: data });
  });
});

// Récup les exercices selon groupe musculaire
router.get("/:muscleGroup", (req, res) => {
  muscleGroup = req.params.muscleGroup;
  console.log(muscleGroup);
  Exercise.find({
    muscleGroupe: { $regex: new RegExp(`^${muscleGroup}$`, "i") },
  }).then((data) => {
    if (data.length === 0) {
      res.json({
        result: false,
        error: "No exercises found for this muscle group",
      });
      return;
    } else {
      res.json({ result: true, data: data });
    }
  });
});

module.exports = router;
