/* eslint-disable no-unused-vars */
import './DoctorsDashboard.css';
import { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function InfoCard({ title, children, onViewDetails, patient }) {
    return (
        <div className="info-card">
            <h3>{title}</h3>
            <div className="card-content">{children}</div>
            <button onClick={() => onViewDetails(patient)} className="view-details-btn">View Details</button>
        </div>
    );
}

import AllPatientsCard from './components/AllPatientsCard';
import NotificationsCard from './components/NotificationsCard';
import { patients, payments, appointments } from '../../data/PatientsDetails';

function DoctorsDashboard() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [openPlannerModal, setOpenPlannerModal] = useState(false);
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    const [openAppointmentsModal, setOpenAppointmentsModal] = useState(false);
    const [openPatientDetailsModal, setOpenPatientDetailsModal] = useState(false);
    const [openMedicationExerciseModal, setOpenMedicationExerciseModal] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);



    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const getAppointmentsForDate = (date) => {
        return appointments.filter(app => 
            app.date.toDateString() === date.toDateString()
        );
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxHeight: '80vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflow: 'auto',
    };

    const handleViewPatientDetails = (patient) => {
        setSelectedPatient(patient);
        setOpenPatientDetailsModal(true);
    };

    const handleViewMedicationExercise = (patient) => {
        setSelectedPatient(patient);
        setOpenMedicationExerciseModal(true);
    };

    const renderMedicationExerciseModal = () => (
        <Modal
            open={openMedicationExerciseModal}
            onClose={() => setOpenMedicationExerciseModal(false)}
            className="medication-exercise-modal"
        >
            <Box sx={modalStyle}>
                {selectedPatient && (
                    <>
                        <h2 style={{ color: '#1976d2', marginBottom: '20px', borderBottom: '2px solid #1976d2', paddingBottom: '10px' }}>
                            {selectedPatient.name}'s Medications & Exercises
                        </h2>
                        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                            <TableContainer component={Paper} sx={{ flex: 1, minWidth: '300px', boxShadow: 3 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1976d2' }}>
                                                Medications
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedPatient.medications.map((medication, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{medication}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Exercises Table */}
                            <TableContainer component={Paper} sx={{ flex: 1, minWidth: '300px', boxShadow: 3 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1976d2' }}>
                                                Exercises
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedPatient.exercises.map((exercise, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{exercise}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                            <Button 
                                variant="outlined" 
                                color="primary"
                                onClick={() => setOpenMedicationExerciseModal(false)}
                            >
                                Close
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );

    // Render the main dashboard content
    

    const renderPatientDetailsModal = () => (
        <Modal
            open={openPatientDetailsModal}
            onClose={() => setOpenPatientDetailsModal(false)}
            className="patient-details-modal"
        >
            <Box sx={modalStyle}>
                {selectedPatient && (
                    <>
                        <h2 style={{ color: '#1976d2', marginBottom: '20px', borderBottom: '2px solid #1976d2', paddingBottom: '10px' }}>
                            Patient Details - {selectedPatient.name}
                        </h2>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {/* Basic Information */}
                            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1976d2' }} colSpan={2}>
                                                Basic Information
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold', width: '200px' }}>Patient ID</TableCell>
                                            <TableCell>{selectedPatient.id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                                            <TableCell>{selectedPatient.age}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Disease/Problem</TableCell>
                                            <TableCell>{selectedPatient.disease}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                            <TableCell>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    backgroundColor: selectedPatient.status === 'Active' ? '#e8f5e9' : '#ffebee',
                                                    color: selectedPatient.status === 'Active' ? '#2e7d32' : '#c62828'
                                                }}>
                                                    {selectedPatient.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Progress</TableCell>
                                            <TableCell>
                                                <span style={{
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    backgroundColor: 
                                                        selectedPatient.progress === 'Improving' ? '#e3f2fd' :
                                                        selectedPatient.progress === 'Stable' ? '#f3e5f5' :
                                                        '#fff3e0',
                                                    color: 
                                                        selectedPatient.progress === 'Improving' ? '#1565c0' :
                                                        selectedPatient.progress === 'Stable' ? '#7b1fa2' :
                                                        '#ef6c00'
                                                }}>
                                                    {selectedPatient.progress}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {/* Visit Information */}
                            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#1976d2' }} colSpan={2}>
                                                Visit Information
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold', width: '200px' }}>Last Visit</TableCell>
                                            <TableCell>{selectedPatient.lastVisit}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Next Visit</TableCell>
                                            <TableCell>{selectedPatient.nextVisit}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                            <Button 
                                variant="outlined" 
                                color="primary"
                                onClick={() => setOpenPatientDetailsModal(false)}
                            >
                                Close
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary"
                            >
                                Update Details
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </Modal>
    );

    const renderPlannerModal = () => (
        <Modal
            open={openPlannerModal}
            onClose={() => setOpenPlannerModal(false)}
            className="planner-modal"
        >
            <Box sx={modalStyle}>
                <h2 style={{ color: '#1976d2', marginBottom: '20px', borderBottom: '2px solid #1976d2', paddingBottom: '10px' }}>Patient Daily Planner</h2>
                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Disease/Problem</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Last Visit</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Next Visit</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Progress</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {patients.map((patient) => (
                                <TableRow 
                                    key={patient.id}
                                    sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                                >
                                    <TableCell>{patient.id}</TableCell>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient.age}</TableCell>
                                    <TableCell>{patient.disease}</TableCell>
                                    <TableCell>{patient.lastVisit}</TableCell>
                                    <TableCell>{patient.nextVisit}</TableCell>
                                    <TableCell>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: patient.status === 'Active' ? '#e8f5e9' : '#ffebee',
                                            color: patient.status === 'Active' ? '#2e7d32' : '#c62828'
                                        }}>
                                            {patient.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: 
                                                patient.progress === 'Improving' ? '#e3f2fd' :
                                                patient.progress === 'Stable' ? '#f3e5f5' :
                                                '#fff3e0',
                                            color: 
                                                patient.progress === 'Improving' ? '#1565c0' :
                                                patient.progress === 'Stable' ? '#7b1fa2' :
                                                '#ef6c00'
                                        }}>
                                            {patient.progress}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            size="small"
                                            sx={{ mr: 1, textTransform: 'none' }}
                                            onClick={() => handleViewMedicationExercise(patient)}
                                        >
                                            View Details
                                        </Button>
                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    );

    const renderPaymentModal = () => (
        <Modal
            open={openPaymentModal}
            onClose={() => setOpenPaymentModal(false)}
            className="payment-modal"
        >
            <Box sx={modalStyle}>
                <h2 style={{ color: '#1976d2', marginBottom: '20px', borderBottom: '2px solid #1976d2', paddingBottom: '10px' }}>Payment Status</h2>
                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Invoice #</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Patient ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Service</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Payment Method</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Due Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow 
                                    key={payment.id}
                                    sx={{ 
                                        '&:hover': { backgroundColor: '#f5f5f5' },
                                        backgroundColor: payment.status === 'Overdue' ? '#fff8e1' : 'inherit'
                                    }}
                                >
                                    <TableCell>{payment.invoiceNumber}</TableCell>
                                    <TableCell>{payment.id}</TableCell>
                                    <TableCell>{payment.name}</TableCell>
                                    <TableCell>{payment.service}</TableCell>
                                    <TableCell>
                                        <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>
                                            {payment.amount}rs
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: 
                                                payment.status === 'Paid' ? '#e8f5e9' :
                                                payment.status === 'Due' ? '#fff3e0' :
                                                '#ffebee',
                                            color: 
                                                payment.status === 'Paid' ? '#2e7d32' :
                                                payment.status === 'Due' ? '#ef6c00' :
                                                '#c62828'
                                        }}>
                                            {payment.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{payment.paymentMethod}</TableCell>
                                    <TableCell>{payment.nextPaymentDue}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color={payment.status === 'Paid' ? 'primary' : 'warning'}
                                            size="small"
                                            sx={{ mr: 1, textTransform: 'none' }}
                                        >
                                            {payment.status === 'Paid' ? 'View Receipt' : 'Send Reminder'}
                                        </Button>
                                        
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    );

    const renderAppointmentsModal = () => (
        <Modal
            open={openAppointmentsModal}
            onClose={() => setOpenAppointmentsModal(false)}
            className="appointments-modal"
        >
            <Box sx={modalStyle}>
                <h2 style={{ color: '#1976d2', marginBottom: '20px', borderBottom: '2px solid #1976d2', paddingBottom: '10px' }}>
                    Appointments for {selectedDate.toLocaleDateString()}
                </h2>
                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Time</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Patient ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Patient</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Room</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Notes</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {getAppointmentsForDate(selectedDate).map((app, index) => (
                                <TableRow 
                                    key={app.id}
                                    sx={{ 
                                        '&:hover': { backgroundColor: '#f5f5f5' },
                                        backgroundColor: 
                                            app.status === 'In Progress' ? '#e3f2fd' :
                                            app.status === 'Completed' ? '#f9fbe7' :
                                            app.status === 'Waiting' ? '#fff3e0' : 'inherit'
                                    }}
                                >
                                    <TableCell>{app.time}</TableCell>
                                    <TableCell>{app.id}</TableCell>
                                    <TableCell>{app.patient}</TableCell>
                                    <TableCell>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: 
                                                app.type === 'Emergency' ? '#ffebee' :
                                                app.type === 'New Patient' ? '#e8f5e9' :
                                                '#e3f2fd',
                                            color: 
                                                app.type === 'Emergency' ? '#c62828' :
                                                app.type === 'New Patient' ? '#2e7d32' :
                                                '#1565c0'
                                        }}>
                                            {app.type}
                                        </span>
                                    </TableCell>
                                    <TableCell>{app.duration}</TableCell>
                                    <TableCell>{app.room}</TableCell>
                                    <TableCell>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            backgroundColor: 
                                                app.status === 'Completed' ? '#e8f5e9' :
                                                app.status === 'In Progress' ? '#e3f2fd' :
                                                app.status === 'Waiting' ? '#fff3e0' :
                                                '#f3e5f5',
                                            color: 
                                                app.status === 'Completed' ? '#2e7d32' :
                                                app.status === 'In Progress' ? '#1565c0' :
                                                app.status === 'Waiting' ? '#ef6c00' :
                                                '#7b1fa2'
                                        }}>
                                            {app.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{app.notes}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="primary"
                                            size="small"
                                            sx={{ mr: 1, textTransform: 'none' }}
                                        >
                                            Start Session
                                        </Button>
                                        <Button 
                                            variant="outlined" 
                                            color="secondary"
                                            size="small"
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Reschedule
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    );

    return (
        <>
            {renderMedicationExerciseModal()}
            
            <div className="dashboard-container">
                <div className="dashboard-left">
                    <div className="info-cards-section">
                        <InfoCard 
                            title="Patients Daily Planner"
                            onViewDetails={() => setOpenPlannerModal(true)}
                        >
                            <p>Today's Patient Count: {patients.length}</p>
                            <p>Next Appointment: 10:00 AM</p>
                        </InfoCard>

                        <InfoCard 
                            title="Payment Status"
                            onViewDetails={() => setOpenPaymentModal(true)}
                        >
                            <p>Pending Payments: {payments.filter(p => p.status === 'Due').length}</p>
                            <p>Total Revenue: {payments.reduce((sum, p) => sum + (p.status === 'Paid' ? p.amount : 0), 0)}rs</p>
                        </InfoCard>

                        <InfoCard 
                            title="Today's Appointments"
                            onViewDetails={() => setOpenAppointmentsModal(true)}
                        >
                            <p>Total Appointments: {appointments.length}</p>
                            <p>Available Slots: 3</p>
                        </InfoCard>
                    </div>
                    
                    <div className="dashboard-cards-section">
                        <AllPatientsCard patients={patients} onViewDetails={handleViewPatientDetails} />
                        <NotificationsCard />
                    </div>
                </div>

                <div className="dashboard-right">
                    <div className="calendar-section">
                        <Calendar 
                            onChange={handleDateChange}
                            value={selectedDate}
                            tileClassName={({ date }) => {
                                return getAppointmentsForDate(date).length > 0 ? 'has-appointments' : '';
                            }}
                        />
                        <div className="appointments-list">
                            <h3>Appointments for {selectedDate.toDateString()}</h3>
                            {getAppointmentsForDate(selectedDate).map((app, index) => (
                                <div key={index} className="appointment-item">
                                    <p>{app.time} - {app.patient}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {renderPlannerModal()}
            {renderPaymentModal()}
            {renderAppointmentsModal()}
            {renderPatientDetailsModal()}
        </>
    );
}

export default DoctorsDashboard;