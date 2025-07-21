import React, { useState, useEffect, useContext, useRef, useReducer, useMemo, useCallback, createContext } from 'react'

// 🌍 Context for theme
const ThemeContext = createContext()

// 🎮 Reducer for complex state management
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { 
          id: Date.now(), 
          text: action.payload, 
          completed: false 
        }]
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload 
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      }
    default:
      return state
  }
}

// 🎨 Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// 🎯 Focus Input Component (useRef example)
const FocusInput = () => {
  const inputRef = useRef(null)
  const [value, setValue] = useState('')

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const clearAndFocus = () => {
    setValue('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <div className="focus-demo">
      <h4>🎯 useRef - Direct DOM Access</h4>
      <div className="input-group">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
        />
        <button onClick={focusInput}>🎯 Focus</button>
        <button onClick={clearAndFocus}>🧹 Clear & Focus</button>
      </div>
      <p>Value: {value}</p>
    </div>
  )
}

// ⏱️ Timer Component (useState + useEffect)
const Timer = () => {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let interval = null
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }

    // Cleanup function
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const toggle = () => setIsRunning(!isRunning)
  const reset = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer-demo">
      <h4>⏱️ useState + useEffect - Timer</h4>
      <div className="timer-display">
        {formatTime(seconds)}
      </div>
      <div className="timer-controls">
        <button onClick={toggle} className={isRunning ? 'pause' : 'play'}>
          {isRunning ? '⏸️' : '▶️'} {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset}>🔄 Reset</button>
      </div>
    </div>
  )
}

// 📊 Expensive Calculation Component (useMemo)
const ExpensiveCalculation = () => {
  const [count, setCount] = useState(1)
  const [input, setInput] = useState('')

  // Expensive calculation that only runs when count changes
  const expensiveValue = useMemo(() => {
    console.log('🔄 Calculating expensive value...')
    // Simulate expensive calculation
    let result = 0
    for (let i = 0; i < count * 1000000; i++) {
      result += i
    }
    return result
  }, [count])

  const fibonacci = useMemo(() => {
    const fib = (n) => {
      if (n <= 1) return n
      return fib(n - 1) + fib(n - 2)
    }
    return fib(Math.min(count, 35)) // Cap at 35 to avoid hanging
  }, [count])

  return (
    <div className="memo-demo">
      <h4>🧠 useMemo - Expensive Calculations</h4>
      <div className="controls">
        <label>
          Count: 
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min="1"
            max="100"
          />
        </label>
        <label>
          Random Input: 
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type anything..."
          />
        </label>
      </div>
      <div className="results">
        <p>Expensive Value: {expensiveValue.toLocaleString()}</p>
        <p>Fibonacci({Math.min(count, 35)}): {fibonacci.toLocaleString()}</p>
        <p>Input length: {input.length}</p>
      </div>
    </div>
  )
}

