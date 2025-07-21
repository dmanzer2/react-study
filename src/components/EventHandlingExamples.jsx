import React, { useState, useRef } from 'react'

// 🎯 Basic Event Handling Component
const BasicEvents = () => {
  const [clickCount, setClickCount] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [keyPressed, setKeyPressed] = useState('')
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    setClickCount(prev => prev + 1)
  }

  const handleDoubleClick = () => {
    setClickCount(0)
    alert('Counter reset!')
  }

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    })
  }

  const handleKeyDown = (e) => {
    setKeyPressed(`${e.key} (${e.code})`)
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    alert('Right-click detected!')
  }

  return (
    <div className="basic-events">
      <h4>🎯 Basic Event Handling</h4>
      
      <div className="event-demo">
        <button 
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onContextMenu={handleContextMenu}
          className="event-button"
        >
          Click me! (Count: {clickCount})
        </button>
        <p><small>💡 Try: single click, double click, right click</small></p>
      </div>

      <div 
        className={`mouse-area ${isHovered ? 'hovered' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p>🖱️ Mouse Area</p>
        <p>Position: ({mousePosition.x}, {mousePosition.y})</p>
        <p>Hovered: {isHovered ? '✅' : '❌'}</p>
      </div>

      <input
        type="text"
        placeholder="Press any key..."
        onKeyDown={handleKeyDown}
        className="key-input"
      />
      {keyPressed && <p>🔑 Last key: {keyPressed}</p>}
    </div>
  )
}

// 📝 Form Handling Component
const FormHandling = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    country: '',
    skills: [],
    subscribe: false,
    experience: 'beginner',
    bio: ''
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Handle checkbox array (skills)
  const handleSkillChange = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  // Validation
  const validateForm = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.age) {
      newErrors.age = 'Age is required'
    } else if (formData.age < 13) {
      newErrors.age = 'Must be at least 13 years old'
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country'
    }

    return newErrors
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
      console.log('Form submitted:', formData)
      alert('Form submitted successfully! Check console for data.')
    }
  }

  // Reset form
  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      age: '',
      country: '',
      skills: [],
      subscribe: false,
      experience: 'beginner',
      bio: ''
    })
    setErrors({})
    setSubmitted(false)
  }

  const skillOptions = ['JavaScript', 'React', 'Vue', 'Angular', 'Node.js', 'Python', 'TypeScript']

  return (
    <div className="form-handling">
      <h4>📝 Form Handling & Validation</h4>
      
      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            min="13"
            max="120"
            className={errors.age ? 'error' : ''}
          />
          {errors.age && <span className="error-text">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country *</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className={errors.country ? 'error' : ''}
          >
            <option value="">Select a country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="jp">Japan</option>
            <option value="au">Australia</option>
          </select>
          {errors.country && <span className="error-text">{errors.country}</span>}
        </div>

        <div className="form-group">
          <label>Skills (select multiple)</label>
          <div className="checkbox-group">
            {skillOptions.map(skill => (
              <label key={skill} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleSkillChange(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Experience Level</label>
          <div className="radio-group">
            {['beginner', 'intermediate', 'advanced', 'expert'].map(level => (
              <label key={level} className="radio-label">
                <input
                  type="radio"
                  name="experience"
                  value={level}
                  checked={formData.experience === level}
                  onChange={handleInputChange}
                />
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows="4"
            placeholder="Tell us about yourself..."
          />
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleInputChange}
            />
            Subscribe to newsletter
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            📤 Submit
          </button>
          <button type="button" onClick={handleReset} className="btn-secondary">
            🔄 Reset
          </button>
        </div>
      </form>

      {submitted && (
        <div className="success-message">
          <h5>✅ Form Submitted Successfully!</h5>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

// 🎮 Advanced Event Handling
const AdvancedEvents = () => {
  const [dragData, setDragData] = useState({ isDragging: false, position: { x: 0, y: 0 } })
  const [fileInfo, setFileInfo] = useState(null)
  const fileInputRef = useRef(null)

  // Drag and Drop
  const handleDragStart = () => {
    setDragData(prev => ({ ...prev, isDragging: true }))
  }

  const handleDragEnd = () => {
    setDragData(prev => ({ ...prev, isDragging: false }))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      setFileInfo({
        name: files[0].name,
        size: files[0].size,
        type: files[0].type
      })
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  // File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileInfo({
        name: file.name,
        size: file.size,
        type: file.type
      })
    }
  }

  // Event delegation example
  const handleButtonClick = (e) => {
    if (e.target.tagName === 'BUTTON') {
      alert(`Clicked: ${e.target.textContent}`)
    }
  }

  // Prevent default and stop propagation
  const handleLinkClick = (e) => {
    e.preventDefault()
    alert('Link click intercepted!')
  }

  const handleStopPropagation = (e) => {
    e.stopPropagation()
    alert('Event stopped here!')
  }

  return (
    <div className="advanced-events">
      <h4>🎮 Advanced Event Handling</h4>

      <div className="event-example">
        <h5>📁 Drag & Drop File Upload</h5>
        <div
          className={`drop-zone ${dragData.isDragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragStart}
          onDragLeave={handleDragEnd}
        >
          <p>🎯 Drop files here or 
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="link-button"
            > click to upload</button>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        
        {fileInfo && (
          <div className="file-info">
            <h6>📄 File Information:</h6>
            <p>Name: {fileInfo.name}</p>
            <p>Size: {(fileInfo.size / 1024).toFixed(2)} KB</p>
            <p>Type: {fileInfo.type}</p>
          </div>
        )}
      </div>

      <div className="event-example">
        <h5>🎯 Event Delegation</h5>
        <div onClick={handleButtonClick} className="button-container">
          <p>Click any button below (using event delegation):</p>
          <button>Button 1</button>
          <button>Button 2</button>
          <button>Button 3</button>
          <button>Button 4</button>
        </div>
      </div>

      <div className="event-example">
        <h5>🛑 Prevent Default & Stop Propagation</h5>
        <div onClick={() => alert('Parent clicked!')} className="parent-container">
          <p>Parent container (click anywhere)</p>
          <a href="https://example.com" onClick={handleLinkClick}>
            🔗 Link (preventDefault)
          </a>
          <br />
          <button onClick={handleStopPropagation}>
            🛑 Stop Propagation
          </button>
        </div>
      </div>
    </div>
  )
}

