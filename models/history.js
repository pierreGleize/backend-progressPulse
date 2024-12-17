const mongoose = require('mongoose');

const historySchema = mongoose.Schema ({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    name: String,
    performances: [{
        exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'exercices' },
        sets: [{
            weight: Number,
            reps: Number,
            rest: Number
        }]
    }],
    date : Date,
    note : Number,
    ressenti: String,
    workoutName : String,
    workoutID : { type: mongoose.Schema.Types.ObjectId, ref: 'usersworkouts' }
})

const History = mongoose.model('histories', historySchema);
module.exports = History;