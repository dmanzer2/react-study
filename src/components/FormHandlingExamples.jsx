import React, { useState, useRef } from 'react'

// 📄 Comprehensive Form Handling Examples
const FormHandlingExamples = () => {
  
  // 🎯 Simple Controlled Input Example
  const SimpleControlledForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
      e.preventDefault()
      setSubmitted(true)
      console.log('Simple form submitted:', { email, password })
    }

    return (
      <div className="form-demo">
        <h4>🎯 Basic Controlled Inputs</h4>
        <form onSubmit={handleSubmit} className="simple-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email} // ✅ Controlled by React state
              onChange={(e) => setEmail(e.target.value)} // ✅ Updates state on change
              placeholder="Enter your email"
            />
            <p className="live-value">Current value: "{email}"</p>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <p className="live-value">Length: {password.length} characters</p>
          </div>

          <button type="submit" className="btn-primary">
            Submit Simple Form
          </button>
        </form>

        {submitted && (
          <div className="success-message">
            ✅ Form submitted! Check console for values.
          </div>
        )}
      </div>
    )
  }

  // 🔍 Advanced Form with Comprehensive Validation
  const ValidatedForm = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      website: '',
      terms: false
    })

    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitResult, setSubmitResult] = useState(null)

    // Real-time validation function
    const validateField = (name, value) => {
      switch (name) {
        case 'firstName': {
          if (!value.trim()) return 'First name is required'
          if (value.length < 2) return 'First name must be at least 2 characters'
          if (!/^[a-zA-Z\s]+$/.test(value)) return 'First name can only contain letters'
          return ''
        }

        case 'lastName': {
          if (!value.trim()) return 'Last name is required'
          if (value.length < 2) return 'Last name must be at least 2 characters'
          if (!/^[a-zA-Z\s]+$/.test(value)) return 'Last name can only contain letters'
          return ''
        }

        case 'email': {
          if (!value.trim()) return 'Email is required'
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(value)) return 'Please enter a valid email address'
          return ''
        }

        case 'phone': {
          if (!value.trim()) return 'Phone number is required'
          const phoneRegex = /^\+?[\d\s\-()]{10,}$/
          if (!phoneRegex.test(value)) return 'Please enter a valid phone number'
          return ''
        }

        case 'age': {
          if (!value) return 'Age is required'
          const ageNum = parseInt(value)
          if (isNaN(ageNum)) return 'Age must be a number'
          if (ageNum < 13) return 'Must be at least 13 years old'
          if (ageNum > 120) return 'Please enter a valid age'
          return ''
        }

        case 'website': {
          if (value && !/^https?:\/\/.+/.test(value)) {
            return 'Website must start with http:// or https://'
          }
          return ''
        }

        case 'terms': {
          if (!value) return 'You must accept the terms and conditions'
          return ''
        }

        default:
          return ''
      }
    }

    // Handle input changes with real-time validation
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target
      const inputValue = type === 'checkbox' ? checked : value
      
      // Update form data
      setFormData(prev => ({
        ...prev,
        [name]: inputValue
      }))

      // Real-time validation for touched fields
      if (touched[name]) {
        const error = validateField(name, inputValue)
        setErrors(prev => ({
          ...prev,
          [name]: error
        }))
      }
    }

    // Handle field blur (mark as touched and validate)
    const handleBlur = (e) => {
      const { name, value } = e.target
      setTouched(prev => ({ ...prev, [name]: true }))
      
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }

    // Comprehensive form validation
    const validateForm = () => {
      const newErrors = {}
      Object.keys(formData).forEach(field => {
        const error = validateField(field, formData[field])
        if (error) newErrors[field] = error
      })
      return newErrors
    }

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault()
      setIsSubmitting(true)

      // Mark all fields as touched
      const allTouched = Object.keys(formData).reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {})
      setTouched(allTouched)

      // Validate entire form
      const formErrors = validateForm()
      setErrors(formErrors)

      if (Object.keys(formErrors).length === 0) {
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 2000))
          
          setSubmitResult({
            success: true,
            message: 'Form submitted successfully!'
          })
          
          // Reset form
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            age: '',
            website: '',
            terms: false
          })
          setTouched({})
          
        } catch {
          setSubmitResult({
            success: false,
            message: 'Failed to submit form. Please try again.'
          })
        }
      } else {
        setSubmitResult({
          success: false,
          message: 'Please fix the errors above before submitting.'
        })
      }

      setIsSubmitting(false)
    }

    return (
      <div className="form-demo">
        <h4>🔍 Advanced Form with Validation</h4>
        <form onSubmit={handleSubmit} className="validated-form">
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={errors.firstName && touched.firstName ? 'error' : ''}
              />
              {errors.firstName && touched.firstName && (
                <span className="error-text">{errors.firstName}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={errors.lastName && touched.lastName ? 'error' : ''}
              />
              {errors.lastName && touched.lastName && (
                <span className="error-text">{errors.lastName}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? 'error' : ''}
            />
            {errors.email && touched.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="+1 (555) 123-4567"
              className={errors.phone && touched.phone ? 'error' : ''}
            />
            {errors.phone && touched.phone && (
              <span className="error-text">{errors.phone}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                onBlur={handleBlur}
                min="13"
                max="120"
                className={errors.age && touched.age ? 'error' : ''}
              />
              {errors.age && touched.age && (
                <span className="error-text">{errors.age}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="website">Website (Optional)</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="https://example.com"
                className={errors.website && touched.website ? 'error' : ''}
              />
              {errors.website && touched.website && (
                <span className="error-text">{errors.website}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              I accept the terms and conditions *
            </label>
            {errors.terms && touched.terms && (
              <span className="error-text">{errors.terms}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? '⏳ Submitting...' : '📤 Submit Form'}
          </button>
        </form>

        {submitResult && (
          <div className={`submit-result ${submitResult.success ? 'success' : 'error'}`}>
            {submitResult.success ? '✅' : '❌'} {submitResult.message}
          </div>
        )}
      </div>
    )
  }

  // 🎛️ Dynamic Form with Field Arrays
  const DynamicForm = () => {
    const [skills, setSkills] = useState([''])
    const [formData, setFormData] = useState({
      projectName: '',
      description: '',
      technologies: ['']
    })

    const addSkill = () => {
      setSkills([...skills, ''])
    }

    const removeSkill = (index) => {
      setSkills(skills.filter((_, i) => i !== index))
    }

    const updateSkill = (index, value) => {
      const newSkills = [...skills]
      newSkills[index] = value
      setSkills(newSkills)
    }

    const addTechnology = () => {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, '']
      }))
    }

    const removeTechnology = (index) => {
      setFormData(prev => ({
        ...prev,
        technologies: prev.technologies.filter((_, i) => i !== index)
      }))
    }

    const updateTechnology = (index, value) => {
      setFormData(prev => ({
        ...prev,
        technologies: prev.technologies.map((tech, i) => 
          i === index ? value : tech
        )
      }))
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      const filteredSkills = skills.filter(skill => skill.trim())
      const filteredTechnologies = formData.technologies.filter(tech => tech.trim())
      
      console.log('Dynamic form submitted:', {
        ...formData,
        skills: filteredSkills,
        technologies: filteredTechnologies
      })
    }

    return (
      <div className="form-demo">
        <h4>🎛️ Dynamic Form with Field Arrays</h4>
        <form onSubmit={handleSubmit} className="dynamic-form">
          
          <div className="form-group">
            <label>Project Name:</label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                projectName: e.target.value
              }))}
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: e.target.value
              }))}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Skills:</label>
            {skills.map((skill, index) => (
              <div key={index} className="dynamic-field">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  placeholder={`Skill ${index + 1}`}
                />
                {skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="btn-remove"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addSkill} className="btn-add">
              ➕ Add Skill
            </button>
          </div>

          <div className="form-group">
            <label>Technologies:</label>
            {formData.technologies.map((tech, index) => (
              <div key={index} className="dynamic-field">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => updateTechnology(index, e.target.value)}
                  placeholder={`Technology ${index + 1}`}
                />
                {formData.technologies.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="btn-remove"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addTechnology} className="btn-add">
              ➕ Add Technology
            </button>
          </div>

          <button type="submit" className="btn-primary">
            Submit Dynamic Form
          </button>
        </form>
      </div>
    )
  }

  // 🔄 Comparison: Controlled vs Uncontrolled
  const ControlledVsUncontrolled = () => {
    const [controlledValue, setControlledValue] = useState('')
    const uncontrolledRef = useRef()

    const handleControlledSubmit = (e) => {
      e.preventDefault()
      alert(`Controlled value: ${controlledValue}`)
    }

    const handleUncontrolledSubmit = (e) => {
      e.preventDefault()
      alert(`Uncontrolled value: ${uncontrolledRef.current.value}`)
    }

    return (
      <div className="form-demo">
        <h4>🔄 Controlled vs Uncontrolled Comparison</h4>
        
        <div className="comparison-forms">
          <div className="form-section">
            <h5>✅ Controlled Input</h5>
            <form onSubmit={handleControlledSubmit}>
              <input
                type="text"
                value={controlledValue}
                onChange={(e) => setControlledValue(e.target.value)}
                placeholder="Controlled input"
              />
              <p>Live value: {controlledValue}</p>
              <p>Length: {controlledValue.length}</p>
              <button type="submit">Submit Controlled</button>
            </form>
          </div>

          <div className="form-section">
            <h5>⚠️ Uncontrolled Input</h5>
            <form onSubmit={handleUncontrolledSubmit}>
              <input
                ref={uncontrolledRef}
                type="text"
                defaultValue="Default text"
                placeholder="Uncontrolled input"
              />
              <p>Value only accessible on submit</p>
              <button type="submit">Submit Uncontrolled</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="examples-container">
      
      {/* Controlled Inputs Section */}
      <div className="example-section">
        <h3>🎯 Controlled Inputs</h3>
        <div className="code-example">
          <p>
            <strong>Controlled inputs</strong> are form elements whose values are controlled by React state.
            The input's value is always driven by React state, making it the "single source of truth".
          </p>
          <SimpleControlledForm />
          
          <div className="controlled-benefits">
            <h5>✅ Benefits of Controlled Inputs:</h5>
            <ul>
              <li><strong>Predictable:</strong> Value always reflects React state</li>
              <li><strong>Validation:</strong> Real-time validation as user types</li>
              <li><strong>Formatting:</strong> Format input on-the-fly</li>
              <li><strong>Conditional Logic:</strong> Enable/disable based on other fields</li>
              <li><strong>Testing:</strong> Easier to test with predictable state</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Form Validation Section */}
      <div className="example-section">
        <h3>🔍 Form Validation</h3>
        <div className="code-example">
          <p>
            <strong>Form validation</strong> ensures data quality and provides user feedback.
            Implement both real-time validation (as user types) and submission validation.
          </p>
          <ValidatedForm />
          
          <div className="validation-strategies">
            <h5>🛡️ Validation Strategies:</h5>
            <div className="strategy-grid">
              <div className="strategy">
                <h6>📝 Field-Level Validation</h6>
                <ul>
                  <li>Validate on blur or change</li>
                  <li>Immediate user feedback</li>
                  <li>Prevent invalid input patterns</li>
                </ul>
              </div>
              <div className="strategy">
                <h6>📋 Form-Level Validation</h6>
                <ul>
                  <li>Validate on submission</li>
                  <li>Cross-field validation</li>
                  <li>Business rule validation</li>
                </ul>
              </div>
              <div className="strategy">
                <h6>🎯 User Experience</h6>
                <ul>
                  <li>Clear error messages</li>
                  <li>Visual indicators</li>
                  <li>Accessible validation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Submission Section */}
      <div className="example-section">
        <h3>📤 Form Submission</h3>
        <div className="code-example">
          <p>
            <strong>Form submission</strong> involves preventing default browser behavior,
            validating data, handling async operations, and providing user feedback.
          </p>
          <DynamicForm />
          
          <div className="submission-patterns">
            <h5>🚀 Submission Patterns:</h5>
            <div className="pattern-grid">
              <div className="pattern">
                <h6>🛡️ Prevent Default</h6>
                <code>e.preventDefault()</code>
                <p>Stops browser from refreshing page</p>
              </div>
              <div className="pattern">
                <h6>⏳ Loading States</h6>
                <code>setIsSubmitting(true)</code>
                <p>Disable form during submission</p>
              </div>
              <div className="pattern">
                <h6>✅ Success Handling</h6>
                <code>setSuccess(true)</code>
                <p>Show success message and reset form</p>
              </div>
              <div className="pattern">
                <h6>❌ Error Handling</h6>
                <code>catch(error)</code>
                <p>Display error messages to user</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controlled vs Uncontrolled */}
      <div className="example-section">
        <h3>⚖️ Controlled vs Uncontrolled</h3>
        <div className="code-example">
          <ControlledVsUncontrolled />
        </div>
      </div>

      {/* Interview Tips */}
      <div className="example-section">
        <h3>💡 Form Handling Interview Tips</h3>
        <div className="tips">
          <div className="tip">
            <h4>🎯 Controlled Inputs</h4>
            <ul>
              <li>Always use <code>value</code> and <code>onChange</code></li>
              <li>State is the single source of truth</li>
              <li>Enable real-time validation and formatting</li>
              <li>Prefer over uncontrolled for most cases</li>
            </ul>
          </div>

          <div className="tip">
            <h4>🔍 Validation Best Practices</h4>
            <ul>
              <li>Validate on blur for better UX</li>
              <li>Show errors only after user interaction</li>
              <li>Use clear, helpful error messages</li>
              <li>Validate on submission as final check</li>
            </ul>
          </div>

          <div className="tip">
            <h4>📤 Submission Handling</h4>
            <ul>
              <li>Always call <code>e.preventDefault()</code></li>
              <li>Disable form during submission</li>
              <li>Handle both success and error cases</li>
              <li>Provide clear feedback to users</li>
            </ul>
          </div>

          <div className="tip">
            <h4>📝 Common Interview Questions</h4>
            <ul>
              <li>"How do you handle form validation in React?"</li>
              <li>"What's the difference between controlled and uncontrolled inputs?"</li>
              <li>"How do you prevent form submission page refresh?"</li>
              <li>"How do you handle dynamic form fields?"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormHandlingExamples
