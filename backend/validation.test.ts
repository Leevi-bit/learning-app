import test from "node:test";
import assert from "node:assert/strict";
import { isValidConfidence, isValidMinutes } from "./validation.js";

test("confidence must be an integer from 1 to 5", () => {
  assert.equal(isValidConfidence(0), false);
  assert.equal(isValidConfidence(6), false);
  assert.equal(isValidConfidence(2.5), false);
  assert.equal(isValidConfidence("3"), false);
  assert.equal(isValidConfidence(1), true);
  assert.equal(isValidConfidence(3), true);
  assert.equal(isValidConfidence(5), true);
});

test("minutes must be an integer that is 0 or more", () => {
  assert.equal(isValidMinutes(-1), false);
  assert.equal(isValidMinutes(10.5), false);
  assert.equal(isValidMinutes("30"), false);
  assert.equal(isValidMinutes(0), true);
  assert.equal(isValidMinutes(45), true);
});