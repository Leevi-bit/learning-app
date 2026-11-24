export function isValidConfidence(value: unknown): boolean {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5;
}

export function isValidMinutes(value: unknown): boolean {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}