import React, { useState } from 'react'

// 🎨 Child Component that receives props
const UserCard = ({ user, onEdit, onDelete, theme = 'light' }) => {
  const cardClass = `user-card ${theme}`
  
  return (
    <div className={cardClass}>
      <h4>👤 {user.name}</h4>
      <p>📧 {user.email}</p>
      <p>🎂 Age: {user.age}</p>
      <p>🌟 Role: {user.role}</p>
      <div className="card-actions">
        <button onClick={() => onEdit(user.id)} className="btn-edit">
          ✏️ Edit
        </button>
        <button onClick={() => onDelete(user.id)} className="btn-delete">
          🗑️ Delete
        </button>
      </div>
    </div>
  )
}

// 📝 Form Component demonstrating controlled components
const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState(user || {
    name: '',
    email: '',
    age: '',
    role: 'user'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          min="1"
          max="120"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn-primary">
          💾 Save
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          ❌ Cancel
        </button>
      </div>
    </form>
  )
}

// 📊 Counter Component demonstrating state lifting
const Counter = ({ count, onIncrement, onDecrement, label }) => {
  return (
    <div className="counter">
      <h4>{label}</h4>
      <div className="counter-controls">
        <button onClick={onDecrement}>➖</button>
        <span className="count-display">{count}</span>
        <button onClick={onIncrement}>➕</button>
      </div>
    </div>
  )
}

// 🎛️ Main Component demonstrating state management
const PropsStateExamples = () => {
  // 👥 Users state
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, role: 'moderator' }
  ])
  
  // 📝 Form state
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  
  // 🎨 Theme state
  const [theme, setTheme] = useState('light')
  
  // 📊 Counter state (lifted up from child components)
  const [globalCounter, setGlobalCounter] = useState(0)
  const [userCounter, setUserCounter] = useState(0)

  // 👥 User management functions
  const handleEditUser = (userId) => {
    const user = users.find(u => u.id === userId)
    setEditingUser(user)
    setShowForm(true)
  }

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== userId))
    }
  }

  const handleSaveUser = (userData) => {
    if (editingUser) {
      // Update existing user
      setUsers(prev => prev.map(u => 
        u.id === editingUser.id ? { ...userData, id: editingUser.id } : u
      ))
    } else {
      // Add new user
      const newUser = {
        ...userData,
        id: Date.now(), // Simple ID generation
        age: parseInt(userData.age)
      }
      setUsers(prev => [...prev, newUser])
    }
    
    setShowForm(false)
    setEditingUser(null)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingUser(null)
  }

  // 📊 Counter functions
  const incrementGlobal = () => setGlobalCounter(prev => prev + 1)
  const decrementGlobal = () => setGlobalCounter(prev => Math.max(0, prev - 1))
  const incrementUser = () => setUserCounter(prev => prev + 1)
  const decrementUser = () => setUserCounter(prev => Math.max(0, prev - 1))

  return (
    <div className="examples-container">
      <div className="example-section">
        <h3>🎨 Props Passing</h3>
        <div className="code-example">
          <div className="theme-controls">
            <label>
              Theme:
              <select value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">☀️ Light</option>
                <option value="dark">🌙 Dark</option>
              </select>
            </label>
          </div>
          
          <div className="users-grid">
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                theme={theme}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
          
          <button 
            onClick={() => setShowForm(true)} 
            className="btn-primary add-user-btn"
          >
            ➕ Add New User
          </button>
        </div>
      </div>

      <div className="example-section">
        <h3>📝 State Management & Controlled Components</h3>
        <div className="code-example">
          {showForm && (
            <div className="modal-overlay">
              <div className="modal">
                <h4>{editingUser ? '✏️ Edit User' : '➕ Add New User'}</h4>
                <UserForm
                  user={editingUser}
                  onSave={handleSaveUser}
                  onCancel={handleCancelForm}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="example-section">
        <h3>⬆️ Lifting State Up</h3>
        <div className="code-example">
          <p>
            <strong>Concept:</strong> When multiple components need to share state, 
            move it up to their closest common ancestor.
          </p>
          
          <div className="counters-demo">
            <Counter
              count={globalCounter}
              onIncrement={incrementGlobal}
              onDecrement={decrementGlobal}
              label="🌍 Global Counter"
            />
            
            <Counter
              count={userCounter}
              onIncrement={incrementUser}
              onDecrement={decrementUser}
              label="👤 User Counter"
            />
            
            <div className="counter-summary">
              <h4>📊 Summary</h4>
              <p>Total: {globalCounter + userCounter}</p>
              <p>Difference: {Math.abs(globalCounter - userCounter)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h3>📚 Interview Tips</h3>
        <div className="code-example tips">
          <div className="tip">
            <h4>🎯 Props</h4>
            <ul>
              <li>Data flows down from parent to child</li>
              <li>Props are read-only (immutable)</li>
              <li>Use destructuring for cleaner code</li>
              <li>Provide default values when needed</li>
            </ul>
          </div>
          
          <div className="tip">
            <h4>🔄 State</h4>
            <ul>
              <li>Local to the component that owns it</li>
              <li>Always use setState() or useState()</li>
              <li>State updates may be asynchronous</li>
              <li>Lift state up when siblings need to share</li>
            </ul>
          </div>
          
          <div className="tip">
            <h4>🎮 Controlled Components</h4>
            <ul>
              <li>Form inputs controlled by React state</li>
              <li>Value and onChange handler required</li>
              <li>Single source of truth</li>
              <li>Easier to validate and manipulate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropsStateExamples
