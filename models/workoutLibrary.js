const mongoose = require("mongoose");

const workoutLibrarySchema = mongoose.Schema({
  name: String,
  difficulty: String,
  exercices: [
    {
      exercice: { type: mongoose.Schema.Types.ObjectId, ref: "exercices" },
      sets: [
        {
          weight: Number,
          rep: Number,
        },
      ],
    },
  ],
});

const WorkoutLibrary = mongoose.model(
  "workoutslibraries",
  workoutLibrarySchema
);
module.exports = WorkoutLibrary;
