import { useState } from "react";
import { loadEntries, saveEntry, type NewLearningEntry } from "../api/entries";

export default function LearningEntryForm() {
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [learned, setLearned] = useState("");
  const [confidence, setConfidence] = useState("3");
  const [minutes, setMinutes] = useState("");
  const [message, setMessage] = useState("");

  async function handleSave(entry: NewLearningEntry) {
    setMessage("");
    try {
      await saveEntry(entry);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Saving failed. Please try again.");
      return;
    }

    setTopic("");
    setDate("");
    setLearned("");
    setConfidence("3");
    setMinutes("");

    try {
      await loadEntries();
      setMessage("Entry saved successfully.");
    } catch {
      setMessage("Entry was saved, but the list could not be refreshed.");
    }
  }

  async function handleAddEntry() {
    setMessage("");

    if (!topic.trim() || !date || !learned.trim() || minutes === "") {
      setMessage("Please fill in all fields.");
      return;
    }

    await handleSave({
      topic,
      date,
      learned,
      confidence: Number(confidence),
      minutes: Number(minutes),
    });
  }

  return (
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
  );
}