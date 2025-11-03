import React, { useState, useEffect } from 'react'
import SubscriptionForm from './components/SubscriptionForm'
import SubscriptionTable from './components/SubscriptionTable'
import { subscriptionAPI } from './apiConfig'
import './App.css'

function App() {
  const [subscriptions, setSubscriptions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingSubscription, setEditingSubscription] = useState(null)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  useEffect(() => {
    const filtered = subscriptions.filter(sub => 
      sub.subscriptionName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredSubscriptions(filtered)
  }, [subscriptions, searchTerm])

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const response = await subscriptionAPI.getAllSubscriptions()
      setSubscriptions(response.data)
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      alert('Failed to fetch subscriptions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const addSubscription = async (newSubscription) => {
    try {
      const subscriptionData = {
        subscriptionName: newSubscription.name,
        cost: parseFloat(newSubscription.cost),
        category: newSubscription.category,
        frequency: newSubscription.frequency,
        paymentDate: newSubscription.paymentDate || new Date().toISOString(),
        notes: newSubscription.notes || ''
      }

      const response = await subscriptionAPI.addSubscription(subscriptionData)
      alert(response.data.message)
      fetchSubscriptions()
    } catch (error) {
      console.error('Error adding subscription:', error)
      alert('Failed to add subscription. Please try again.')
    }
  }

  const updateSubscription = async (id, updatedData) => {
    try {
      const subscriptionData = {
        subscriptionName: updatedData.name,
        cost: parseFloat(updatedData.cost),
        category: updatedData.category,
        frequency: updatedData.frequency,
        paymentDate: updatedData.paymentDate || new Date().toISOString(),
        notes: updatedData.notes || ''
      }

      const response = await subscriptionAPI.updateSubscription(id, subscriptionData)
      alert(response.data.message)
      setEditingSubscription(null)
      fetchSubscriptions()
    } catch (error) {
      console.error('Error updating subscription:', error)
      alert('Failed to update subscription. Please try again.')
    }
  }

  const removeSubscription = async (id) => {
    if (window.confirm('Are you sure you want to remove this subscription?')) {
      try {
        const response = await subscriptionAPI.removeSubscription(id)
        alert(response.data.message)
        fetchSubscriptions()
      } catch (error) {
        console.error('Error removing subscription:', error)
        alert('Failed to remove subscription. Please try again.')
      }
    }
  }

  const editSubscription = (id) => {
    const subscription = subscriptions.find(sub => sub._id === id)
    if (subscription) {
      setEditingSubscription(subscription)
    }
  }

  const cancelEdit = () => {
    setEditingSubscription(null)
  }

  const calculateTotalCosts = () => {
    const monthlyTotal = filteredSubscriptions.reduce((total, sub) => {
      const cost = parseFloat(sub.cost) || 0
      if (sub.frequency === 'Weekly') return total + (cost * 4)
      if (sub.frequency === 'Monthly') return total + cost
      if (sub.frequency === 'Yearly') return total + (cost / 12)
      return total
    }, 0)

    const yearlyTotal = monthlyTotal * 12

    return { monthlyTotal, yearlyTotal }
  }

  const { monthlyTotal, yearlyTotal } = calculateTotalCosts()

  if (loading) {
    return (
      <div className="app">
        <div className="header">
          <h1>Subscription Manager</h1>
        </div>
        <div className="container">
          <p style={{ textAlign: 'center', padding: '40px' }}>Loading subscriptions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="header">
        <h1>Subscription Manager</h1>
      </div>

      <div className="container">
        <SubscriptionForm 
          onAddSubscription={addSubscription}
          onUpdateSubscription={updateSubscription}
          editingSubscription={editingSubscription}
          onCancelEdit={cancelEdit}
        />
        
        <div className="search-section">
          <input
            type="text"
            placeholder="Search subscriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="cost-summary">
          <div className="monthly-cost">₹{monthlyTotal.toFixed(2)}/month</div>
          <div className="yearly-cost">₹{yearlyTotal.toFixed(2)}/year</div>
        </div>

        <SubscriptionTable 
          subscriptions={filteredSubscriptions}
          onRemoveSubscription={removeSubscription}
          onEditSubscription={editSubscription}
        />
      </div>
    </div>
  )
}

export default App