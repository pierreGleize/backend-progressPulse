const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    name: String,
    muscleGroupe: String,
    description: String,
    image: String
})

const Exercise = mongoose.model('exercices', exerciseSchema);
module.exports = Exercise;