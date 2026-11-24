# Learning App

A fullstack app

## Application Structure

- Which React pages and reusable components did you create?
HomePage & EntriesPage. LearningEntry is reusable component that displays one entry.

- What do React, Express and MariaDB each do?
React is on frontend & shows pages. Express is backend that recieves GET and POST requests.
MariaDB stores learning entries.

- What is the difference between /entries and GET /api/entries?
/entries is page in React, that shows entries to users.
GET /api/entries is in Express and sends entries from database.

- Why is REST a reasonable choice for this app?
App needs that only for learning entries.

## State Management

Local state: form fields (topic, date, learned, confidence, minutes).

Zustand: the list of entries.

MariaDB: saves the entries permanently. Zustand saves only on browsers memory. GET loads entries from database.

## Testing & Reliability

### Unit tests

Command:
npm test

Results:
- confidence test: pass
- minutes test: pass

confidence must be an integer from 1 to 5
minutes must be an integer that is 0 or more

### Manual checks

| Test | Expected | Actual | Result |
|---|---|---|---|
| Empty topic (direct to Express) | 400 | 400 | Pass |
| Confidence = 100 | 400 | 400 | Pass |
| Missing minutes | 400 | 400 | Pass |
| Express stopped, valid form | Error, list unchanged | Error, list unchanged | Pass |