// 📝 Todo List Component (useReducer + useCallback)
const TodoList = () => {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [
      { id: 1, text: 'Learn React Hooks', completed: true },
      { id: 2, text: 'Practice useReducer', completed: false },
      { id: 3, text: 'Build awesome apps', completed: false }
    ],
    filter: 'all'
  })

  const [newTodo, setNewTodo] = useState('')

  // useCallback to prevent unnecessary re-renders
  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo.trim() })
      setNewTodo('')
    }
  }, [newTodo])

  const toggleTodo = useCallback((id) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id })
  }, [])

  const deleteTodo = useCallback((id) => {
    dispatch({ type: 'DELETE_TODO', payload: id })
  }, [])

  const setFilter = useCallback((filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter })
  }, [])

  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(todo => !todo.completed)
      case 'completed':
        return state.todos.filter(todo => todo.completed)
      default:
        return state.todos
    }
  }, [state.todos, state.filter])

  const stats = useMemo(() => ({
    total: state.todos.length,
    completed: state.todos.filter(t => t.completed).length,
    active: state.todos.filter(t => !t.completed).length
  }), [state.todos])

  return (
    <div className="todo-demo">
      <h4>📝 useReducer + useCallback - Todo List</h4>
      
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>➕ Add</button>
      </div>

      <div className="todo-filters">
        <button 
          className={state.filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All ({stats.total})
        </button>
        <button 
          className={state.filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active ({stats.active})
        </button>
        <button 
          className={state.filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed ({stats.completed})
        </button>
      </div>

      <div className="todo-list">
        {filteredTodos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span className="todo-text">{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  )
}

// 🎨 Themed Component (useContext)
const ThemedButton = ({ children, onClick }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  
  return (
    <div className="themed-component">
      <h4>🎨 useContext - Theme Management</h4>
      <p>Current theme: {theme === 'light' ? '☀️ Light' : '🌙 Dark'}</p>
      <button 
        className={`themed-btn ${theme}`}
        onClick={toggleTheme}
      >
        🎨 Toggle Theme
      </button>
      {children && (
        <button className={`themed-btn ${theme}`} onClick={onClick}>
          {children}
        </button>
      )}
    </div>
  )
}

// 🎣 Custom Hook Example
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  }

  return [storedValue, setValue]
}

// 🔧 Custom Hook Demo
const CustomHookDemo = () => {
  const [name, setName] = useLocalStorage('userName', '')
  const [preferences, setPreferences] = useLocalStorage('userPrefs', {
    notifications: true,
    darkMode: false
  })

  return (
    <div className="custom-hook-demo">
      <h4>🔧 Custom Hook - useLocalStorage</h4>
      <div className="form-group">
        <label>
          Name (saved to localStorage):
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
          />
        </label>
      </div>
      
      <div className="preferences">
        <h5>Preferences:</h5>
        <label>
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={(e) => setPreferences({
              ...preferences,
              notifications: e.target.checked
            })}
          />
          Enable Notifications
        </label>
        <label>
          <input
            type="checkbox"
            checked={preferences.darkMode}
            onChange={(e) => setPreferences({
              ...preferences,
              darkMode: e.target.checked
            })}
          />
          Dark Mode
        </label>
      </div>
      
      <p>💾 Data is automatically saved to localStorage!</p>
    </div>
  )
}

// 🎣 Main Hooks Examples Component
const HooksExamples = () => {
  return (
    <ThemeProvider>
      <div className="examples-container">
        <div className="example-section">
          <h3>🎣 React Hooks Examples</h3>
          
          <div className="hooks-grid">
            <div className="hook-example">
              <Timer />
            </div>
            
            <div className="hook-example">
              <FocusInput />
            </div>
            
            <div className="hook-example">
              <ThemedButton>Custom Action</ThemedButton>
            </div>
            
            <div className="hook-example">
              <CustomHookDemo />
            </div>
          </div>
        </div>

        <div className="example-section">
          <ExpensiveCalculation />
        </div>

        <div className="example-section">
          <TodoList />
        </div>

        <div className="example-section">
          <h3>📚 Hooks Summary</h3>
          <div className="hooks-reference">
            <div className="hook-ref">
              <h4>🔄 useState</h4>
              <p>Adds state to functional components</p>
              <code>const [state, setState] = useState(initialValue)</code>
            </div>
            
            <div className="hook-ref">
              <h4>⚡ useEffect</h4>
              <p>Handles side effects (API calls, subscriptions, etc.)</p>
              <code>useEffect(() =&gt; {'{/* effect */}'}, [dependencies])</code>
            </div>
            
            <div className="hook-ref">
              <h4>🌍 useContext</h4>
              <p>Consumes context values without nesting</p>
              <code>const value = useContext(MyContext)</code>
            </div>
            
            <div className="hook-ref">
              <h4>🎯 useRef</h4>
              <p>Direct DOM access and mutable values</p>
              <code>const ref = useRef(initialValue)</code>
            </div>
            
            <div className="hook-ref">
              <h4>🎮 useReducer</h4>
              <p>Complex state logic with actions</p>
              <code>const [state, dispatch] = useReducer(reducer, initialState)</code>
            </div>
            
            <div className="hook-ref">
              <h4>🧠 useMemo</h4>
              <p>Memoizes expensive calculations</p>
              <code>const memoized = useMemo(() =&gt; expensive(), [deps])</code>
            </div>
            
            <div className="hook-ref">
              <h4>🔄 useCallback</h4>
              <p>Memoizes functions to prevent re-renders</p>
              <code>const callback = useCallback(() =&gt; {'{/* fn */}'}, [deps])</code>
            </div>
          </div>
        </div>

        <div className="example-section">
          <h3>💡 Interview Tips</h3>
          <div className="tips">
            <div className="tip">
              <h4>Rules of Hooks</h4>
              <ul>
                <li>Only call at the top level (not in loops/conditions)</li>
                <li>Only call from React functions or custom hooks</li>
                <li>Use ESLint plugin for enforcement</li>
              </ul>
            </div>
            
            <div className="tip">
              <h4>Performance</h4>
              <ul>
                <li>useMemo for expensive calculations</li>
                <li>useCallback for stable function references</li>
                <li>React.memo for component memoization</li>
                <li>Don't over-optimize - profile first!</li>
              </ul>
            </div>
            
            <div className="tip">
              <h4>Common Patterns</h4>
              <ul>
                <li>Custom hooks for reusable logic</li>
                <li>useReducer for complex state</li>
                <li>useContext for prop drilling</li>
                <li>useEffect cleanup for subscriptions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default HooksExamples
