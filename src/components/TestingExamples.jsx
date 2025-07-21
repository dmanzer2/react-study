import React from 'react'
import { Counter, UserForm, TodoList, UserProfile } from './TestableComponents'

// 🧪 Testing Examples Component
const TestingExamples = () => {
  const handleUserSubmit = async (userData) => {
    console.log('User submitted:', userData)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('User created successfully!')
  }

  return (
    <div className="examples-container">
      
      {/* Testing Introduction */}
      <div className="example-section">
        <h3>🧪 React Testing with Jest + React Testing Library</h3>
        <div className="code-example">
          <p>
            React Testing Library focuses on testing components the way users interact with them.
            It encourages testing behavior rather than implementation details.
          </p>
          
          <div className="testing-principles">
            <h4>🎯 Core Testing Principles:</h4>
            <ul>
              <li><strong>Test behavior, not implementation</strong> - Focus on what users see and do</li>
              <li><strong>Find elements by accessibility</strong> - Use roles, labels, and text</li>
              <li><strong>Avoid testing internal state</strong> - Test outputs and side effects</li>
              <li><strong>Write tests that give confidence</strong> - Test realistic user scenarios</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rendering Examples */}
      <div className="example-section">
        <h3>🎨 Rendering Components</h3>
        <div className="code-example">
          <p>
            The foundation of testing is rendering components and making assertions about what's displayed.
          </p>
          
          <div className="component-demo">
            <Counter initialCount={5} step={2} />
          </div>

          <div className="test-code">
            <h5>📝 Example Test Code:</h5>
            <pre><code>{`import { render, screen } from '@testing-library/react'
import { Counter } from './Counter'

describe('Counter Component', () => {
  test('renders with initial count', () => {
    render(<Counter initialCount={5} />)
    
    // Assert that the component renders correctly
    expect(screen.getByText('Counter Component')).toBeInTheDocument()
    expect(screen.getByText('Count: 5')).toBeInTheDocument()
  })

  test('renders with default props', () => {
    render(<Counter />)
    
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })
})`}</code></pre>
          </div>

          <div className="rendering-methods">
            <h5>🎛️ Rendering Methods:</h5>
            <ul>
              <li><code>render()</code> - Renders component into virtual DOM</li>
              <li><code>screen</code> - Global object to query rendered elements</li>
              <li><code>container</code> - Direct access to DOM container</li>
              <li><code>rerender()</code> - Re-render with new props</li>
              <li><code>unmount()</code> - Unmount component</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Querying Examples */}
      <div className="example-section">
        <h3>🔍 Querying Elements</h3>
        <div className="code-example">
          <p>
            React Testing Library provides various methods to find elements in the DOM.
            Use the right query method based on what you're testing.
          </p>
          
          <div className="component-demo">
            <UserForm onSubmit={handleUserSubmit} />
          </div>

          <div className="test-code">
            <h5>📝 Example Query Tests:</h5>
            <pre><code>{`import { render, screen } from '@testing-library/react'
import { UserForm } from './UserForm'

describe('UserForm Queries', () => {
  test('finding elements by different methods', () => {
    const mockSubmit = jest.fn()
    render(<UserForm onSubmit={mockSubmit} />)
    
    // By Role (Preferred - most accessible)
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    
    // By Label Text
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    
    // By Text Content
    expect(screen.getByText('User Form')).toBeInTheDocument()
    
    // By Test ID (last resort)
    expect(screen.getByTestId('user-form')).toBeInTheDocument()
    
    // By Placeholder
    // expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  test('query variants - get, query, find', () => {
    render(<UserForm onSubmit={jest.fn()} />)
    
    // getBy* - Throws error if not found (use for elements that should exist)
    expect(screen.getByText('User Form')).toBeInTheDocument()
    
    // queryBy* - Returns null if not found (use for elements that might not exist)
    expect(screen.queryByText('Nonexistent Text')).not.toBeInTheDocument()
    
    // findBy* - Async, waits for element (use for elements that appear later)
    // await expect(screen.findByText('Success Message')).resolves.toBeInTheDocument()
  })
})`}</code></pre>
          </div>

          <div className="query-methods">
            <h5>🎯 Query Priority (Recommended Order):</h5>
            <ol>
              <li><strong>getByRole</strong> - Most accessible, finds by ARIA role</li>
              <li><strong>getByLabelText</strong> - Good for form inputs</li>
              <li><strong>getByText</strong> - For text content</li>
              <li><strong>getByDisplayValue</strong> - For form inputs with values</li>
              <li><strong>getByAltText</strong> - For images</li>
              <li><strong>getByTitle</strong> - For title attributes</li>
              <li><strong>getByTestId</strong> - Last resort, custom test IDs</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Event Simulation */}
      <div className="example-section">
        <h3>🎪 Simulating User Events</h3>
        <div className="code-example">
          <p>
            Testing user interactions is crucial. React Testing Library provides 
            both fireEvent and userEvent for simulating user actions.
          </p>
          
          <div className="component-demo">
            <TodoList />
          </div>

          <div className="test-code">
            <h5>📝 Event Simulation Examples:</h5>
            <pre><code>{`import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TodoList } from './TodoList'

describe('TodoList Events', () => {
  test('adding a todo with fireEvent', () => {
    render(<TodoList />)
    
    const input = screen.getByTestId('todo-input')
    const addButton = screen.getByTestId('add-todo-btn')
    
    // Using fireEvent (synchronous)
    fireEvent.change(input, { target: { value: 'New Todo' } })
    fireEvent.click(addButton)
    
    expect(screen.getByText('New Todo')).toBeInTheDocument()
    expect(screen.getByText('Total: 1')).toBeInTheDocument()
  })

  test('adding a todo with userEvent (preferred)', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    const input = screen.getByTestId('todo-input')
    const addButton = screen.getByTestId('add-todo-btn')
    
    // Using userEvent (asynchronous, more realistic)
    await user.type(input, 'Another Todo')
    await user.click(addButton)
    
    expect(screen.getByText('Another Todo')).toBeInTheDocument()
  })

  test('toggling todo completion', async () => {
    const user = userEvent.setup()
    render(<TodoList />)
    
    // Add a todo first
    const input = screen.getByTestId('todo-input')
    await user.type(input, 'Test Todo')
    await user.click(screen.getByTestId('add-todo-btn'))
    
    // Find and click the checkbox
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    
    expect(checkbox).toBeChecked()
    expect(screen.getByText('Completed: 1')).toBeInTheDocument()
  })
})`}</code></pre>
          </div>

          <div className="event-methods">
            <h5>🎮 Event Methods Comparison:</h5>
            <div className="event-comparison">
              <div className="event-method">
                <h6>🔥 fireEvent</h6>
                <ul>
                  <li>Synchronous</li>
                  <li>Dispatches DOM events directly</li>
                  <li>Faster execution</li>
                  <li>Less realistic user interaction</li>
                </ul>
                <code>fireEvent.click(button)</code>
              </div>
              <div className="event-method">
                <h6>👤 userEvent (Preferred)</h6>
                <ul>
                  <li>Asynchronous</li>
                  <li>Simulates real user behavior</li>
                  <li>More comprehensive event sequence</li>
                  <li>Better for integration testing</li>
                </ul>
                <code>await user.click(button)</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Async Testing */}
      <div className="example-section">
        <h3>⏱️ Testing Async Behavior</h3>
        <div className="code-example">
          <p>
            Many React components have async behavior like API calls, timeouts, or loading states.
            Use async utilities to test these scenarios properly.
          </p>
          
          <div className="component-demo">
            <UserProfile userId="123" />
          </div>

          <div className="test-code">
            <h5>📝 Async Testing Examples:</h5>
            <pre><code>{`import { render, screen, waitFor } from '@testing-library/react'
import { UserProfile } from './UserProfile'

describe('UserProfile Async', () => {
  test('shows loading state then user data', async () => {
    render(<UserProfile userId="123" />)
    
    // Initially shows loading
    expect(screen.getByTestId('loading')).toBeInTheDocument()
    
    // Wait for loading to disappear and user data to appear
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
    
    expect(screen.getByTestId('user-profile')).toBeInTheDocument()
    expect(screen.getByText('Name: User 123')).toBeInTheDocument()
  })

  test('handles error state', async () => {
    render(<UserProfile userId="invalid" />)
    
    // Wait for error to appear
    await screen.findByTestId('error')
    
    expect(screen.getByText(/User not found/)).toBeInTheDocument()
    expect(screen.getByTestId('retry-btn')).toBeInTheDocument()
  })

  test('findBy queries for async elements', async () => {
    render(<UserProfile userId="456" />)
    
    // findBy automatically waits for element to appear
    const userProfile = await screen.findByTestId('user-profile')
    expect(userProfile).toBeInTheDocument()
    
    const userName = await screen.findByText('Name: User 456')
    expect(userName).toBeInTheDocument()
  })
})`}</code></pre>
          </div>

          <div className="async-utilities">
            <h5>⏰ Async Testing Utilities:</h5>
            <ul>
              <li><code>waitFor()</code> - Wait for assertion to pass</li>
              <li><code>findBy*()</code> - Async queries that wait for elements</li>
              <li><code>waitForElementToBeRemoved()</code> - Wait for element to disappear</li>
              <li><code>act()</code> - Wrap state updates (usually automatic)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Testing Best Practices */}
      <div className="example-section">
        <h3>💡 Testing Best Practices & Interview Tips</h3>
        <div className="tips">
          <div className="tip">
            <h4>🎯 What to Test</h4>
            <ul>
              <li><strong>Rendering:</strong> Component renders without crashing</li>
              <li><strong>User Interactions:</strong> Clicks, typing, form submissions</li>
              <li><strong>State Changes:</strong> UI updates when state changes</li>
              <li><strong>Props:</strong> Component behaves correctly with different props</li>
              <li><strong>Error States:</strong> Component handles errors gracefully</li>
            </ul>
          </div>

          <div className="tip">
            <h4>🚫 What Not to Test</h4>
            <ul>
              <li>Implementation details (internal state, methods)</li>
              <li>Third-party library functionality</li>
              <li>CSS styles (unless crucial for functionality)</li>
              <li>Trivial code (getters, setters)</li>
            </ul>
          </div>

          <div className="tip">
            <h4>🛠️ Testing Setup</h4>
            <ul>
              <li><strong>Jest:</strong> Test runner and assertion library</li>
              <li><strong>React Testing Library:</strong> DOM testing utilities</li>
              <li><strong>@testing-library/user-event:</strong> User interaction simulation</li>
              <li><strong>@testing-library/jest-dom:</strong> Custom DOM matchers</li>
            </ul>
          </div>

          <div className="tip">
            <h4>📋 Common Interview Questions</h4>
            <ul>
              <li>"How do you test a React component?"</li>
              <li>"What's the difference between fireEvent and userEvent?"</li>
              <li>"How do you test async behavior?"</li>
              <li>"How do you mock API calls in tests?"</li>
              <li>"What testing principles do you follow?"</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Test Structure Example */}
      <div className="example-section">
        <h3>📋 Complete Test File Example</h3>
        <div className="code-example">
          <pre><code>{`// Counter.test.jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Counter } from './Counter'

describe('Counter Component', () => {
  // Test rendering
  test('renders with initial count', () => {
    render(<Counter initialCount={10} />)
    expect(screen.getByText('Count: 10')).toBeInTheDocument()
  })

  // Test user interactions
  test('increments count when increment button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    
    const incrementBtn = screen.getByRole('button', { name: /increment/i })
    await user.click(incrementBtn)
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })

  // Test props
  test('uses custom step value', async () => {
    const user = userEvent.setup()
    render(<Counter step={5} />)
    
    await user.click(screen.getByTestId('increment-btn'))
    expect(screen.getByText('Count: 5')).toBeInTheDocument()
  })

  // Test multiple interactions
  test('handles multiple operations correctly', async () => {
    const user = userEvent.setup()
    render(<Counter initialCount={0} step={2} />)
    
    // Increment twice
    const incrementBtn = screen.getByTestId('increment-btn')
    await user.click(incrementBtn)
    await user.click(incrementBtn)
    expect(screen.getByText('Count: 4')).toBeInTheDocument()
    
    // Decrement once
    await user.click(screen.getByTestId('decrement-btn'))
    expect(screen.getByText('Count: 2')).toBeInTheDocument()
    
    // Reset
    await user.click(screen.getByTestId('reset-btn'))
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })
})`}</code></pre>
        </div>
      </div>
    </div>
  )
}

export default TestingExamples