// 🎨 Custom Event Hook
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

// 📱 Responsive Component
const ResponsiveComponent = () => {
  const { width, height } = useWindowSize()
  const [scrollY, setScrollY] = useState(0)

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="responsive-demo">
      <h4>📱 Window Events & Custom Hooks</h4>
      <div className="stats">
        <p>🖥️ Window: {width} × {height}</p>
        <p>📜 Scroll Y: {scrollY}px</p>
        <p>📱 Device: {width < 768 ? 'Mobile' : width < 1024 ? 'Tablet' : 'Desktop'}</p>
      </div>
    </div>
  )
}

// 🎪 Main Event Handling Component
const EventHandlingExamples = () => {
  return (
    <div className="examples-container">
      <div className="example-section">
        <h3>🎪 Event Handling Examples</h3>
        
        <div className="events-grid">
          <div className="event-section">
            <BasicEvents />
          </div>
          
          <div className="event-section">
            <ResponsiveComponent />
          </div>
        </div>
      </div>

      <div className="example-section">
        <FormHandling />
      </div>

      <div className="example-section">
        <AdvancedEvents />
      </div>

      <div className="example-section">
        <h3>📚 Event Handling Reference</h3>
        <div className="reference-grid">
          <div className="ref-section">
            <h4>🖱️ Mouse Events</h4>
            <ul>
              <li><code>onClick</code> - Single click</li>
              <li><code>onDoubleClick</code> - Double click</li>
              <li><code>onMouseDown/Up</code> - Mouse press/release</li>
              <li><code>onMouseEnter/Leave</code> - Mouse hover</li>
              <li><code>onMouseMove</code> - Mouse movement</li>
              <li><code>onContextMenu</code> - Right click</li>
            </ul>
          </div>

          <div className="ref-section">
            <h4>⌨️ Keyboard Events</h4>
            <ul>
              <li><code>onKeyDown</code> - Key pressed down</li>
              <li><code>onKeyUp</code> - Key released</li>
              <li><code>onKeyPress</code> - Key character (deprecated)</li>
              <li><code>e.key</code> - The key value</li>
              <li><code>e.code</code> - Physical key code</li>
              <li><code>e.ctrlKey/shiftKey</code> - Modifier keys</li>
            </ul>
          </div>

          <div className="ref-section">
            <h4>📝 Form Events</h4>
            <ul>
              <li><code>onChange</code> - Input value changes</li>
              <li><code>onSubmit</code> - Form submission</li>
              <li><code>onFocus/onBlur</code> - Element focus</li>
              <li><code>onInput</code> - Input event</li>
              <li><code>onSelect</code> - Text selection</li>
              <li><code>onReset</code> - Form reset</li>
            </ul>
          </div>

          <div className="ref-section">
            <h4>🎯 Event Object</h4>
            <ul>
              <li><code>e.target</code> - Element that triggered</li>
              <li><code>e.currentTarget</code> - Element with listener</li>
              <li><code>e.preventDefault()</code> - Prevent default</li>
              <li><code>e.stopPropagation()</code> - Stop bubbling</li>
              <li><code>e.type</code> - Event type</li>
              <li><code>e.timeStamp</code> - Event timestamp</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="example-section">
        <h3>💡 Interview Tips</h3>
        <div className="tips">
          <div className="tip">
            <h4>🎯 Event Handling Best Practices</h4>
            <ul>
              <li>Use arrow functions to preserve `this` context</li>
              <li>Prevent default behavior when needed</li>
              <li>Use event delegation for dynamic content</li>
              <li>Clean up event listeners in useEffect</li>
            </ul>
          </div>

          <div className="tip">
            <h4>📝 Form Validation</h4>
            <ul>
              <li>Controlled components for form inputs</li>
              <li>Real-time validation feedback</li>
              <li>Prevent submission with invalid data</li>
              <li>Accessible error messaging</li>
            </ul>
          </div>

          <div className="tip">
            <h4>⚡ Performance</h4>
            <ul>
              <li>Debounce expensive operations</li>
              <li>Use useCallback for event handlers</li>
              <li>Avoid inline function creation</li>
              <li>Clean up listeners to prevent leaks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventHandlingExamples
