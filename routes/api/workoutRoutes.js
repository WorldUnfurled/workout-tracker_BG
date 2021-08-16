const router = require('express').Router();
const db = require('../../models');

router.get("/", async (req, res) => { // getLastWorkout()
        const workouts = await db.Workout.aggregate([
            {
                $addFields: {
                  totalDuration: { $sum: "$exercises.duration" }
                }
            },
        ]).sort({day: 1});
        console.log(workouts);
        res.json(workouts);
});

router.get("/range", async (req, res) => { // View total duration for each of past seven workouts | getWorkoutsInRange()
        const workouts = await db.Workout.aggregate([
                {
                    $addFields: {
                      totalDuration: { $sum: "$exercises.duration" }
                    }
                },
        ]).limit(7);
        console.log(workouts);
        res.json(workouts);
});

router.put("/:id", async (req, res) => { // Add exercises to most recent workout plan | addExercise()
    try{
        const workout = await db.Workout.findByIdAndUpdate(
            req.params.id,
            {$push: { exercises: req.body }}
        );
        res.json(workout);
    } catch (err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => { // Add new exercises to new workout plan | createWorkout()
    try {
        // console.log(req);
        // console.log(res + " cw");
        const workout = await db.Workout.create(req.body);
        res.json(workout);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;