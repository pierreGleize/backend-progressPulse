var express = require("express");
var router = express.Router();
const Workout = require('../models/workout');
/* const UserWorkout = require('../models/userWorkout')
const User = require('../models/user') */

//affiche tous les programmes pré-définis
router.get("/", (req, res) => {
    Workout.find({}).then((data) => {
      res.json({ result: true, data: data });
    });
  });

//affiche les programmes selon la difficultée  
router.get('/byDifficulty/:byDifficulty', (req, res) => {
    Workout.find({difficulty: {$regex: new RegExp(`${req.params.byDifficulty}$`,'i')} })
    .populate('exercices.exercice')
    .then(data => {
        if(data){
            res.json({result: true, data})
        } else {
            res.json({result: false, error: 'Workout not found' })
        }
    })
});

//affiche les programmes selon son nom
router.get('/byName/:byName', (req, res) => {
    Workout.find({name: {$regex: new RegExp(`${req.params.byName}$`,'i')}})
    .then(data => {
        if(data){
            res.json({result: true, data})
        } else {
            res.json({result: false, error: 'Workout not found'})
        }
    })
});

/* //Ajoute un programme à userWorkout
router.post('/addWorkout', (req, res) => {
    byName = req.body.byName;
    difficulty = req.body.difficulty;
    token = req.body.token;
    User.findOne({token}).then(user => {
        if(user === null){
            res.json({result: false, error : 'User not found'});
            return
        }
        Workout.findOne({name: {$regex: new RegExp(`${byName}$`,'i')}, difficulty: {$regex: new RegExp(`${difficulty}$`,'i')}})
        .then(data => {
            if(data === null){
                res.json({result : false, error : 'Workout not found'});
                return
            }
            const newUserWorkout = new UserWorkout ({
                user_id: user._id,
                name: req.body.name,
                exercices : data.exercices,
            })
            newUserWorkout.save().then(newDoc => {
                res.json({result :true, userWorkout : newDoc});
            })
        })
    })
}); */


module.exports = router;
