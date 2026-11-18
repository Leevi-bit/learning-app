import type { LearningEntryData } from "../types/LearningEntryData";
import { useLearningStore } from "../store/useLearningStore";

export type NewLearningEntry = Omit<LearningEntryData, "id">;

const API_URL = "http://localhost:3001/api/entries";

export async function loadEntries() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to load entries");

  const data: LearningEntryData[] = await response.json();
  useLearningStore.getState().setEntries(data);
}

export async function saveEntry(entry: NewLearningEntry) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  if (!response.ok) throw new Error("Could not save entry");
}