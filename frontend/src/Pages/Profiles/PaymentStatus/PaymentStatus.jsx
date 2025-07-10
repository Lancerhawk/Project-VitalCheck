import './PaymentStatus.css'
import { paymentSummary, paymentHistory, paymentMethods } from './paymentData'
import { useState } from 'react'

function PaymentStatus() {
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredPayments = statusFilter === 'all'
    ? paymentHistory
    : paymentHistory.filter(payment => payment.status === statusFilter)

  const handleExport = () => {
    const headers = ['INVOICE', 'DESCRIPTION', 'AMOUNT', 'DATE', 'STATUS', 'PATIENT NAME']
    const csvContent = [
      headers.join(','),
      ...filteredPayments.map(payment => [
        payment.invoice,
        payment.description,
        payment.amount.toFixed(2),
        payment.date,
        payment.status,
        payment.provider
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `payment_history_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className='payment-status'>
      <h2>Payment Status</h2>
      <p className="subtitle">Track and manage payments received from patients</p>

      <div className="status-cards">
        <div className="status-card paid">
          <div className="card-icon">{paymentSummary.paid.icon}</div>
          <span className="status-label">In Balance</span>
          <span className="amount">${paymentSummary.paid.amount.toFixed(2)}</span>
        </div>

        <div className="status-card pending">
          <div className="card-icon">{paymentSummary.pending.icon}</div>
          <span className="status-label">Pending</span>
          <span className="amount">${paymentSummary.pending.amount.toFixed(2)}</span>
        </div>

        <div className="status-card processing">
          <div className="card-icon">{paymentSummary.processing.icon}</div>
          <span className="status-label">Processing</span>
          <span className="amount">${paymentSummary.processing.amount.toFixed(2)}</span>
        </div>

        <div className="status-card next-due">
          <div className="card-icon">{paymentSummary.nextDue.icon}</div>
          <span className="status-label">Next Due Payment</span>
          <span className="date">{paymentSummary.nextDue.date}</span>
          {/* <span className="amount">${paymentSummary.nextDue.amount.toFixed(2)}</span> */}
        </div>
      </div>

      <div className="payment-history">
        <div className="history-header">
          <h3>Payment History</h3>
          <div className="history-actions">
            <select 
              className="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
            </select>
            <button className="export-btn" onClick={handleExport}>Export</button>
          </div>
        </div>

        <table className="history-table">
          <thead>
            <tr>
              <th>INVOICE</th>
              <th>DESCRIPTION</th>
              <th>AMOUNT</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th>PATIENT NAME</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(payment => (
              <tr key={payment.invoice}>
                <td>{payment.invoice}</td>
                <td>{payment.description}</td>
                <td>${payment.amount.toFixed(2)}</td>
                <td>{payment.date}</td>
                <td><span className={`status ${payment.status}`}>{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span></td>
                <td>{payment.provider}</td>
                <td className="actions">
                  <button className="action-btn download">↓</button>
                  <button className="action-btn view">👁</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="payment-methods">
        <h3>Payment Methods</h3>
        <div className="method-cards">
          {paymentMethods.map((method, index) => (
            <div key={index} className="method-card">
              <div className="card-type">{method.type}</div>
              <div className="card-details">{method.details}</div>
              {method.isDefault && <span className="default-badge">Default</span>}
            </div>
          ))}

          <button className="add-method-btn">
            <span>+</span> Add Payment Method
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentStatus;