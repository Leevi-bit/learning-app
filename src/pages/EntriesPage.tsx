import { useEffect, useState } from "react";
import LearningEntry from "../components/LearningEntry";
import LearningEntryForm from "../components/LearningEntryForm";
import { useLearningStore } from "../store/useLearningStore";
import { loadEntries } from "../api/entries";

export default function EntriesPage() {
  const entries = useLearningStore((state) => state.entries);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    loadEntries().catch(() => {
      setLoadError("Could not load entries. Please try again.");
    });
  }, []);

  async function handleLoadEntries() {
    setLoadError("");
    try {
      await loadEntries();
    } catch {
      setLoadError("Could not load entries. Please try again.");
    }
  }

  return (
    <main>
      <h1>Entries</h1>

      <LearningEntryForm />

      <section>
        <h2>Entries from the backend</h2>
        <button type="button" onClick={handleLoadEntries}>
          Load from backend
        </button>
        {loadError && <p>{loadError}</p>}
        {entries.map((entry) => (
          <LearningEntry key={entry.id} entry={entry} />
        ))}
      </section>
    </main>
  );
}