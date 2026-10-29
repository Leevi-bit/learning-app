import express from "express";
import cors from "cors";

type LearningEntryData = {
  id: number;
  topic: string;
  date: string;
  learned: string;
  confidence: number;
  // Add your own property from Flip 2 here.
};

const app = express();
app.use(cors());
const PORT = 3001;

const entries: LearningEntryData[] = [
  {
    id: 1,
    topic: "React Components",
    date: "2026-10-22",
    learned: "Components help us reuse UI code.",
    confidence: 3
  },
  {
    id: 2,
    topic: "React State",
    date: "2026-10-26",
    learned: "Props types define what data a component expects to receive.",
    confidence: 4
  },
  {
    id: 3,
    topic: "Express API",
    date: "2026-10-29",
    learned: "Express can return JSON",
    confidence: 3
  }
];

app.get("/api/entries", (req, res) => {
  res.json(entries);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});