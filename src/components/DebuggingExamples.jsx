import React, { useState, useEffect, useRef, useCallback } from 'react'

// 🐛 Debugging Examples Component
const DebuggingExamples = () => {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({ name: '', email: '' })
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)
  const renderCount = useRef(0)

  // Track renders for debugging
  renderCount.current += 1

  // Example of debugging with useEffect
  useEffect(() => {
    console.log('🔄 Component mounted or count changed:', count)
    return () => console.log('🧹 Cleanup for count:', count)
  }, [count])

  useEffect(() => {
    console.log('👤 User state changed:', user)
  }, [user])

  // Debugging async operations
  const fetchTodos = useCallback(async () => {
    console.log('📡 Starting to fetch todos...')
    setLoading(true)
    
    try {
      // Simulate API call
      const response = await new Promise(resolve => 
        setTimeout(() => resolve(['Todo 1', 'Todo 2', 'Todo 3']), 1000)
      )
      console.log('✅ Todos fetched successfully:', response)
      setTodos(response)
    } catch (error) {
      console.error('❌ Error fetching todos:', error)
    } finally {
      setLoading(false)
      console.log('🏁 Fetch todos completed')
    }
  }, [])

  // Debugging event handlers
  const handleIncrement = () => {
    console.log('🔢 Before increment:', count)
    setCount(prev => {
      const newValue = prev + 1
      console.log('🔢 After increment:', newValue)
      return newValue
    })
  }

  const handleUserChange = (field, value) => {
    console.log(`👤 Updating user.${field}:`, value)
    setUser(prev => {
      const updated = { ...prev, [field]: value }
      console.log('👤 New user state:', updated)
      return updated
    })
  }

  // Debug render performance
  console.log(`🎨 Component rendered ${renderCount.current} times`)

  return (
    <div className="examples-container">
      
      {/* Introduction */}
      <div className="example-section">
        <h3>🐛 React Debugging & DevTools</h3>
        <div className="code-example">
          <p>
            Effective debugging is crucial for React development. Learn how to use console logging,
            React DevTools, and other debugging techniques to identify and fix issues.
          </p>
          
          <div className="debugging-principles">
            <h4>🎯 Debugging Principles:</h4>
            <ul>
              <li><strong>Strategic Console Logging:</strong> Log state changes, function calls, and data flow</li>
              <li><strong>React DevTools:</strong> Inspect component hierarchy, props, and state</li>
              <li><strong>Performance Monitoring:</strong> Track re-renders and optimization opportunities</li>
              <li><strong>Error Boundaries:</strong> Catch and handle errors gracefully</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Console Logging Strategies */}
      <div className="example-section">
        <h3>📝 Console Logging Strategies</h3>
        <div className="code-example">
          <p>
            Strategic console logging helps track state changes, function calls, and data flow.
            Open your browser's Developer Tools (F12) to see the logs in action.
          </p>
          
          <div className="component-demo">
            <div className="debug-counter">
              <h4>Debug Counter (Check Console)</h4>
              <p>Count: {count}</p>
              <p>Render Count: {renderCount.current}</p>
              <button onClick={handleIncrement}>Increment</button>
              <button onClick={() => setCount(0)}>Reset</button>
            </div>
          </div>

          <div className="debug-code">
            <h5>📝 Console Logging Examples:</h5>
            <pre><code>{`// 1. Basic State Logging
const [count, setCount] = useState(0)

const handleIncrement = () => {
  console.log('🔢 Before increment:', count)
  setCount(prev => {
    const newValue = prev + 1
    console.log('🔢 After increment:', newValue)
    return newValue
  })
}

// 2. useEffect Debugging
useEffect(() => {
  console.log('🔄 Component mounted or count changed:', count)
  return () => console.log('🧹 Cleanup for count:', count)
}, [count])

// 3. Render Count Tracking
const renderCount = useRef(0)
renderCount.current += 1
console.log(\`🎨 Component rendered \${renderCount.current} times\`)

// 4. Object State Logging
useEffect(() => {
  console.log('👤 User state changed:', user)
}, [user])`}</code></pre>
          </div>

          <div className="logging-tips">
            <h5>💡 Console Logging Best Practices:</h5>
            <ul>
              <li><strong>Use descriptive prefixes:</strong> 🔢, 👤, 📡, ✅, ❌ for easy identification</li>
              <li><strong>Log before and after:</strong> Track state transitions clearly</li>
              <li><strong>Group related logs:</strong> Use console.group() for complex flows</li>
              <li><strong>Remove production logs:</strong> Use environment checks or build tools</li>
              <li><strong>Use console.table():</strong> For arrays and objects with structured data</li>
            </ul>
          </div>
        </div>
      </div>

      {/* User Form Debugging */}
      <div className="example-section">
        <h3>👤 Form State Debugging</h3>
        <div className="code-example">
          <p>
            Debugging form inputs and user interactions. Watch the console as you type.
          </p>
          
          <div className="component-demo">
            <div className="debug-form">
              <h4>User Form (Check Console)</h4>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleUserChange('name', e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => handleUserChange('email', e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="user-preview">
                <strong>Current User:</strong>
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </div>
            </div>
          </div>

          <div className="debug-code">
            <h5>📝 Form Debugging Code:</h5>
            <pre><code>{`const handleUserChange = (field, value) => {
  console.log(\`👤 Updating user.\${field}:\`, value)
  setUser(prev => {
    const updated = { ...prev, [field]: value }
    console.log('👤 New user state:', updated)
    return updated
  })
}

// Advanced debugging with console.table
useEffect(() => {
  console.table(user) // Nice table format for objects
}, [user])`}</code></pre>
          </div>
        </div>
      </div>

      {/* Async Operations Debugging */}
      <div className="example-section">
        <h3>📡 Async Operations Debugging</h3>
        <div className="code-example">
          <p>
            Debugging async operations like API calls, timeouts, and promises.
          </p>
          
          <div className="component-demo">
            <div className="debug-async">
              <h4>Async Todos (Check Console)</h4>
              <button onClick={fetchTodos} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Todos'}
              </button>
              <div className="todos-list">
                {todos.map((todo, index) => (
                  <div key={index}>{todo}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="debug-code">
            <h5>📝 Async Debugging Code:</h5>
            <pre><code>{`const fetchTodos = useCallback(async () => {
  console.log('📡 Starting to fetch todos...')
  setLoading(true)
  
  try {
    const response = await fetch('/api/todos')
    console.log('✅ Todos fetched successfully:', response)
    setTodos(response)
  } catch (error) {
    console.error('❌ Error fetching todos:', error)
  } finally {
    setLoading(false)
    console.log('🏁 Fetch todos completed')
  }
}, [])

// Performance debugging
useEffect(() => {
  const start = performance.now()
  // ... expensive operation
  const end = performance.now()
  console.log(\`⏱️ Operation took \${end - start} milliseconds\`)
})`}</code></pre>
          </div>
        </div>
      </div>

      {/* React DevTools */}
      <div className="example-section">
        <h3>🔧 React DevTools</h3>
        <div className="code-example">
          <p>
            React DevTools is a browser extension that provides powerful debugging capabilities
            for React applications. It's essential for any React developer.
          </p>
          
          <div className="devtools-info">
            <h4>🚀 Installing React DevTools:</h4>
            <ul>
              <li><strong>Chrome:</strong> <a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi" target="_blank" rel="noopener noreferrer">Chrome Web Store</a></li>
              <li><strong>Firefox:</strong> <a href="https://addons.mozilla.org/en-US/firefox/addon/react-devtools/" target="_blank" rel="noopener noreferrer">Firefox Add-ons</a></li>
              <li><strong>Edge:</strong> <a href="https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil" target="_blank" rel="noopener noreferrer">Edge Add-ons</a></li>
            </ul>
          </div>

          <div className="devtools-features">
            <h4>🎯 Key React DevTools Features:</h4>
            
            <div className="feature-grid">
              <div className="feature">
                <h5>🌳 Component Tree</h5>
                <ul>
                  <li>Inspect component hierarchy</li>
                  <li>View component names and structure</li>
                  <li>Navigate through nested components</li>
                  <li>See custom hooks and their values</li>
                </ul>
              </div>

              <div className="feature">
                <h5>📊 Props & State</h5>
                <ul>
                  <li>View current props and state</li>
                  <li>Edit state values in real-time</li>
                  <li>See prop types and default values</li>
                  <li>Track state changes over time</li>
                </ul>
              </div>

              <div className="feature">
                <h5>🔍 Search & Filter</h5>
                <ul>
                  <li>Search components by name</li>
                  <li>Filter by component type</li>
                  <li>Find specific hooks or state</li>
                  <li>Navigate large component trees</li>
                </ul>
              </div>

              <div className="feature">
                <h5>📈 Performance Profiler</h5>
                <ul>
                  <li>Profile render performance</li>
                  <li>Identify slow components</li>
                  <li>Track re-render causes</li>
                  <li>Optimize app performance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="devtools-usage">
            <h4>💡 How to Use React DevTools:</h4>
            <ol>
              <li><strong>Open DevTools:</strong> F12 or right-click → "Inspect"</li>
              <li><strong>Find React Tab:</strong> Look for "⚛️ Components" and "⚛️ Profiler" tabs</li>
              <li><strong>Select Component:</strong> Click on any component in the tree</li>
              <li><strong>Inspect Data:</strong> View props, state, and hooks in the right panel</li>
              <li><strong>Edit Values:</strong> Double-click to edit state or props</li>
              <li><strong>Profile Performance:</strong> Use the Profiler tab to record renders</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Performance Debugging */}
      <div className="example-section">
        <h3>⚡ Performance Debugging</h3>
        <div className="code-example">
          <p>
            Identify and fix performance issues in React applications.
          </p>
          
          <div className="debug-code">
            <h5>📝 Performance Debugging Techniques:</h5>
            <pre><code>{`// 1. Track Re-renders
const renderCount = useRef(0)
useEffect(() => {
  renderCount.current += 1
  console.log(\`🎨 Component rendered \${renderCount.current} times\`)
})

// 2. Measure Render Time
const startTime = performance.now()
// ... render logic
const endTime = performance.now()
console.log(\`⏱️ Render took \${endTime - startTime} milliseconds\`)

// 3. Debug useEffect Dependencies
useEffect(() => {
  console.log('🔄 Effect triggered by:', { user, count })
}, [user, count])

// 4. Profile Expensive Operations
console.time('expensiveOperation')
// ... expensive calculation
console.timeEnd('expensiveOperation')

// 5. Memory Leak Detection
useEffect(() => {
  const interval = setInterval(() => {
    console.log('⏰ Interval running')
  }, 1000)
  
  return () => {
    console.log('🧹 Cleaning up interval')
    clearInterval(interval)
  }
}, [])`}</code></pre>
          </div>

          <div className="performance-tips">
            <h5>🚀 Performance Optimization Tips:</h5>
            <ul>
              <li><strong>React.memo():</strong> Prevent unnecessary re-renders</li>
              <li><strong>useMemo():</strong> Memoize expensive calculations</li>
              <li><strong>useCallback():</strong> Memoize function references</li>
              <li><strong>Lazy Loading:</strong> Split code and load components on demand</li>
              <li><strong>Virtual Scrolling:</strong> Handle large lists efficiently</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Debugging Tools & Techniques */}
      <div className="example-section">
        <h3>🛠️ Advanced Debugging Tools</h3>
        <div className="code-example">
          
          <div className="tools-grid">
            <div className="tool">
              <h5>🔍 Browser DevTools</h5>
              <ul>
                <li><strong>Console:</strong> Logging, errors, warnings</li>
                <li><strong>Network:</strong> API calls, resource loading</li>
                <li><strong>Sources:</strong> Breakpoints, step debugging</li>
                <li><strong>Application:</strong> Local storage, session storage</li>
              </ul>
            </div>

            <div className="tool">
              <h5>⚛️ React-Specific Tools</h5>
              <ul>
                <li><strong>React DevTools:</strong> Component inspection</li>
                <li><strong>Redux DevTools:</strong> State management debugging</li>
                <li><strong>React Hook Form DevTools:</strong> Form debugging</li>
                <li><strong>Storybook:</strong> Component development environment</li>
              </ul>
            </div>

            <div className="tool">
              <h5>🧪 Testing & Quality</h5>
              <ul>
                <li><strong>Jest:</strong> Unit testing framework</li>
                <li><strong>React Testing Library:</strong> Component testing</li>
                <li><strong>ESLint:</strong> Code quality and standards</li>
                <li><strong>TypeScript:</strong> Type checking and IntelliSense</li>
              </ul>
            </div>

            <div className="tool">
              <h5>📊 Performance & Monitoring</h5>
              <ul>
                <li><strong>Lighthouse:</strong> Performance audits</li>
                <li><strong>Web Vitals:</strong> Core performance metrics</li>
                <li><strong>Bundle Analyzer:</strong> Analyze bundle size</li>
                <li><strong>Sentry:</strong> Error tracking and monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Tips */}
      <div className="example-section">
        <h3>💡 Debugging Interview Tips</h3>
        <div className="tips">
          <div className="tip">
            <h4>🎯 Common Debugging Questions</h4>
            <ul>
              <li>"How do you debug a React component that's not updating?"</li>
              <li>"What tools do you use for React debugging?"</li>
              <li>"How do you identify performance issues?"</li>
              <li>"How do you debug memory leaks in React?"</li>
              <li>"What's your approach to debugging async operations?"</li>
            </ul>
          </div>

          <div className="tip">
            <h4>🔧 Show Your Process</h4>
            <ul>
              <li><strong>Systematic Approach:</strong> Start with console logs, then DevTools</li>
              <li><strong>Tool Knowledge:</strong> Demonstrate React DevTools proficiency</li>
              <li><strong>Performance Awareness:</strong> Discuss optimization strategies</li>
              <li><strong>Testing Integration:</strong> Show how debugging connects to testing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DebuggingExamples
