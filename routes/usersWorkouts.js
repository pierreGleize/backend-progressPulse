var express = require("express");
var router = express.Router();
const User = require("../models/user");
const UserWorkout = require("../models/userWorkout");

router.post("/addWorkout", async (req, res) => {
  const { userToken, name, exercices } = req.body;
  if (!userToken || !name || !exercices) {
    console.log(name);
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
      .populate("exercises.exercise")
      .select("-user_id") // Pour exclure le champs de l'id de user dans la BDD'
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
  const userWorkouts = await UserWorkout.find({ user_id: user._id })
    .populate("exercises.exercise")
    .select("-user_id");
  if (userWorkouts.length === 0) {
    res.json({ result: false, error: "No workouts found" });
    return;
  }
  console.log(userWorkouts);
  res.json({ result: true, userWorkouts });
});

router.delete("/deleteWorkout/:workoutID", (req, res) => {
  const workoutID = req.params.workoutID;
  console.log(workoutID);
  UserWorkout.deleteOne({ _id: workoutID }).then((data) => {
    res.json({ result: true, deleted: data.deletedCount });
  });
});

<<<<<<< HEAD
router.delete("/deleteExercise", (req,res) => {
  const {workoutID, exerciseID} = req.body
  console.log({workoutID, exerciseID})
  UserWorkout.findOne({_id : workoutID})
  .then(workout => {
=======
router.delete("/deleteExercise", (req, res) => {
  const { workoutID, exerciseID } = req.body;
  console.log({ workoutID, exerciseID });
  UserWorkout.findOne({ _id: workoutID }).then((workout) => {
>>>>>>> b806ba29958c4c0dccdbaeb837b6c1f911aed495
    if (!workout) {
      return res.status(404).json({ error: "Séance non trouvée" });
    }
    const exerciseIndex = workout.exercises.findIndex(
      (exercise) => exercise._id.toString() === exerciseID
    );
    if (exerciseIndex === -1) {
      return res.status(404).json({ error: "Exercice non trouvé" });
    }
    workout.exercises.splice(exerciseIndex, 1);
    workout.save().then((updatedWorkout) => {
      res.json({ result: true });
    });
  });
});

router.put("/updateSets", (req, res) => {
  const { workoutID, exerciseID, customSets, rest } = req.body;
  UserWorkout.findById(workoutID).then((workout) => {
    if (!workout) {
      return res.json({ result: false, error: "Séance non trouvée" });
    }
    for (let exercise of workout.exercises) {
      if (exercise._id == exerciseID) {
        exercise.customSets = customSets;
        exercise.rest = rest;
      }
    }
    workout.save().then((updatedWorkout) => {
      res.json({ result: true });
    });
  });
});

module.exports = router;
