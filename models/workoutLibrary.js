const mongoose = require('mongoose');

const workoutLibrarySchema = mongoose.Schema({
    name: String,
    difficulty: String,
    exercices: [{
        exercice: {type: mongoose.Schema.Types.ObjectId, ref:'exercices'},
        sets: [{
            weight: Number,
            reps: Number,
        }],
    }],
})

const WorkoutLibrary = mongoose.model('workoutsLibrary', workoutLibrarySchema);
module.exports = WorkoutLibrary;