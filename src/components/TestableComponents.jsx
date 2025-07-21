import React, { useState } from 'react'

// 🧪 Simple Counter Component for Testing
export const Counter = ({ initialCount = 0, step = 1 }) => {
  const [count, setCount] = useState(initialCount)

  const increment = () => setCount(prev => prev + step)
  const decrement = () => setCount(prev => prev - step)
  const reset = () => setCount(initialCount)

  return (
    <div data-testid="counter">
      <h3>Counter Component</h3>
      <p data-testid="count-display">Count: {count}</p>
      <button onClick={increment} data-testid="increment-btn">
        Increment
      </button>
      <button onClick={decrement} data-testid="decrement-btn">
        Decrement
      </button>
      <button onClick={reset} data-testid="reset-btn">
        Reset
      </button>
    </div>
  )
}

// 📝 User Form Component for Testing
export const UserForm = ({ onSubmit, initialUser = null }) => {
  const [formData, setFormData] = useState({
    name: initialUser?.name || '',
    email: initialUser?.email || '',
    age: initialUser?.age || ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required'
    } else if (formData.age < 18) {
      newErrors.age = 'Must be at least 18 years old'
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)
      try {
        await onSubmit(formData)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} data-testid="user-form">
      <h3>User Form</h3>
      
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          data-testid="name-input"
        />
        {errors.name && (
          <span data-testid="name-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          data-testid="email-input"
        />
        {errors.email && (
          <span data-testid="email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleInputChange}
          data-testid="age-input"
        />
        {errors.age && (
          <span data-testid="age-error" role="alert">
            {errors.age}
          </span>
        )}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        data-testid="submit-btn"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}

// 📋 Todo List Component for Testing
export const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos(prev => [
        ...prev,
        { id: Date.now(), text: inputValue.trim(), completed: false }
      ])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div data-testid="todo-list">
      <h3>Todo List</h3>
      
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new todo"
          data-testid="todo-input"
        />
        <button onClick={addTodo} data-testid="add-todo-btn">
          Add Todo
        </button>
      </div>

      <div data-testid="todo-stats">
        Total: {todos.length} | Completed: {completedCount}
      </div>

      <ul data-testid="todos-list">
        {todos.map(todo => (
          <li key={todo.id} data-testid={`todo-${todo.id}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              data-testid={`todo-checkbox-${todo.id}`}
            />
            <span 
              style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none' 
              }}
              data-testid={`todo-text-${todo.id}`}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              data-testid={`delete-btn-${todo.id}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p data-testid="empty-message">No todos yet!</p>
      )}
    </div>
  )
}

// 🎯 Async Component for Testing
export const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUser = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (userId === 'invalid') {
        throw new Error('User not found')
      }
      
      setUser({
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    if (userId) {
      fetchUser()
    }
  }, [userId])

  if (loading) {
    return <div data-testid="loading">Loading user...</div>
  }

  if (error) {
    return (
      <div data-testid="error">
        Error: {error}
        <button onClick={fetchUser} data-testid="retry-btn">
          Retry
        </button>
      </div>
    )
  }

  if (!user) {
    return <div data-testid="no-user">No user selected</div>
  }

  return (
    <div data-testid="user-profile">
      <h3>User Profile</h3>
      <p data-testid="user-name">Name: {user.name}</p>
      <p data-testid="user-email">Email: {user.email}</p>
      <button onClick={fetchUser} data-testid="refresh-btn">
        Refresh
      </button>
    </div>
  )
}
