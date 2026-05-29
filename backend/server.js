const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/workouts", (req, res) => {
    const exercise = db.prepare("SELECT * FROM exercises").all();
    res.jason(exercises);
});
