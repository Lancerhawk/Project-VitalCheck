/* eslint-disable no-unused-vars */
import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Modal,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { patients } from '../data/PatientsDetails';
import './Pateints.css';

function Patients() {
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    medicalHistory: '',
    assignedDoctor: '',
    consent: false
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!newPatient.name.trim()) errors.name = 'Name is required';
    if (!newPatient.age) errors.age = 'Age is required';
    if (!newPatient.gender) errors.gender = 'Gender is required';
    if (!newPatient.contactNumber) errors.contactNumber = 'Contact number is required';
    if (!newPatient.consent) errors.consent = 'Consent is required';
    if (newPatient.email && !/\S+@\S+\.\S+/.test(newPatient.email)) {
      errors.email = 'Invalid email format';
    }
    return errors;
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

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setOpenDetailsModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    // Here you would typically make an API call to save the new patient
    console.log('New patient data:', newPatient);
    setOpenRegisterModal(false);
    setNewPatient({
      name: '',
      age: '',
      gender: '',
      contactNumber: '',
      email: '',
      address: '',
      medicalHistory: '',
      assignedDoctor: '',
      consent: false
    });
    setFormErrors({});
  };

  return (
    <div className='patients' style={{ padding: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setOpenRegisterModal(true)}
        >
          Register New Patient
        </Button>
      </Box>

      <Grid container spacing={3}>
        {patients.map((patient) => (
          <Grid item xs={12} sm={6} md={4} key={patient.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {patient.name}
                </Typography>
                <Typography color="textSecondary">
                  ID: {patient.id}
                </Typography>
                <Typography color="textSecondary">
                  Age: {patient.age}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Disease: {patient.disease}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleViewDetails(patient)}
                >
                  View More Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Register Patient Modal */}
      <Modal
        open={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
      >
        <Box sx={{
          ...modalStyle,
          bgcolor: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          width: '60%',
        }}>
          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{
              color: '#1976d2',
              textAlign: 'center',
              fontWeight: 600,
              mb: 4,
              borderBottom: '2px solid #1976d2',
              paddingBottom: '8px'
            }}
          >
            Register New Patient
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 3,
              '& .MuiFormControl-root': {
                mb: 0
              }
            }}>

              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={newPatient.name}
                onChange={handleInputChange}
                required
                error={!!formErrors.name}
                helperText={formErrors.name}
                sx={{
                  gridColumn: '1 / -1',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
              <TextField
                label="Age"
                name="age"
                type="number"
                value={newPatient.age}
                onChange={handleInputChange}
                required
                error={!!formErrors.age}
                helperText={formErrors.age}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
              <FormControl error={!!formErrors.gender}>
                <InputLabel>Gender *</InputLabel>
                <Select
                  name="gender"
                  value={newPatient.gender || ''}
                  onChange={handleInputChange}
                  label="Gender *"
                  required
                  sx={{
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1976d2',
                    },
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {formErrors.gender && (
                  <Typography color="error" variant="caption">
                    {formErrors.gender}
                  </Typography>
                )}
              </FormControl>
              <TextField
                label="Contact Number"
                name="contactNumber"
                value={newPatient.contactNumber || ''}
                onChange={handleInputChange}
                required
                error={!!formErrors.contactNumber}
                helperText={formErrors.contactNumber}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={newPatient.email || ''}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
              <TextField
                label="Address"
                name="address"
                value={newPatient.address || ''}
                onChange={handleInputChange}
                sx={{
                  gridColumn: '1 / -1',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
              <TextField
                label="Medical History"
                name="medicalHistory"
                multiline
                rows={4}
                value={newPatient.medicalHistory || ''}
                onChange={handleInputChange}
                placeholder="Enter any relevant medical history, conditions, allergies, etc."
                sx={{
                  gridColumn: '1 / -1',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
              <TextField
                label="Assigned Doctor"
                name="assignedDoctor"
                value={newPatient.assignedDoctor || ''}
                onChange={handleInputChange}
                sx={{
                  gridColumn: '1 / -1',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
              <FormControl error={!!formErrors.consent} sx={{ gridColumn: '1 / -1' }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  padding: '8px',
                  borderRadius: '4px',
                  border: formErrors.consent ? '1px solid #d32f2f' : '1px solid #e0e0e0',
                  '&:hover': {
                    borderColor: '#1976d2',
                  },
                }}>
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={newPatient.consent || false}
                    onChange={(e) => handleInputChange({
                      target: {
                        name: 'consent',
                        value: e.target.checked
                      }
                    })}
                    style={{ width: '20px', height: '20px' }}
                  />
                  <label htmlFor="consent" className='heading' style={{ color: formErrors.consent ? '#d32f2f' : 'inherit' }}>
                    <p>Patient has consented to data collection and processing</p>
                  </label>
                </Box>
                {formErrors.consent && (
                  <Typography color="error" variant="caption">
                    {formErrors.consent}
                  </Typography>
                )}
              </FormControl>
              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 3,
                gridColumn: '1 / -1'
              }}>
                <Button
                  variant="outlined"
                  onClick={() => setOpenRegisterModal(false)}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    px: 4,
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    px: 4,
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                >
                  Register Patient
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Patient Details Modal */}
      <Modal
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
      >
        <Box sx={{
          ...modalStyle,
          bgcolor: '#ffffff',
          borderRadius: '16px',
          padding: '32px',
          width: '70%'
        }}>
          {selectedPatient && (
            <>
              <Typography 
                variant="h4" 
                component="h2" 
                gutterBottom 
                sx={{
                  color: '#1976d2',
                  textAlign: 'center',
                  fontWeight: 600,
                  mb: 4,
                  borderBottom: '2px solid #1976d2',
                  paddingBottom: '8px'
                }}
              >
                {selectedPatient.name}'s Details
              </Typography>
              
              {/* Basic Information */}
              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    color: '#1976d2',
                    fontWeight: 500,
                    mb: 2
                  }}
                >
                  Basic Information
                </Typography>
                <TableContainer 
                  component={Paper} 
                  sx={{ 
                    boxShadow: 3,
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}
                >
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell 
                          component="th" 
                          scope="row"
                          sx={{ 
                            fontWeight: 'bold',
                            backgroundColor: '#f5f5f5',
                            width: '200px'
                          }}
                        >
                          Patient ID
                        </TableCell>
                        <TableCell>{selectedPatient.id}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell 
                          component="th" 
                          scope="row"
                          sx={{ 
                            fontWeight: 'bold',
                            backgroundColor: '#f5f5f5'
                          }}
                        >
                          Age
                        </TableCell>
                        <TableCell>{selectedPatient.age}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell 
                          component="th" 
                          scope="row"
                          sx={{ 
                            fontWeight: 'bold',
                            backgroundColor: '#f5f5f5'
                          }}
                        >
                          Disease/Problem
                        </TableCell>
                        <TableCell>{selectedPatient.disease}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell 
                          component="th" 
                          scope="row"
                          sx={{ 
                            fontWeight: 'bold',
                            backgroundColor: '#f5f5f5'
                          }}
                        >
                          Status
                        </TableCell>
                        <TableCell>
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            backgroundColor: selectedPatient.status === 'Active' ? '#e8f5e9' : '#ffebee',
                            color: selectedPatient.status === 'Active' ? '#2e7d32' : '#c62828',
                            fontWeight: 500
                          }}>
                            {selectedPatient.status}
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell 
                          component="th" 
                          scope="row"
                          sx={{ 
                            fontWeight: 'bold',
                            backgroundColor: '#f5f5f5'
                          }}
                        >
                          Progress
                        </TableCell>
                        <TableCell>
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            backgroundColor: 
                              selectedPatient.progress === 'Improving' ? '#e3f2fd' :
                              selectedPatient.progress === 'Stable' ? '#f3e5f5' :
                              '#fff3e0',
                            color: 
                              selectedPatient.progress === 'Improving' ? '#1565c0' :
                              selectedPatient.progress === 'Stable' ? '#7b1fa2' :
                              '#ef6c00',
                            fontWeight: 500
                          }}>
                            {selectedPatient.progress}
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell 
                          component="th" 
                          scope="row"
                          sx={{ 
                            fontWeight: 'bold',
                            backgroundColor: '#f5f5f5'
                          }}
                        >
                          Last Visit
                        </TableCell>
                        <TableCell>{selectedPatient.lastVisit}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell 
                          component="th" 
                          scope="row"
                          sx={{ 
                            fontWeight: 'bold',
                            backgroundColor: '#f5f5f5'
                          }}
                        >
                          Next Visit
                        </TableCell>
                        <TableCell>{selectedPatient.nextVisit}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Medications and Exercises Grid */}
              <Grid container spacing={3}>
                {/* Medications */}
                <Grid item xs={12} md={6}>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      color: '#1976d2',
                      fontWeight: 500,
                      mb: 2
                    }}
                  >
                    Medications
                  </Typography>
                  <TableContainer 
                    component={Paper} 
                    sx={{ 
                      boxShadow: 3,
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell 
                            sx={{ 
                              backgroundColor: '#f5f5f5',
                              fontWeight: 'bold'
                            }}
                          >
                            Medication Name
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
                </Grid>

                {/* Exercises */}
                <Grid item xs={12} md={6}>
                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{ 
                      color: '#1976d2',
                      fontWeight: 500,
                      mb: 2
                    }}
                  >
                    Exercises
                  </Typography>
                  <TableContainer 
                    component={Paper} 
                    sx={{ 
                      boxShadow: 3,
                      borderRadius: 2,
                      overflow: 'hidden'
                    }}
                  >
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell 
                            sx={{ 
                              backgroundColor: '#f5f5f5',
                              fontWeight: 'bold'
                            }}
                          >
                            Exercise Name
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
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={() => setOpenDetailsModal(false)}
                  sx={{
                    borderRadius: '8px',
                    textTransform: 'none',
                    px: 4,
                    '&:hover': {
                      backgroundColor: '#1565c0'
                    }
                  }}
                >
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default Patients;