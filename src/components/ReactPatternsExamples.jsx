import React, { useState, useRef } from 'react'

// 🎯 Dedicated component for React Patterns & Logic
const ReactPatternsExamples = () => {
  // States for conditional rendering examples
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState('guest')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'Welcome to the app!' },
    { id: 2, type: 'warning', message: 'Your session expires in 10 minutes' },
    { id: 3, type: 'error', message: 'Failed to save changes' }
  ])

  // States for lifting state up example
  const [parentCounter, setParentCounter] = useState(0)
  const [childACount, setChildACount] = useState(0)
  const [childBCount, setChildBCount] = useState(0)

  // States for controlled vs uncontrolled inputs
  const [controlledValue, setControlledValue] = useState('')
  const uncontrolledRef = useRef(null)
  const [uncontrolledResult, setUncontrolledResult] = useState('')

  // Child components for lifting state up
  const ChildA = ({ count, onIncrement, parentCount }) => (
    <div className="child-component">
      <h5>👶 Child A</h5>
      <p>My count: {count}</p>
      <p>Parent's count: {parentCount}</p>
      <button onClick={onIncrement}>Increment My Count</button>
    </div>
  )

  const ChildB = ({ count, onIncrement, parentCount }) => (
    <div className="child-component">
      <h5>👶 Child B</h5>
      <p>My count: {count}</p>
      <p>Parent's count: {parentCount}</p>
      <button onClick={onIncrement}>Increment My Count</button>
    </div>
  )

  // Functions for lifting state up
  const incrementParent = () => setParentCounter(prev => prev + 1)
  const incrementChildA = () => setChildACount(prev => prev + 1)
  const incrementChildB = () => setChildBCount(prev => prev + 1)

  // Function to get uncontrolled input value
  const getUncontrolledValue = () => {
    const value = uncontrolledRef.current?.value || ''
    setUncontrolledResult(value)
  }

  return (
    <div className="examples-container">
      
      {/* 🔀 CONDITIONAL RENDERING SECTION */}
      <div className="example-section">
        <h3>🔀 Conditional Rendering Patterns</h3>
        
        <div className="code-example">
          <h4>1️⃣ Logical AND (&&) Operator</h4>
          <div className="demo">
            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
              {isLoggedIn ? 'Logout' : 'Login'}
            </button>
            {/* ✅ Logical AND - Shows element only if condition is true */}
            {isLoggedIn && (
              <div className="success-message">
                ✅ Welcome! You are logged in.
              </div>
            )}
            {!isLoggedIn && (
              <div className="warning-message">
                ⚠️ Please log in to continue.
              </div>
            )}
          </div>
          <div className="code-snippet">
            <strong>Pattern:</strong> <code>{`{condition && <Element />}`}</code>
          </div>
        </div>

        <div className="code-example">
          <h4>2️⃣ Ternary Operator (? :)</h4>
          <div className="demo">
            <select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
              <option value="guest">Guest</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            
            {/* ✅ Ternary Operator - Choose between two elements */}
            <div className="user-status">
              {userRole === 'admin' ? (
                <span className="admin-badge">🔐 Admin Access</span>
              ) : userRole === 'user' ? (
                <span className="user-badge">👤 User Access</span>
              ) : (
                <span className="guest-badge">👋 Guest Access</span>
              )}
            </div>
          </div>
          <div className="code-snippet">
            <strong>Pattern:</strong> <code>{`{condition ? <ElementA /> : <ElementB />}`}</code>
          </div>
        </div>

        <div className="code-example">
          <h4>3️⃣ If Blocks (Early Return / Variable Assignment)</h4>
          <div className="demo">
            <button onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? 'Hide' : 'Show'} Advanced Features
            </button>
            
            {(() => {
              // ✅ If blocks using IIFE (Immediately Invoked Function Expression)
              if (!showAdvanced) {
                return <p>Basic features only</p>
              }
              
              if (userRole === 'admin') {
                return (
                  <div className="advanced-features">
                    <h5>🚀 Advanced Admin Features</h5>
                    <ul>
                      <li>User Management</li>
                      <li>System Settings</li>
                      <li>Analytics Dashboard</li>
                    </ul>
                  </div>
                )
              }
              
              return (
                <div className="advanced-features">
                  <h5>✨ Advanced User Features</h5>
                  <ul>
                    <li>Profile Customization</li>
                    <li>Notification Settings</li>
                    <li>Data Export</li>
                  </ul>
                </div>
              )
            })()}
          </div>
          <div className="code-snippet">
            <strong>Pattern:</strong> <code>{`{(() => { if (condition) return <Element />; return <Other />; })()}`}</code>
          </div>
        </div>
      </div>

      {/* 📝 LISTS AND KEYS SECTION */}
      <div className="example-section">
        <h3>📝 Lists and Keys with .map()</h3>
        
        <div className="code-example">
          <h4>🔑 Proper Key Props</h4>
          <div className="demo">
            <button onClick={() => setNotifications(prev => [
              ...prev,
              { 
                id: Date.now(), 
                type: 'success', 
                message: `New notification #${prev.length + 1}` 
              }
            ])}>
              Add Notification
            </button>
            
            <button onClick={() => setNotifications(prev => 
              prev.filter((_, index) => index !== 0)
            )}>
              Remove First
            </button>

            <div className="notifications-list">
              {/* ✅ Proper use of .map() with unique keys */}
              {notifications.map(notification => (
                <div 
                  key={notification.id} // ✅ Unique, stable key
                  className={`notification notification-${notification.type}`}
                >
                  <span className="notification-icon">
                    {notification.type === 'info' && 'ℹ️'}
                    {notification.type === 'warning' && '⚠️'}
                    {notification.type === 'error' && '❌'}
                    {notification.type === 'success' && '✅'}
                  </span>
                  <span className="notification-message">{notification.message}</span>
                  <button 
                    onClick={() => setNotifications(prev => 
                      prev.filter(n => n.id !== notification.id)
                    )}
                    className="notification-close"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="key-examples">
            <h5>🔍 Key Examples:</h5>
            <div className="key-comparison">
              <div className="good-practice">
                <h6>✅ Good Keys:</h6>
                <ul>
                  <li><code>key={'{item.id}'}</code> - Unique ID</li>
                  <li><code>key={'{user.email}'}</code> - Unique property</li>
                  <li><code>key={'{`${item.category}-${item.id}`}'}</code> - Composite key</li>
                </ul>
              </div>
              <div className="bad-practice">
                <h6>❌ Avoid:</h6>
                <ul>
                  <li><code>key={'{index}'}</code> - Array index (can cause issues)</li>
                  <li><code>key={'{Math.random()}'}</code> - Random values</li>
                  <li><code>key={'{new Date()}'}</code> - Non-stable values</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ⬆️ LIFTING STATE UP SECTION */}
      <div className="example-section">
        <h3>⬆️ Lifting State Up: Parent-Child Communication</h3>
        
        <div className="code-example">
          <h4>👨‍👩‍👧‍👦 Parent Component Managing Shared State</h4>
          <div className="demo">
            <div className="parent-component">
              <h5>👨‍👩‍👧 Parent Component</h5>
              <p>Parent Counter: {parentCounter}</p>
              <p>Total from all children: {childACount + childBCount}</p>
              <button onClick={incrementParent}>Increment Parent</button>
              
              <div className="children-container">
                {/* ✅ Lifting state up - parent manages state, passes down props and callbacks */}
                <ChildA 
                  count={childACount}
                  onIncrement={incrementChildA}
                  parentCount={parentCounter}
                />
                <ChildB 
                  count={childBCount}
                  onIncrement={incrementChildB}
                  parentCount={parentCounter}
                />
              </div>
            </div>
          </div>
          
          <div className="lifting-state-explanation">
            <h5>🔍 Why Lift State Up?</h5>
            <ul>
              <li>✅ <strong>Shared Data:</strong> When multiple components need the same data</li>
              <li>✅ <strong>Sibling Communication:</strong> When siblings need to communicate</li>
              <li>✅ <strong>Single Source of Truth:</strong> Prevents data inconsistency</li>
              <li>✅ <strong>Easier Testing:</strong> State logic is centralized</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🎮 CONTROLLED VS UNCONTROLLED INPUTS SECTION */}
      <div className="example-section">
        <h3>🎮 Controlled vs Uncontrolled Inputs</h3>
        
        <div className="code-example">
          <h4>🎛️ Controlled Input (Recommended)</h4>
          <div className="demo">
            <div className="input-demo">
              <label>
                Controlled Input:
                <input
                  type="text"
                  value={controlledValue} // ✅ Value controlled by React state
                  onChange={(e) => setControlledValue(e.target.value)} // ✅ Updates state on change
                  placeholder="Type something..."
                />
              </label>
              <p>Current value: <strong>{controlledValue}</strong></p>
              <p>Length: <strong>{controlledValue.length}</strong></p>
              <button onClick={() => setControlledValue('')}>Clear</button>
              <button onClick={() => setControlledValue('Hello World!')}>Set Default</button>
            </div>
          </div>
          
          <div className="controlled-benefits">
            <h5>✅ Controlled Input Benefits:</h5>
            <ul>
              <li>Real-time validation</li>
              <li>Format input as user types</li>
              <li>Conditional logic based on input</li>
              <li>Easy to reset/clear programmatically</li>
              <li>Form submission handling</li>
            </ul>
          </div>
        </div>

        <div className="code-example">
          <h4>🎯 Uncontrolled Input (Limited Use Cases)</h4>
          <div className="demo">
            <div className="input-demo">
              <label>
                Uncontrolled Input:
                <input
                  ref={uncontrolledRef} // ✅ Uses ref to access DOM directly
                  type="text"
                  defaultValue="Default text" // ✅ Uses defaultValue, not value
                  placeholder="Type something..."
                />
              </label>
              <button onClick={getUncontrolledValue}>Get Value</button>
              <button onClick={() => {
                if (uncontrolledRef.current) {
                  uncontrolledRef.current.value = ''
                }
                setUncontrolledResult('')
              }}>Clear</button>
              {uncontrolledResult && (
                <p>Retrieved value: <strong>{uncontrolledResult}</strong></p>
              )}
            </div>
          </div>
          
          <div className="uncontrolled-info">
            <h5>⚠️ When to Use Uncontrolled:</h5>
            <ul>
              <li>Simple forms without real-time validation</li>
              <li>File inputs (always uncontrolled)</li>
              <li>Integrating with non-React libraries</li>
              <li>Performance optimization (rare cases)</li>
            </ul>
          </div>
        </div>

        <div className="comparison-table">
          <h5>📊 Controlled vs Uncontrolled Comparison</h5>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Controlled</th>
                <th>Uncontrolled</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data Source</td>
                <td>React state</td>
                <td>DOM</td>
              </tr>
              <tr>
                <td>Value Access</td>
                <td>Always available</td>
                <td>On-demand via ref</td>
              </tr>
              <tr>
                <td>Validation</td>
                <td>Real-time</td>
                <td>On submit/blur</td>
              </tr>
              <tr>
                <td>Default Value</td>
                <td><code>value</code></td>
                <td><code>defaultValue</code></td>
              </tr>
              <tr>
                <td>Reset/Clear</td>
                <td>Update state</td>
                <td>Access DOM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 💡 INTERVIEW TIPS SECTION */}
      <div className="example-section">
        <h3>💡 Interview Tips</h3>
        <div className="tips">
          <div className="tip">
            <h4>🔀 Conditional Rendering</h4>
            <ul>
              <li><strong>&&:</strong> Use for simple show/hide logic</li>
              <li><strong>Ternary:</strong> Use when choosing between two elements</li>
              <li><strong>If blocks:</strong> Use for complex conditional logic</li>
              <li><strong>Avoid:</strong> Inline ternaries with complex JSX</li>
            </ul>
          </div>
          
          <div className="tip">
            <h4>📝 Lists & Keys</h4>
            <ul>
              <li><strong>Always use keys</strong> when rendering lists</li>
              <li><strong>Keys must be unique</strong> among siblings</li>
              <li><strong>Prefer stable keys</strong> (ID) over index</li>
              <li><strong>Keys help React</strong> identify which items changed</li>
            </ul>
          </div>
          
          <div className="tip">
            <h4>⬆️ Lifting State Up</h4>
            <ul>
              <li><strong>Identify common ancestor</strong> of components that need data</li>
              <li><strong>Move state up</strong> to the closest common parent</li>
              <li><strong>Pass data down</strong> via props</li>
              <li><strong>Pass callbacks up</strong> to modify parent state</li>
            </ul>
          </div>
          
          <div className="tip">
            <h4>🎮 Input Control</h4>
            <ul>
              <li><strong>Prefer controlled inputs</strong> for better UX</li>
              <li><strong>Use uncontrolled</strong> only when necessary</li>
              <li><strong>File inputs</strong> are always uncontrolled</li>
              <li><strong>Validate in real-time</strong> with controlled inputs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReactPatternsExamples
