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
  let response: Response;
  try {
    response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
    });
  } catch {
    throw new Error("Could not confirm the save. Check the connection and reload the list before trying again.");
  }

  if (!response.ok) {
    throw new Error(
      response.status === 400
        ? "Could not save the entry. Check your input."
        : "The server could not save the entry. Please try again."
    );
  }
}