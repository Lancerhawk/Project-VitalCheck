import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export const notifications = [
    {
        id: 1,
        type: 'appointment',
        message: 'New appointment scheduled with Tester',
        time: '10 minutes ago',
        icon: EventIcon
    },
    {
        id: 2,
        type: 'payment',
        message: 'Payment received from Tester',
        time: '30 minutes ago',
        icon: PaymentIcon
    },
    {
        id: 3,
        type: 'medical',
        message: 'Updated medical records for Tester',
        time: '1 hour ago',
        icon: MedicalServicesIcon
    },
    {
        id: 4,
        type: 'appointment',
        message: 'Appointment rescheduled with Tester',
        time: '2 hours ago',
        icon: EventIcon
    },
    {
        id: 5,
        type: 'medical',
        message: 'New test results available for Tester',
        time: '3 hours ago',
        icon: MedicalServicesIcon
    },
    {
        id: 6,
        type: 'medical',
        message: 'New test results available for Tester',
        time: '3 hours ago',
        icon: MedicalServicesIcon
    },
    {
        id: 7,
        type: 'medical',
        message: 'New test results available for Tester',
        time: '3 hours ago',
        icon: MedicalServicesIcon
    }
];

export const getNotificationColor = (type) => {
    switch(type) {
        case 'appointment':
            return '#2196f3';
        case 'payment':
            return '#4caf50';
        case 'medical':
            return '#f44336';
        default:
            return '#757575';
    }
};