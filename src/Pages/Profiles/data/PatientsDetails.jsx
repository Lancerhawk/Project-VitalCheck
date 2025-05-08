// Mock data for patients, payments, and appointments

export const patients = [
    { 
        id: 'P001', 
        name: 'John Doe', 
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
        name: 'Jane Smith', 
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
        name: 'Mike Johnson', 
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
        name: 'Sarah Williams', 
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
        name: 'Sarah Williams', 
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
        name: 'John Doe', 
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
        name: 'Jane Smith', 
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
        name: 'Mike Johnson', 
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
        name: 'Sarah Williams', 
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
        patient: 'John Doe', 
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
        patient: 'Jane Smith', 
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
        patient: 'Mike Johnson', 
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
        patient: 'Sarah Williams', 
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
        patient: 'Robert Brown', 
        time: '4:30 PM', 
        type: 'New Patient', 
        duration: '60 mins', 
        status: 'Scheduled', 
        notes: 'Initial consultation', 
        room: 'Room 101' 
    }
];