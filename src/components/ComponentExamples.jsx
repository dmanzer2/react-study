import React, { useState, Component } from 'react'

// 🔥 Modern Function Component (Preferred)
const FunctionComponent = ({ title, initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount)
  const [message, setMessage] = useState('')

  const handleIncrement = () => {
    setCount(prev => prev + 1)
    setMessage(`Count updated to ${count + 1}!`)
  }

  return (
    <div className="component-demo">
      <h4>🚀 Function Component</h4>
      <p>Title: {title}</p>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      {message && <p className="message">✨ {message}</p>}
    </div>
  )
}

// 📜 Legacy Class Component (For comparison)
class ClassComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: props.initialCount || 0,
      message: ''
    }
  }

  handleIncrement = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
      message: `Count updated to ${prevState.count + 1}!`
    }))
  }

  render() {
    const { title } = this.props
    const { count, message } = this.state

    return (
      <div className="component-demo">
        <h4>🏛️ Class Component</h4>
        <p>Title: {title}</p>
        <p>Count: {count}</p>
        <button onClick={this.handleIncrement}>Increment</button>
        {message && <p className="message">✨ {message}</p>}
      </div>
    )
  }
}

// 🔄 Component Composition Example
const Button = ({ children, variant = 'primary', onClick, disabled }) => {
  const buttonClass = `btn btn-${variant} ${disabled ? 'disabled' : ''}`
  
  return (
    <button 
      className={buttonClass} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

const Card = ({ title, children, footer }) => {
  return (
    <div className="card">
      {title && <div className="card-header"><h4>{title}</h4></div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

// 🎯 Higher-Order Component (HOC) Example
const withLoading = (WrappedComponent) => {
  const WithLoadingComponent = ({ isLoading, ...props }) => {
    if (isLoading) {
      return <div className="loading">🔄 Loading...</div>
    }
    return <WrappedComponent {...props} />
  }
  
  // Set display name for debugging
  WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`
  
  return WithLoadingComponent
}

const UserProfile = ({ user }) => (
  <div className="user-profile">
    <h5>👤 {user.name}</h5>
    <p>📧 {user.email}</p>
    <p>🎂 Age: {user.age}</p>
  </div>
)

const UserProfileWithLoading = withLoading(UserProfile)

const ComponentExamples = () => {
  const [isLoading, setIsLoading] = useState(false)

  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 28
  }

  const simulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="examples-container">
      <div className="example-section">
        <h3>⚡ Function vs Class Components</h3>
        <div className="code-example">
          <div className="component-comparison">
            <FunctionComponent title="Modern React" initialCount={5} />
            <ClassComponent title="Legacy React" initialCount={10} />
          </div>
          
          <div className="comparison-notes">
            <h4>🔍 Key Differences:</h4>
            <ul>
              <li>✅ <strong>Function Components:</strong> Simpler syntax, use hooks for state</li>
              <li>📜 <strong>Class Components:</strong> More verbose, use this.state and lifecycle methods</li>
              <li>🎯 <strong>Modern React:</strong> Function components are preferred</li>
              <li>🚀 <strong>Performance:</strong> Function components are generally faster</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h3>🧩 Component Composition</h3>
        <div className="code-example">
          <Card 
            title="Reusable Card Component"
            footer={
              <div>
                <Button variant="primary" onClick={() => alert('Primary clicked!')}>
                  Primary Action
                </Button>
                <Button variant="secondary" onClick={() => alert('Secondary clicked!')}>
                  Secondary
                </Button>
              </div>
            }
          >
            <p>This card demonstrates component composition:</p>
            <ul>
              <li>🎨 Reusable Button component with variants</li>
              <li>📦 Card component that accepts children and footer</li>
              <li>🔧 Props for customization</li>
            </ul>
          </Card>
        </div>
      </div>

      <div className="example-section">
        <h3>🔄 Higher-Order Component (HOC)</h3>
        <div className="code-example">
          <Button onClick={simulateLoading}>Simulate Loading</Button>
          <UserProfileWithLoading user={mockUser} isLoading={isLoading} />
          
          <div className="notes">
            <p><strong>HOC Pattern:</strong> Wrap components to add extra functionality (like loading states)</p>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h3>📝 Interview Tips</h3>
        <div className="code-example tips">
          <div className="tip">
            <h4>🎯 Function Components</h4>
            <ul>
              <li>Introduced hooks in React 16.8</li>
              <li>Simpler to test and reason about</li>
              <li>No need to bind methods or use 'this'</li>
              <li>Can use all React features with hooks</li>
            </ul>
          </div>
          
          <div className="tip">
            <h4>🏛️ Class Components</h4>
            <ul>
              <li>Legacy pattern (still supported)</li>
              <li>Use lifecycle methods (componentDidMount, etc.)</li>
              <li>State with this.setState()</li>
              <li>Requires binding methods or arrow functions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentExamples
