const Database = require("better-sqlite3");
const db = new Database("fitness.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS exercises(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS workouts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sets(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_id NOT NULL,
    exercise_id INTEGER NOT NULL,
    weight_kg REAL NOT NULL,
    reps INTEGER NOT NULL,
    FOREIGN KEY (workout_id) REFERENCES workouts(id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
    );

    INSERT OR IGNORE INTO exercises (id, name) VALUES
        (1, 'Incline Bench Press'),
        (2, 'Barbell Row'),
        (3, 'Pulldowns'),
        (4, 'Biceps Curl'),
        (5, 'Seated Rows')
`);
