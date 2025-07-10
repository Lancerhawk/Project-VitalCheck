import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function AllPatientsCard({ patients, onViewDetails }) {
    const navigate = useNavigate();
    return (
        
        <div className="dashboard-card all-patients-card">
            <h2>All Patients</h2>
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto', marginBottom: 2 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Disease/Problem</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Progress</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell>{patient.id}</TableCell>
                                <TableCell>{patient.name}</TableCell>
                                <TableCell>{patient.age}</TableCell>
                                <TableCell>{patient.disease}</TableCell>
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
                                        onClick={() => onViewDetails(patient)}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button 
                variant="contained" 
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => navigate('/dashboard/patients')}
            >
                View Full Patient List
            </Button>
        </div>
        
    );
}

export default AllPatientsCard;