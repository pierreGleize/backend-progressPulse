var express = require("express");
var router = express.Router();
const User = require('../models/user')
const History = require('../models/history')
const UserWorkout = require('../models/userWorkout')

module.exports = router;


router.post("/addWorkout", async (req, res) => {
    const { date, note, performances, ressenti, user, workout } = req.body;
    if (!date || !user || !workout) {
      res.json({ result: false, error: "Missing or empty fields" });
      return;
    }
    const userSelected = await User.findOne({ token: user });
    if (!userSelected) {
      res.json({ result: false, error: "User not found" });
      return;
    }
    const user_Id = userSelected._id;
    const workoutSelected = await UserWorkout.findOne({_id : workout})
    if(!workoutSelected){
        res.json({ result: false, error: "Workout not found" });
        return;  
    }
    const workoutName = workoutSelected.name

    const historyToAdd = new History({
        user : user_Id,
        performances: performances,
        date : date,
        note : note,
        ressenti : ressenti,
        workoutName: workoutName,
        workoutID: workout
    })

    historyToAdd.save()
    .then(data => {
        History.findOne({_id : data.id})
        .populate('performances.exercise')
        .select('-user -__v')
        .then(historyAdded => {
          res.json({result:true, workoutAdded: historyAdded})
        })
    })
  });

  router.get("/:userToken", async (req, res) => {
    const userSelected = await User.findOne({ token: req.params.userToken });
    if (!userSelected) {
      res.json({ result: false, error: "User not found" });
      return;
    }
    const user_Id = userSelected._id;

    const histories = await History.find({user : user_Id}).select('-user -__v').populate('performances.exercise')
    res.json({result: true, histories: histories})
  })

  router.delete('/:historyID', (req,res) => {
    History.deleteOne({_id : req.params.historyID})
    .then(data => {
      res.json({result: true, deletedCount : data.deletedCount})
    })
  })