const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/exercises", (req, res) => {
    const exercise = db.prepare("SELECT * FROM exercises").all();
    res.jason(exercises);
});

app.get("/workouts", (req, res) => {
    const { date } = db.body;
    const result = db.prepare("INSERT INTO workouts (date) VALUES (?)").run(date);
    res.json({ id: result.lastInsertRowid });
});

app.post("/sets", (req, res) => {
    const { workout_id, exercise_id, weight_kg, reps } = req.body;
    const result = db.prepare("INSERT INTO sets (workout_id, exercise_id,weight_kg, reps) VALUES (?,?,?,?)").run(workout_id, exercise_id, weight_kg, reps);
    res.json({ id: result.lastInsertRowid });
});

app.get("/progress/:exercise_id", (req, res) => {
    const sets = db
        .prepare(
            `
        SELECT s.weight_kg, s.reps, w.date
        FROM sets s
        JOIN workouts w ON s.workout = w.id
        WHERE s.exercise_id = ?
        ORDER BY w.date ASC
    `,
        )
        .all(req.params.exercise_id);
    res.json(sets);
});

app.listen(3001, () => console.log("Server running on port 3001"));
