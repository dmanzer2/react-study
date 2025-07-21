import React, { createContext, useContext, useReducer, useState } from 'react'

// 🌍 Global State Context - Simple useContext Example
const AppStateContext = createContext()

// 🎮 User preferences reducer for complex local logic
const userPrefsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload }
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, notifications: !state.notifications }
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload }
    case 'RESET_PREFERENCES':
      return {
        theme: 'light',
        language: 'en',
        notifications: true,
        fontSize: 'medium'
      }
    default:
      return state
  }
}

// 🗂️ Shopping Cart Reducer - Complex Business Logic
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    
    case 'CLEAR_CART':
      return { ...state, items: [] }
    
    case 'APPLY_DISCOUNT':
      return { ...state, discount: action.payload }
    
    default:
      return state
  }
}

// 🌍 Global State Provider Component
const GlobalStateProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    isLoggedIn: true
  })

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Welcome to the app!', read: false },
    { id: 2, message: 'You have 3 new messages', read: false }
  ])

  const login = (userData) => {
    setUser({ ...userData, isLoggedIn: true })
  }

  const logout = () => {
    setUser({ name: '', email: '', isLoggedIn: false })
  }

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const addNotification = (message) => {
    setNotifications(prev => [
      ...prev,
      { id: Date.now(), message, read: false }
    ])
  }

  const globalState = {
    user,
    notifications,
    login,
    logout,
    markNotificationAsRead,
    addNotification
  }

  return (
    <AppStateContext.Provider value={globalState}>
      {children}
    </AppStateContext.Provider>
  )
}

// 🔧 Custom hook for accessing global state
const useGlobalState = () => {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useGlobalState must be used within GlobalStateProvider')
  }
  return context
}

// 👤 User Profile Component using global state
const UserProfile = () => {
  const { user, logout } = useGlobalState()

  if (!user.isLoggedIn) {
    return <div className="user-profile">Please log in</div>
  }

  return (
    <div className="user-profile">
      <h4>👤 User Profile</h4>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={logout} className="btn-secondary">
        Logout
      </button>
    </div>
  )
}

// 🔔 Notifications Component using global state
const NotificationCenter = () => {
  const { notifications, markNotificationAsRead, addNotification } = useGlobalState()
  
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="notification-center">
      <h4>🔔 Notifications ({unreadCount} unread)</h4>
      
      <button 
        onClick={() => addNotification('New test notification!')}
        className="btn-primary"
      >
        Add Notification
      </button>

      <div className="notifications-list">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
            onClick={() => markNotificationAsRead(notification.id)}
          >
            <span className="notification-text">{notification.message}</span>
            {!notification.read && <span className="unread-indicator">●</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ⚙️ User Preferences Component using useReducer
const UserPreferences = () => {
  const [preferences, dispatch] = useReducer(userPrefsReducer, {
    theme: 'light',
    language: 'en',
    notifications: true,
    fontSize: 'medium'
  })

  return (
    <div className="user-preferences">
      <h4>⚙️ User Preferences (useReducer)</h4>
      
      <div className="preference-group">
        <label>
          Theme:
          <select
            value={preferences.theme}
            onChange={(e) => dispatch({ type: 'SET_THEME', payload: e.target.value })}
          >
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
            <option value="auto">🔄 Auto</option>
          </select>
        </label>
      </div>

      <div className="preference-group">
        <label>
          Language:
          <select
            value={preferences.language}
            onChange={(e) => dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })}
          >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Spanish</option>
            <option value="fr">🇫🇷 French</option>
            <option value="de">🇩🇪 German</option>
          </select>
        </label>
      </div>

      <div className="preference-group">
        <label>
          Font Size:
          <select
            value={preferences.fontSize}
            onChange={(e) => dispatch({ type: 'SET_FONT_SIZE', payload: e.target.value })}
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>

      <div className="preference-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={preferences.notifications}
            onChange={() => dispatch({ type: 'TOGGLE_NOTIFICATIONS' })}
          />
          Enable Notifications
        </label>
      </div>

      <button
        onClick={() => dispatch({ type: 'RESET_PREFERENCES' })}
        className="btn-secondary"
      >
        Reset to Defaults
      </button>

      <div className="preferences-preview">
        <h5>Current Preferences:</h5>
        <pre>{JSON.stringify(preferences, null, 2)}</pre>
      </div>
    </div>
  )
}

