const router = require('express').Router();
const db = require('../../models');

router.get("/", (req, res) => { // getLastWorkout()
    try {
        const wktAgg = db.Workout.aggregate([
            {
                $set: {
                  totalDuration: { $sum: "$duration" } ,
                  combinedWeight: { $sum: "$weight" }
                }
            },
        ]);

        const workouts = await wktAgg.find();
        res.json(workouts);
    } catch (err) {
        res.json(err);
    }
});

router.get("/range", async (req, res) => { // View total duration for each of past seven workouts | getWorkoutsInRange()
    try {
        const wktAgg = db.Workout.aggregate([
            {
                $set: {
                  totalDuration: { $sum: "$duration" } ,
                  combinedWeight: { $sum: "$weight" }
                }
            },
        ]);

        const workouts = await wktAgg.find().limit(7);
        res.json(workouts);
    } catch (err) {
        res.json(err);
    }
});

router.put("/:id", async (req, res) => { // Add exercises to most recent workout plan

});

router.post("/", ({ body }, res) => { // Add new exercises to new workout plan
    try {
        const workout = await db.Workout.create(body);
        res.json(workout);
    } catch (err) {
        res.json(err);
    }
});