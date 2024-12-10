var express = require("express");
var router = express.Router();
const User = require("../models/user");
const UserWorkout = require("../models/userWorkout");

router.post("/addWorkout", async (req, res) => {
  const { userToken, name, exercices } = req.body;
  if (!userToken || !name || !exercices) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  const user = await User.findOne({ token: userToken });
  if (!user) {
    res.json({ result: false, error: "User not found" });
    return;
  }
  const user_Id = user._id;

  const newWorkout = new UserWorkout({
    user_id: user_Id,
    name: name,
    exercises: exercices,
  });
  newWorkout.save().then(() => {
    UserWorkout.findById(newWorkout._id)
      .populate("user_id")
      .populate("exercices")
      .then((data) => res.json({ result: true, userWorkout: data }));
  });
});

router.get("/:userToken", async (req, res) => {
  const { userToken } = req.params;
  if (!userToken) {
    res.json({ result: false, error: "Missing or empty field" });
    return;
  }
  const user = await User.findOne({ token: userToken });
  if (!user) {
    res.json({ result: false, error: "User not found" });
    return;
  }
  const userWorkouts = await UserWorkout.find({ user_id: user._id }).populate(
    "exercices"
  );
  if (userWorkouts.length === 0) {
    res.json({ result: false, error: "No workouts found" });
    return;
  }

  res.json({ result: true, userWorkouts });
});

module.exports = router;