// 🛒 Shopping Cart Component using complex useReducer
const ShoppingCart = () => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    items: [],
    discount: 0
  })

  const products = [
    { id: 1, name: 'React Book', price: 29.99 },
    { id: 2, name: 'JavaScript Course', price: 49.99 },
    { id: 3, name: 'VS Code Extension', price: 9.99 }
  ]

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
    }
  }

  const applyDiscount = (percentage) => {
    dispatch({ type: 'APPLY_DISCOUNT', payload: percentage })
  }

  const totalPrice = cartState.items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  )

  const discountedPrice = totalPrice * (1 - cartState.discount / 100)

  return (
    <div className="shopping-cart">
      <h4>🛒 Shopping Cart (Complex useReducer)</h4>
      
      <div className="products-section">
        <h5>Available Products:</h5>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <h6>{product.name}</h6>
              <p>${product.price.toFixed(2)}</p>
              <button
                onClick={() => addToCart(product)}
                className="btn-primary"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart-section">
        <h5>Cart Items:</h5>
        {cartState.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cartState.items.map(item => (
              <div key={item.id} className="cart-item">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-delete"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <div className="discount-section">
            <button onClick={() => applyDiscount(10)} className="btn-secondary">
              Apply 10% Discount
            </button>
            <button onClick={() => applyDiscount(20)} className="btn-secondary">
              Apply 20% Discount
            </button>
            {cartState.discount > 0 && (
              <p>Discount: {cartState.discount}% off</p>
            )}
          </div>
          
          <div className="total-section">
            <p><strong>Subtotal: ${totalPrice.toFixed(2)}</strong></p>
            {cartState.discount > 0 && (
              <p><strong>Total: ${discountedPrice.toFixed(2)}</strong></p>
            )}
          </div>

          <button
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            className="btn-secondary"
            disabled={cartState.items.length === 0}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}

// 🗂️ Main State Management Examples Component
const StateManagementExamples = () => {
  return (
    <GlobalStateProvider>
      <div className="examples-container">
        
        {/* useContext for Simple Global State */}
        <div className="example-section">
          <h3>🌍 useContext for Simple Global State</h3>
          <div className="code-example">
            <p>
              <strong>Use Case:</strong> Sharing simple state across multiple components 
              without prop drilling (user info, theme, notifications).
            </p>
            
            <div className="global-state-demo">
              <div className="global-components-grid">
                <UserProfile />
                <NotificationCenter />
              </div>
            </div>

            <div className="context-explanation">
              <h5>🔍 How useContext Works:</h5>
              <ol>
                <li>Create context with <code>createContext()</code></li>
                <li>Wrap components with <code>Provider</code></li>
                <li>Use <code>useContext()</code> to access values</li>
                <li>Custom hook for easier access and error handling</li>
              </ol>
            </div>
          </div>
        </div>

        {/* useReducer for Complex Local Logic */}
        <div className="example-section">
          <h3>🎮 useReducer for Complex Local Logic</h3>
          <div className="code-example">
            <p>
              <strong>Use Case:</strong> Managing complex state with multiple related values 
              and various actions (forms, shopping carts, game state).
            </p>
            
            <div className="reducer-demos">
              <div className="reducer-demo">
                <UserPreferences />
              </div>
              
              <div className="reducer-demo">
                <ShoppingCart />
              </div>
            </div>

            <div className="reducer-explanation">
              <h5>🔍 When to Use useReducer:</h5>
              <ul>
                <li>✅ <strong>Complex state logic</strong> with multiple sub-values</li>
                <li>✅ <strong>State depends on previous state</strong> in complex ways</li>
                <li>✅ <strong>Multiple actions</strong> that modify state differently</li>
                <li>✅ <strong>Business logic</strong> that's easier to test in isolation</li>
                <li>✅ <strong>Performance</strong> when callbacks change frequently</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison and Best Practices */}
        <div className="example-section">
          <h3>⚖️ useState vs useReducer vs useContext</h3>
          <div className="code-example">
            <div className="comparison-grid">
              <div className="comparison-card">
                <h5>🔄 useState</h5>
                <p><strong>Best for:</strong></p>
                <ul>
                  <li>Simple state values</li>
                  <li>Independent state updates</li>
                  <li>Component-local state</li>
                </ul>
                <div className="code-snippet">
                  <code>const [count, setCount] = useState(0)</code>
                </div>
              </div>

              <div className="comparison-card">
                <h5>🎮 useReducer</h5>
                <p><strong>Best for:</strong></p>
                <ul>
                  <li>Complex state logic</li>
                  <li>Multiple related state values</li>
                  <li>State transitions with actions</li>
                </ul>
                <div className="code-snippet">
                  <code>const [state, dispatch] = useReducer(reducer, initialState)</code>
                </div>
              </div>

              <div className="comparison-card">
                <h5>🌍 useContext</h5>
                <p><strong>Best for:</strong></p>
                <ul>
                  <li>Sharing state across components</li>
                  <li>Avoiding prop drilling</li>
                  <li>Global or theme data</li>
                </ul>
                <div className="code-snippet">
                  <code>const value = useContext(MyContext)</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interview Tips */}
        <div className="example-section">
          <h3>💡 State Management Interview Tips</h3>
          <div className="tips">
            <div className="tip">
              <h4>🌍 useContext Best Practices</h4>
              <ul>
                <li>Don't overuse - not everything needs to be global</li>
                <li>Split contexts by concern (auth, theme, etc.)</li>
                <li>Use custom hooks for easier access</li>
                <li>Consider performance - context changes re-render all consumers</li>
              </ul>
            </div>

            <div className="tip">
              <h4>🎮 useReducer Best Practices</h4>
              <ul>
                <li>Keep reducers pure (no side effects)</li>
                <li>Use action types as constants</li>
                <li>Structure actions with type and payload</li>
                <li>Consider using with useContext for global state</li>
              </ul>
            </div>

            <div className="tip">
              <h4>🚀 When NOT to Use Redux</h4>
              <ul>
                <li>Small to medium apps can use built-in hooks</li>
                <li>useContext + useReducer covers many use cases</li>
                <li>Server state might be better with React Query</li>
                <li>Component state is often sufficient</li>
              </ul>
            </div>

            <div className="tip">
              <h4>📝 Common Interview Questions</h4>
              <ul>
                <li>"How do you manage global state without Redux?"</li>
                <li>"When would you use useReducer over useState?"</li>
                <li>"How do you prevent prop drilling?"</li>
                <li>"What are the performance implications of useContext?"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </GlobalStateProvider>
  )
}

export default StateManagementExamples
