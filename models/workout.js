const mongoose = require("mongoose");

const workoutSchema = mongoose.Schema({
  name: String,
  difficulty: String,
  image: String,
  exercices: [
    {
      exercice: { type: mongoose.Schema.Types.ObjectId, ref: "exercices" },
      rest: Number,
      sets: [
        {
          weight: Number,
          rep: Number,
        },
      ],
    },
  ],
});

const Workout = mongoose.model("workouts", workoutSchema);
module.exports = Workout;
