var express = require("express");
var router = express.Router();
const WorkoutLibrary = require('../models/workoutsLibrary');

router.get('/:byDifficulty', (req, res) => {
    WorkoutLibrary.find({difficulty: req.params.difficulty})
    .populate('exercice', ['name', 'muscleGroupe', 'description', 'image'])
    .then(data => {
        if(data){
            res.json({result: true, data})
        } else {
            res.json({result: false, error: 'Workout not found' })
        }
    })
});

router.get('/:byName', (req, res) => {
    WorkoutLibrary.find({name: req.params.name}).then(data => {
        if(data){
            res.json({result: true, workoutlibrary: data})
        } else {
            res.json({result: false, error: 'Workout not found'})
        }
    })
});

router.post('/addWorkout', (req, res) => {

});


module.exports = router;
