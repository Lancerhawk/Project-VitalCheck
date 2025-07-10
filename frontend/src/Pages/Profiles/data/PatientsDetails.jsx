// Mock data for patients, payments, and appointments

export const patients = [
    { 
        id: 'P001', 
        name: 'Test 1', 
        age: 45, 
        disease: 'Hypertension', 
        exercises: ['Walking', 'Swimming'], 
        medications: ['Lisinopril', 'Amlodipine'], 
        lastVisit: '2024-01-15', 
        nextVisit: '2024-02-15', 
        status: 'Active', 
        progress: 'Improving' 
    },
    { 
        id: 'P002', 
        name: 'Test 2', 
        age: 38, 
        disease: 'Diabetes', 
        exercises: ['Cycling', 'Yoga'], 
        medications: ['Metformin', 'Insulin'], 
        lastVisit: '2024-01-10', 
        nextVisit: '2024-02-10', 
        status: 'Active', 
        progress: 'Stable' 
    },
    { 
        id: 'P003', 
        name: 'Test 3', 
        age: 52, 
        disease: 'Arthritis', 
        exercises: ['Swimming', 'Stretching'], 
        medications: ['Ibuprofen', 'Celebrex'], 
        lastVisit: '2024-01-20', 
        nextVisit: '2024-02-20', 
        status: 'Active', 
        progress: 'Needs Attention' 
    },
    { 
        id: 'P004', 
        name: 'Test 4', 
        age: 41, 
        disease: 'Asthma', 
        exercises: ['Light Jogging', 'Breathing Exercises'], 
        medications: ['Albuterol', 'Flovent'], 
        lastVisit: '2024-01-18', 
        nextVisit: '2024-02-18', 
        status: 'Active', 
        progress: 'Stable' 
    },
    { 
        id: 'P005', 
        name: 'Test 5', 
        age: 41, 
        disease: 'Asthma', 
        exercises: ['Light Jogging', 'Breathing Exercises'], 
        medications: ['Albuterol', 'Flovent'], 
        lastVisit: '2024-01-18', 
        nextVisit: '2024-02-18', 
        status: 'Active', 
        progress: 'Stable' 
    }
];

export const payments = [
    { 
        id: 'P001', 
        name: 'Test 6', 
        status: 'Paid', 
        amount: 150, 
        date: '2024-01-15', 
        paymentMethod: 'Credit Card', 
        invoiceNumber: 'INV-2024-001', 
        service: 'Regular Checkup', 
        nextPaymentDue: '2024-02-15' 
    },
    { 
        id: 'P002', 
        name: 'Test 7', 
        status: 'Due', 
        amount: 200, 
        daysOverdue: 5, 
        paymentMethod: 'Pending', 
        invoiceNumber: 'INV-2024-002', 
        service: 'Diabetes Management', 
        nextPaymentDue: '2024-01-20' 
    },
    { 
        id: 'P003', 
        name: 'Test 8', 
        status: 'Paid', 
        amount: 180, 
        date: '2024-01-20', 
        paymentMethod: 'Bank Transfer', 
        invoiceNumber: 'INV-2024-003', 
        service: 'Arthritis Treatment', 
        nextPaymentDue: '2024-02-20' 
    },
    { 
        id: 'P004', 
        name: 'Test 9', 
        status: 'Overdue', 
        amount: 160, 
        daysOverdue: 10, 
        paymentMethod: 'Pending', 
        invoiceNumber: 'INV-2024-004', 
        service: 'Asthma Treatment', 
        nextPaymentDue: '2024-01-15' 
    }
];

export const appointments = [
    { 
        id: 'A001', 
        date: new Date(), 
        patient: 'Tester 1', 
        time: '10:00 AM', 
        type: 'Regular Checkup', 
        duration: '30 mins', 
        status: 'Scheduled', 
        notes: 'Blood pressure review', 
        room: 'Room 101' 
    },
    { 
        id: 'A002', 
        date: new Date(), 
        patient: 'Tester 2', 
        time: '11:30 AM', 
        type: 'Follow-up', 
        duration: '45 mins', 
        status: 'In Progress', 
        notes: 'Diabetes monitoring', 
        room: 'Room 102' 
    },
    { 
        id: 'A003', 
        date: new Date(), 
        patient: 'Tester 3', 
        time: '2:00 PM', 
        type: 'Treatment', 
        duration: '60 mins', 
        status: 'Completed', 
        notes: 'Arthritis assessment', 
        room: 'Room 103' 
    },
    { 
        id: 'A004', 
        date: new Date(), 
        patient: 'Tester 4', 
        time: '3:30 PM', 
        type: 'Emergency', 
        duration: '45 mins', 
        status: 'Waiting', 
        notes: 'Asthma attack follow-up', 
        room: 'Room 104' 
    },
    { 
        id: 'A005', 
        date: new Date(), 
        patient: 'Tester 5', 
        time: '4:30 PM', 
        type: 'New Patient', 
        duration: '60 mins', 
        status: 'Scheduled', 
        notes: 'Initial consultation', 
        room: 'Room 101' 
    }
];

export const patientsreports = [
    { id: 'P001', name: 'Tester 1', email: 'tester1.hi@example.com', age: 45, gender: 'Male', registrationDate: '2023-10-15', lastVisit: '2024-03-22' },
    { id: 'P002', name: 'Tester 2', email: 'tester2.hi@example.com', age: 32, gender: 'Female', registrationDate: '2023-11-05', lastVisit: '2024-05-01' },
    { id: 'P003', name: 'Tester 3', email: 'tester3.hi@example.com', age: 58, gender: 'Male', registrationDate: '2023-12-18', lastVisit: '2024-04-12' },
    { id: 'P004', name: 'Tester 4', email: 'tester4.hi@example.com', age: 27, gender: 'Female', registrationDate: '2024-01-09', lastVisit: '2024-05-10' },
  ];