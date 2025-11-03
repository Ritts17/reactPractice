import React from 'react'

function SubscriptionTable({ subscriptions, onRemoveSubscription, onEditSubscription }) {
  if (subscriptions.length === 0) {
    return (
      <div className="no-subscriptions">
        <p>No subscriptions found. Add your first subscription above!</p>
      </div>
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="table-container">
      <table className="subscriptions-table">
        <thead>
          <tr>
            <th>Subscription Name</th>
            <th>Cost</th>
            <th>Category</th>
            <th>Frequency</th>
            <th>Payment Date</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map(subscription => (
            <tr key={subscription._id}>
              <td>{subscription.subscriptionName}</td>
              <td>₹{subscription.cost}</td>
              <td>{subscription.category}</td>
              <td>{subscription.frequency}</td>
              <td>{formatDate(subscription.paymentDate)}</td>
              <td>{subscription.notes || '-'}</td>
              <td>
                <button 
                  className='edit-btn'
                  onClick={() => onEditSubscription(subscription._id)}
                >
                  Edit
                </button>
                <button 
                  className="remove-btn"
                  onClick={() => onRemoveSubscription(subscription._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubscriptionTable