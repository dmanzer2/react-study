import { useState } from 'react'
import './App.css'
import JSXExamples from './components/JSXExamples'
import ComponentExamples from './components/ComponentExamples'
import ReactPatternsExamples from './components/ReactPatternsExamples'
import PropsStateExamples from './components/PropsStateExamples'
import HooksExamples from './components/HooksExamples'
import StateManagementExamples from './components/StateManagementExamples'
import FormHandlingExamples from './components/FormHandlingExamples'
import EventHandlingExamples from './components/EventHandlingExamples'
import TestingExamples from './components/TestingExamples'
import DebuggingExamples from './components/DebuggingExamples'
import BonusTopics from './components/BonusTopics'

function App() {
  const [activeSection, setActiveSection] = useState('jsx')

  const sections = {
    jsx: { title: 'JSX Examples', component: JSXExamples },
    components: { title: 'Function vs Class Components', component: ComponentExamples },
    patterns: { title: 'React Patterns & Logic', component: ReactPatternsExamples },
    propsState: { title: 'Props & State', component: PropsStateExamples },
    hooks: { title: 'React Hooks', component: HooksExamples },
    stateManagement: { title: 'State Management (Minimal)', component: StateManagementExamples },
    forms: { title: 'Form Handling', component: FormHandlingExamples },
    events: { title: 'Event Handling', component: EventHandlingExamples },
    testing: { title: 'Unit Testing', component: TestingExamples },
    debugging: { title: 'Debugging & DevTools', component: DebuggingExamples },
    bonus: { title: 'Bonus Topics', component: BonusTopics }
  }

  const ActiveComponent = sections[activeSection].component

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Study Guide</h1>
        <p>Interactive examples of core React concepts</p>
      </header>
      
      <nav className="navigation">
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            className={`nav-button ${activeSection === key ? 'active' : ''}`}
            onClick={() => setActiveSection(key)}
          >
            {section.title}
          </button>
        ))}
      </nav>

      <main className="main-content">
        <h2>{sections[activeSection].title}</h2>
        <ActiveComponent />
      </main>
    </div>
  )
}

export default App
