import React from 'react'

const JSXExamples = () => {
  // Variables to demonstrate JSX expressions
  const name = 'React Developer'
  const isLoggedIn = true
  const numbers = [1, 2, 3, 4, 5]
  const user = { name: 'John Doe', age: 30 }

  // Function for JSX
  const formatName = (firstName, lastName) => {
    return `${firstName} ${lastName}`
  }

  return (
    <div className="examples-container">
      <div className="example-section">
        <h3>🔤 JSX Expressions</h3>
        <div className="code-example">
          <p>Hello, {name}!</p>
          <p>2 + 2 = {2 + 2}</p>
          <p>Current time: {new Date().toLocaleTimeString()}</p>
          <p>Function call: {formatName('Jane', 'Smith')}</p>
        </div>
      </div>

      <div className="example-section">
        <h3>🔀 Conditional Rendering</h3>
        <div className="code-example">
          <p>Status: {isLoggedIn ? 'Logged In ✅' : 'Logged Out ❌'}</p>
          
          {isLoggedIn && <p>Welcome back, user!</p>}
          
          {user.age >= 18 ? (
            <p>🔞 Adult user (age: {user.age})</p>
          ) : (
            <p>👶 Minor user (age: {user.age})</p>
          )}
        </div>
      </div>

      <div className="example-section">
        <h3>📋 Lists and Keys</h3>
        <div className="code-example">
          <ul>
            {numbers.map(number => (
              <li key={number}>Number: {number} (squared: {number * number})</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="example-section">
        <h3 htmlFor="nameInput">🏷️ JSX Attributes</h3>
        <div className="code-example">
          <input 
            id="nameInput"
            type="text" 
            placeholder="Enter your name..."
            className="demo-input"
            style={{ border: '2px solid #007bff', padding: '8px' }}
          />
          <img 
            src="https://via.placeholder.com/100x100?text=JSX" 
            alt="JSX Example"
            style={{ marginLeft: '10px', borderRadius: '8px' }}
          />
        </div>
      </div>

      <div className="example-section">
        <h3>⚠️ Common JSX Rules</h3>
        <div className="code-example">
          <div>
            <p>✅ JSX must return a single parent element</p>
            <p>✅ Use className instead of class</p>
            <p>✅ Use htmlFor instead of for (in labels)</p>
            <p>✅ Self-closing tags must end with /&gt;</p>
            <p>✅ JavaScript expressions go in curly braces {'{}'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JSXExamples
