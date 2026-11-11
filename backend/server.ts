import "dotenv/config";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

type LearningEntryData = {
  id: number;
  topic: string;
  date: string;
  learned: string;
  confidence: number;
  minutes: number;
};

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: true
});

const app = express();
app.use(cors());
const PORT = 3001;
app.use(express.json());

app.get("/api/entries", async (req, res) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, topic, entry_date AS date,
              learned, confidence, minutes
       FROM learning_entries
       ORDER BY id`
    );

    res.json(rows);
  } catch (error) {
    console.error("Database query failed:", error instanceof Error ? error.message : "Unknown error");
    res.status(500).json({ error: "Could not load entries" });
  }
});

app.post("/api/entries", async (req, res) => {
  const { topic, date, learned, confidence, minutes } = req.body;

  if (typeof topic !== "string" || !topic.trim() ||
      typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      typeof learned !== "string" || !learned.trim() ||
      !Number.isInteger(confidence) || confidence < 1 || confidence > 5 ||
      !Number.isInteger(minutes) || minutes < 0) {
    return res.status(400).json({ error: "Invalid learning entry" });
  }

  try {
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO learning_entries
        (topic, entry_date, learned, confidence, minutes)
       VALUES (?, ?, ?, ?, ?)`,
      [topic.trim(), date, learned.trim(), confidence, minutes]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error("Could not save entry:", error instanceof Error ? error.message : "Unknown error");
    res.status(500).json({ error: "Could not save entry" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});