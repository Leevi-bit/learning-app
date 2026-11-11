import { useEffect, useState } from "react";
import "./App.css";
import LearningEntry from "./components/LearningEntry";
import type { LearningEntryData } from "./types/LearningEntryData";

function App() {
  const studentName: string = "Leevi Lehtisaari";

  const [serverEntries, setServerEntries] = useState<LearningEntryData[]>([]);
  const [loadError, setLoadError] = useState("");

  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [learned, setLearned] = useState("");
  const [confidence, setConfidence] = useState("3");
  const [minutes, setMinutes] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadInitialEntries() {
      try {
        const response = await fetch("http://localhost:3001/api/entries");
        if (!response.ok) throw new Error("Could not load entries");
        const data: LearningEntryData[] = await response.json();
        if (!ignore) setServerEntries(data);
      } catch {
        if (!ignore) setLoadError("Could not load entries from the backend.");
      }
    }

    void loadInitialEntries();
    return () => { ignore = true; };
  }, []);

  async function loadServerEntries() {
    setLoadError("");
    try {
      const response = await fetch("http://localhost:3001/api/entries");
      if (!response.ok) throw new Error("Could not load entries");
      const data: LearningEntryData[] = await response.json();
      setServerEntries(data);
    } catch (error) {
      setLoadError("Could not load entries from the backend.");
      throw error;
    }
  }

  async function handleAddEntry() {
    setMessage("");

    if (!topic.trim() || !date || !learned.trim() || minutes === "") {
      setMessage("Please fill in all fields.");
      return;
    }

    const newEntry = {
      topic,
      date,
      learned,
      confidence: Number(confidence),
      minutes: Number(minutes),
    };

    try {
      const response = await fetch("http://localhost:3001/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      if (!response.ok) throw new Error("Could not save entry");
    } catch {
      setMessage("Saving failed. Please try again.");
      return;
    }

    setTopic("");
    setDate("");
    setLearned("");
    setConfidence("3");
    setMinutes("");

    try {
      await loadServerEntries();
      setMessage("Entry saved successfully.");
    } catch {
      setMessage("Entry was saved, but the list could not be refreshed.");
    }
  }

  return (
    <main>
      <h1>My Learning</h1>
      <p>Fullstack Project</p>
      <p>Student: {studentName}</p>

      <section>
        <h2>Add a learning entry</h2>
        <div>
          <label>
            Topic{" "}
            <input value={topic} onChange={(e) => setTopic(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Date{" "}
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Learned{" "}
            <textarea value={learned} onChange={(e) => setLearned(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Confidence{" "}
            <select value={confidence} onChange={(e) => setConfidence(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Minutes{" "}
            <input
              type="number"
              min="0"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
          </label>
        </div>
        <button type="button" onClick={handleAddEntry}>
          Add entry
        </button>
        {message && <p>{message}</p>}
      </section>

      <section>
        <h2>Entries from the backend</h2>
        <button
          type="button"
          onClick={() => { void loadServerEntries().catch(() => {}); }}
        >
          Load from backend
        </button>
        {loadError && <p>{loadError}</p>}
        {serverEntries.map((entry) => (
          <LearningEntry key={entry.id} entry={entry} />
        ))}
      </section>
    </main>
  );
}

export default App;