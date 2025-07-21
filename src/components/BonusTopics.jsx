import React, { useState, useMemo, useCallback, memo } from 'react'

// 🚀 Bonus Topics Component
const BonusTopics = () => {
  const [currentTab, setCurrentTab] = useState('routing')
  const [count, setCount] = useState(0)
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3'])
  const [expensiveValue, setExpensiveValue] = useState(1)

  // Performance examples
  const expensiveCalculation = useMemo(() => {
    console.log('🔢 Expensive calculation running...')
    let result = 0
    for (let i = 0; i < expensiveValue * 1000000; i++) {
      result += i
    }
    return result
  }, [expensiveValue])

  const handleAddItem = useCallback(() => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`])
  }, [])

  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  return (
    <div className="examples-container">
      
      {/* Introduction */}
      <div className="example-section">
        <h3>🚀 Bonus Topics for React Interviews</h3>
        <div className="code-example">
          <p>
            Additional React concepts that commonly come up in senior developer interviews.
            These topics show deeper React knowledge and real-world application experience.
          </p>
          
          <div className="bonus-principles">
            <h4>🎯 Advanced Interview Topics:</h4>
            <ul>
              <li><strong>React Router:</strong> Client-side routing and navigation</li>
              <li><strong>Performance:</strong> Optimization with memoization techniques</li>
              <li><strong>Next.js:</strong> Full-stack React framework concepts</li>
              <li><strong>SSR/SSG:</strong> Server-side rendering and static generation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="example-section">
        <div className="tab-navigation">
          <button 
            className={`tab-button ${currentTab === 'routing' ? 'active' : ''}`}
            onClick={() => setCurrentTab('routing')}
          >
            🛣️ React Router
          </button>
          <button 
            className={`tab-button ${currentTab === 'performance' ? 'active' : ''}`}
            onClick={() => setCurrentTab('performance')}
          >
            ⚡ Performance
          </button>
          <button 
            className={`tab-button ${currentTab === 'nextjs' ? 'active' : ''}`}
            onClick={() => setCurrentTab('nextjs')}
          >
            🔺 Next.js
          </button>
        </div>
      </div>

      {/* React Router Section */}
      {currentTab === 'routing' && (
        <div className="example-section">
          <h3>🛣️ React Router Basics</h3>
          <div className="code-example">
            <p>
              React Router enables client-side routing in React applications. It's essential
              for creating single-page applications with multiple views.
            </p>
            
            <div className="router-demo">
              <h4>📝 Basic Router Setup:</h4>
              <pre><code>{`// App.jsx - Main router setup
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/old-products" element={<Navigate to="/products" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}`}</code></pre>
            </div>

            <div className="router-concepts">
              <h4>🔑 Key Router Concepts:</h4>
              
              <div className="concept-grid">
                <div className="concept">
                  <h5>🏠 BrowserRouter</h5>
                  <ul>
                    <li>Uses HTML5 history API</li>
                    <li>Clean URLs without # symbol</li>
                    <li>Requires server configuration</li>
                    <li>Wraps entire application</li>
                  </ul>
                  <code>{'<BrowserRouter><App /></BrowserRouter>'}</code>
                </div>

                <div className="concept">
                  <h5>🗺️ Routes & Route</h5>
                  <ul>
                    <li>Defines URL-to-component mapping</li>
                    <li>Supports dynamic parameters</li>
                    <li>Nested routing capability</li>
                    <li>Conditional rendering based on URL</li>
                  </ul>
                  <code>{'<Route path="/users/:id" element={<User />} />'}</code>
                </div>

                <div className="concept">
                  <h5>🔗 Link & NavLink</h5>
                  <ul>
                    <li>Client-side navigation</li>
                    <li>Prevents page refresh</li>
                    <li>NavLink adds active styling</li>
                    <li>Better than anchor tags</li>
                  </ul>
                  <code>{'<Link to="/about">About Us</Link>'}</code>
                </div>

                <div className="concept">
                  <h5>🎣 useParams & useNavigate</h5>
                  <ul>
                    <li>Access URL parameters</li>
                    <li>Programmatic navigation</li>
                    <li>Query string handling</li>
                    <li>Location state management</li>
                  </ul>
                  <code>{'const { id } = useParams()'}</code>
                </div>
              </div>
            </div>

            <div className="router-examples">
              <h4>💡 Common Router Patterns:</h4>
              <pre><code>{`// useParams for dynamic routes
function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  
  useEffect(() => {
    fetchProduct(id).then(setProduct)
  }, [id])
  
  return <div>Product {id}: {product?.name}</div>
}

// useNavigate for programmatic navigation
function LoginForm() {
  const navigate = useNavigate()
  
  const handleSubmit = (userData) => {
    login(userData).then(() => {
      navigate('/dashboard') // Redirect after login
    })
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}

// Protected routes pattern
function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

// Nested routing
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>`}</code></pre>
            </div>
          </div>
        </div>
      )}

      {/* Performance Section */}
      {currentTab === 'performance' && (
        <div className="example-section">
          <h3>⚡ Performance Optimization</h3>
          <div className="code-example">
            <p>
              React performance optimization using memoization techniques to prevent
              unnecessary re-renders and expensive calculations.
            </p>
            
            <div className="component-demo">
              <PerformanceDemo 
                count={count}
                items={items}
                onIncrement={handleIncrement}
                onAddItem={handleAddItem}
                expensiveValue={expensiveValue}
                calculatedValue={expensiveCalculation}
              />
            </div>

            <div className="performance-techniques">
              <h4>🎯 Memoization Techniques:</h4>
              
              <div className="technique-grid">
                <div className="technique">
                  <h5>⚛️ React.memo</h5>
                  <p>Prevents component re-renders when props haven't changed</p>
                  <pre><code>{`// Memoized component
const ExpensiveComponent = memo(({ data, callback }) => {
  console.log('ExpensiveComponent rendered')
  return (
    <div>
      <h3>Expensive Component</h3>
      <p>Data: {data}</p>
      <button onClick={callback}>Click</button>
    </div>
  )
})

// Custom comparison function
const MyComponent = memo(({ user, posts }) => {
  return <div>...</div>
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  return prevProps.user.id === nextProps.user.id &&
         prevProps.posts.length === nextProps.posts.length
})`}</code></pre>
                </div>

                <div className="technique">
                  <h5>🧠 useMemo</h5>
                  <p>Memoizes expensive calculations between re-renders</p>
                  <pre><code>{`// Expensive calculation
const expensiveValue = useMemo(() => {
  console.log('Computing expensive value...')
  return data.reduce((sum, item) => sum + item.value, 0)
}, [data]) // Only recalculate when data changes

// Filtering large arrays
const filteredItems = useMemo(() => {
  return items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
}, [items, searchTerm])

// Object creation
const userConfig = useMemo(() => ({
  name: user.name,
  preferences: user.preferences,
  theme: selectedTheme
}), [user.name, user.preferences, selectedTheme])`}</code></pre>
                </div>

                <div className="technique">
                  <h5>📞 useCallback</h5>
                  <p>Memoizes function references to prevent child re-renders</p>
                  <pre><code>{`// Memoized event handler
const handleAddItem = useCallback(() => {
  setItems(prev => [...prev, { id: Date.now(), name: 'New Item' }])
}, []) // No dependencies, function never changes

// With dependencies
const handleFilter = useCallback((searchTerm) => {
  setFilteredData(data.filter(item => 
    item.name.includes(searchTerm)
  ))
}, [data]) // Recreate when data changes

// API calls
const fetchUserData = useCallback(async (userId) => {
  const response = await api.getUser(userId)
  setUser(response.data)
}, []) // Stable reference for useEffect`}</code></pre>
                </div>

                <div className="technique">
                  <h5>🎭 Performance Patterns</h5>
                  <p>Common optimization patterns and best practices</p>
                  <pre><code>{`// List optimization with keys
{items.map(item => (
  <ExpensiveListItem 
    key={item.id} // Stable, unique key
    item={item}
    onUpdate={handleUpdate}
  />
))}

// Lazy loading components
const LazyComponent = lazy(() => import('./LazyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  )
}

// Virtual scrolling for large lists
import { FixedSizeList as List } from 'react-window'

const ItemRenderer = ({ index, style }) => (
  <div style={style}>Item {index}</div>
)

<List height={600} itemCount={1000} itemSize={35}>
  {ItemRenderer}
</List>`}</code></pre>
                </div>
              </div>
            </div>

            <div className="performance-demo-controls">
              <h4>🎮 Performance Demo Controls:</h4>
              <div className="controls">
                <button onClick={() => setExpensiveValue(prev => prev + 1)}>
                  Increase Expensive Calculation ({expensiveValue})
                </button>
                <p>Calculated Value: {expensiveCalculation.toLocaleString()}</p>
                <p>Check console to see when expensive calculation runs!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next.js Section */}
      {currentTab === 'nextjs' && (
        <div className="example-section">
          <h3>🔺 Next.js Fundamentals</h3>
          <div className="code-example">
            <p>
              Next.js is a full-stack React framework that provides additional features
              like server-side rendering, static generation, and API routes.
            </p>
            
            <div className="nextjs-features">
              <h4>🚀 Key Next.js Features:</h4>
              
              <div className="feature-showcase">
                <div className="nextjs-feature">
                  <h5>📄 getServerSideProps (SSR)</h5>
                  <p>Runs on every request on the server</p>
                  <pre><code>{`// pages/posts/[id].js
export async function getServerSideProps(context) {
  const { id } = context.params
  const { req, res } = context
  
  // This runs on every request
  const post = await fetch(\`https://api.example.com/posts/\${id}\`)
    .then(res => res.json())
  
  // Check authentication
  if (!post) {
    return {
      notFound: true // Returns 404 page
    }
  }
  
  return {
    props: {
      post, // Passed to page component as props
      timestamp: new Date().toISOString()
    }
  }
}

function PostPage({ post, timestamp }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>Rendered at: {timestamp}</small>
    </div>
  )
}

export default PostPage`}</code></pre>
                </div>

                <div className="nextjs-feature">
                  <h5>⚡ getStaticProps (SSG)</h5>
                  <p>Runs at build time for static generation</p>
                  <pre><code>{`// pages/blog.js
export async function getStaticProps() {
  // This runs at build time
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json())
  
  return {
    props: {
      posts
    },
    revalidate: 60 // Regenerate page every 60 seconds (ISR)
  }
}

function BlogPage({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}

export default BlogPage`}</code></pre>
                </div>

                <div className="nextjs-feature">
                  <h5>🗂️ getStaticPaths</h5>
                  <p>Defines which dynamic routes to pre-render</p>
                  <pre><code>{`// pages/posts/[slug].js
export async function getStaticPaths() {
  // Get list of posts to pre-render
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json())
  
  const paths = posts.map(post => ({
    params: { slug: post.slug }
  }))
  
  return {
    paths, // Pre-render these paths at build time
    fallback: 'blocking' // Enable ISR for other paths
  }
}

export async function getStaticProps({ params }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`)
    .then(res => res.json())
  
  return {
    props: { post },
    revalidate: 3600 // Revalidate every hour
  }
}

function PostPage({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}`}</code></pre>
                </div>

                <div className="nextjs-feature">
                  <h5>🔌 API Routes</h5>
                  <p>Build full-stack applications with backend API</p>
                  <pre><code>{`// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ]
    res.status(200).json(users)
  } else if (req.method === 'POST') {
    // Handle POST request
    const { name, email } = req.body
    
    // Save user to database
    const user = { id: Date.now(), name, email }
    
    res.status(201).json(user)
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(\`Method \${req.method} Not Allowed\`)
  }
}

// pages/api/users/[id].js - Dynamic API route
export default function userHandler(req, res) {
  const { id } = req.query
  
  if (req.method === 'GET') {
    // Get specific user
    const user = getUserById(id)
    res.status(200).json(user)
  } else if (req.method === 'DELETE') {
    // Delete user
    deleteUser(id)
    res.status(204).end()
  }
}`}</code></pre>
                </div>
              </div>
            </div>

            <div className="nextjs-comparison">
              <h4>📊 Rendering Methods Comparison:</h4>
              <div className="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>Method</th>
                      <th>When it Runs</th>
                      <th>Use Case</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>getServerSideProps</strong></td>
                      <td>Every request</td>
                      <td>Dynamic data, user-specific content</td>
                      <td>Slower but always fresh</td>
                    </tr>
                    <tr>
                      <td><strong>getStaticProps</strong></td>
                      <td>Build time</td>
                      <td>Static content, blogs, marketing pages</td>
                      <td>Fastest, CDN cacheable</td>
                    </tr>
                    <tr>
                      <td><strong>Client-side</strong></td>
                      <td>In browser</td>
                      <td>Interactive features, user actions</td>
                      <td>Fast after initial load</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interview Tips */}
      <div className="example-section">
        <h3>💡 Bonus Topics Interview Tips</h3>
        <div className="tips">
          <div className="tip">
            <h4>🛣️ React Router Questions</h4>
            <ul>
              <li>"How do you handle protected routes?"</li>
              <li>"What's the difference between Link and anchor tags?"</li>
              <li>"How do you pass data between routes?"</li>
              <li>"How do you handle 404 pages?"</li>
              <li>"Explain programmatic navigation"</li>
            </ul>
          </div>

          <div className="tip">
            <h4>⚡ Performance Questions</h4>
            <ul>
              <li>"When would you use React.memo vs useMemo?"</li>
              <li>"How do you identify performance bottlenecks?"</li>
              <li>"What causes unnecessary re-renders?"</li>
              <li>"Explain the difference between useCallback and useMemo"</li>
              <li>"How do you optimize large lists?"</li>
            </ul>
          </div>

          <div className="tip">
            <h4>🔺 Next.js Questions</h4>
            <ul>
              <li>"When would you use SSR vs SSG?"</li>
              <li>"What is Incremental Static Regeneration?"</li>
              <li>"How do Next.js API routes work?"</li>
              <li>"Explain the Next.js file-based routing"</li>
              <li>"What are the benefits of Next.js over Create React App?"</li>
            </ul>
          </div>

          <div className="tip">
            <h4>🎯 Key Talking Points</h4>
            <ul>
              <li><strong>Trade-offs:</strong> Discuss performance vs complexity</li>
              <li><strong>Real Experience:</strong> Share specific use cases</li>
              <li><strong>Best Practices:</strong> Show knowledge of patterns</li>
              <li><strong>Debugging:</strong> How you identify and fix issues</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Memoized Performance Demo Component
const PerformanceDemo = memo(({ count, items, onIncrement, onAddItem, expensiveValue, calculatedValue }) => {
  console.log('🎨 PerformanceDemo component rendered')
  
  return (
    <div className="performance-demo">
      <h4>⚡ Performance Demo</h4>
      <div className="demo-grid">
        <div className="demo-section">
          <h5>Counter (React.memo)</h5>
          <p>Count: {count}</p>
          <button onClick={onIncrement}>Increment</button>
          <small>This component only re-renders when count changes</small>
        </div>
        
        <div className="demo-section">
          <h5>Items List (useCallback)</h5>
          <p>Items: {items.length}</p>
          <button onClick={onAddItem}>Add Item</button>
          <small>onAddItem function is memoized with useCallback</small>
        </div>
        
        <div className="demo-section">
          <h5>Expensive Calculation (useMemo)</h5>
          <p>Input: {expensiveValue}</p>
          <p>Result: {calculatedValue.toLocaleString()}</p>
          <small>Calculation only runs when input changes</small>
        </div>
      </div>
    </div>
  )
})

PerformanceDemo.displayName = 'PerformanceDemo'

export default BonusTopics
