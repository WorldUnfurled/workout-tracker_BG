const router = require('express').Router();
const db = require('../../models');

router.get("/workout", async (req, res) => { // View total duration for each of past seven workouts
    try {
        const wktAgg = db.Workout.aggregate([
            {
                $set: {
                  totalDuration: { $sum: "$duration" } ,
                  combinedWeight: { $sum: "$weight" }
                }
            },
        ]);
        const workout = await wktAgg.find().limit(7);
        res.json(workout);
    } catch (err) {
        res.json(err);
    }
});
router.get("/workout", (req, res) => { // View combined weight for each of past seven workouts

});
router.post("/workout", (req, res) => { // Add exercises to most recent workout plan

});
router.post("/workout", (req, res) => { // Add new exercises to new workout plan

});