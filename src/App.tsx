import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import LearningEntry from "./components/LearningEntry";

function App() {
  const studentName: string = "Leevi Lehtisaari";

  return (
    <main>
      <h1>My Learning</h1>
      <p>Fullstack Project</p>
      <p>Student: {studentName}</p>

      <LearningEntry
  topic="React Components"
  date="2026-10-19"
  learned="Components help divide the UI into reusable parts."
  confidence={3}
/>
      <LearningEntry
        topic="TypeScript Props"
        date="2026-10-26"
        learned="Props types define what data a component expects to receive."
        confidence={4}
        />
    </main>
  );
}

export default App;