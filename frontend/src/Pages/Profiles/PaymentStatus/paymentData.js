export const paymentSummary = {
  paid: {
    icon: '💰',
    amount: 12500.00
  },
  pending: {
    icon: '⏳',
    amount: 3200.00
  },
  processing: {
    icon: '🔄',
    amount: 1800.00
  },
  nextDue: {
    icon: '📅',
    date: '2024-02-15',
    amount: 500.00
  }
}

export const paymentHistory = [
  {
    invoice: 'INV-2024-001',
    description: 'Medical Checkup',
    amount: 250.00,
    date: '2024-01-05',
    status: 'paid',
    provider: 'John Smith'
  },
  {
    invoice: 'INV-2024-002',
    description: 'Lab Tests',
    amount: 180.00,
    date: '2024-01-10',
    status: 'pending',
    provider: 'Sarah Johnson'
  },
  {
    invoice: 'INV-2024-003',
    description: 'Consultation',
    amount: 150.00,
    date: '2024-01-15',
    status: 'processing',
    provider: 'Michael Brown'
  },
  {
    invoice: 'INV-2024-004',
    description: 'Vaccination',
    amount: 120.00,
    date: '2024-01-20',
    status: 'paid',
    provider: 'Emily Davis'
  }
]

export const paymentMethods = [
  {
    type: 'Credit Card',
    details: '**** **** **** 1234',
    isDefault: true
  },
  {
    type: 'Bank Account',
    details: '**** 5678',
    isDefault: false
  }
]