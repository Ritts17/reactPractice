import React, { useState, useEffect } from 'react'

function SubscriptionForm({ onAddSubscription, onUpdateSubscription, editingSubscription, onCancelEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    category: '',
    frequency: '',
    paymentDate: '',
    notes: ''
  })

  const [errors, setErrors] = useState({})

  const defaultCategories = [
    'Entertainment & Media',
    'Software & Productivity', 
    'Utilities & Services',
    'Health & Fitness',
    'Learning & Education',
    'Other / Miscellaneous'
  ]

  const frequencies = ['Weekly', 'Monthly', 'Yearly']

  useEffect(() => {
    if (editingSubscription) {
      setFormData({
        name: editingSubscription.subscriptionName || '',
        cost: editingSubscription.cost || '',
        category: editingSubscription.category || '',
        frequency: editingSubscription.frequency || '',
        paymentDate: editingSubscription.paymentDate 
          ? new Date(editingSubscription.paymentDate).toISOString().split('T')[0] 
          : '',
        notes: editingSubscription.notes || ''
      })
    }
  }, [editingSubscription])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Subscription name is required'
    }
    
    if (!formData.cost.trim()) {
      newErrors.cost = 'Cost is required'
    } else if (isNaN(formData.cost) || parseFloat(formData.cost) <= 0) {
      newErrors.cost = 'Please enter a valid cost greater than 0'
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category'
    }
    
    if (!formData.frequency) {
      newErrors.frequency = 'Please select a frequency'
    }
    
    if(!formData.paymentDate) {
      newErrors.paymentDate = "Please enter a payment date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      if (editingSubscription) {
        onUpdateSubscription(editingSubscription._id, formData)
      } else {
        onAddSubscription(formData)
      }
      
      // Reset form
      setFormData({
        name: '',
        cost: '',
        category: '',
        frequency: '',
        paymentDate: '',
        notes: ''
      })
      setErrors({})
    }
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      cost: '',
      category: '',
      frequency: '',
      paymentDate: '',
      notes: ''
    })
    setErrors({})
    onCancelEdit()
  }

  return (
    <form className="subscription-form" onSubmit={handleSubmit}>
      <h2 style={{marginBottom : '20px'}}>{editingSubscription ? 'Edit Subscription' : 'Add New Subscription'}</h2>
      
      <div className="form-group">
        <label>Subscription Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter subscription name"
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Cost:</label>
        <input
          type="number"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          placeholder="Enter cost"
          step="0.01"
        />
        {errors.cost && <span className="error">{errors.cost}</span>}
      </div>

      <div className="form-group">
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select the category</option>
          {defaultCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.category && <span className="error">{errors.category}</span>}
      </div>

      <div className="form-group">
        <label>Frequency:</label>
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
        >
          <option value="">Select the frequency</option>
          {frequencies.map(freq => (
            <option key={freq} value={freq}>{freq}</option>
          ))}
        </select>
        {errors.frequency && <span className="error">{errors.frequency}</span>}
      </div>

      <div className="form-group">
        <label>Payment Date:</label>
        <input
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
        />
        {errors.paymentDate && <span className="error">{errors.paymentDate}</span>}
      </div>

      <div className="form-group">
        <label>Notes:</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter any additional notes (optional)"
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="add-btn">
          {editingSubscription ? 'Update Subscription' : 'Add Subscription'}
        </button>
        {editingSubscription && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default SubscriptionForm