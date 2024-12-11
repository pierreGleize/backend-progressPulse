const mongoose = require('mongoose');

const userWorkoutSchema = mongoose.Schema ({
    user_token: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    name: String,
    exercises: [{
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'exercices' },
        rest: Number,
        customSets: [{
            weight: Number,
            reps: Number
        }]
    }]
})

const UserWorkout = mongoose.model('userworkouts', userWorkoutSchema);
module.exports = UserWorkout;