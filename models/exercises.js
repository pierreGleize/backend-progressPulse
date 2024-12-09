const mongoose = require('mongoose');

const exerciceSchema = mongoose.Schema({
    name: String,
    muscleGroupe: String,
    description: String,
    image: String
})

const Exercice = mongoose.model('exercices', exerciceSchema);
module.exports = Exercice;