import { useState } from 'react';
import './PatientReports.css';
import { patientsreports } from '../data/PatientsDetails';

function PatientReports() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patientsreports.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
    console.log('Exporting patient list...');
  };

  return (
    <div className='patient-reports'>
      <div className='header'>
        <h1>Patient Reports</h1>
        <button className='export-btn' onClick={handleExport}>
          <span className='icon'>⬇️</span>
          Export List
        </button>
      </div>

      <div className='search-bar'>
        <span className='search-icon'>🔍</span>
        <input
          type='text'
          placeholder='Search patients by name or ID...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>PATIENT ID</th>
              <th>NAME</th>
              <th>AGE/GENDER</th>
              <th>REGISTRATION DATE</th>
              <th>LAST VISIT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>
                  <div className='patient-info'>
                    <span className='name'>{patient.name}</span>
                    <span className='email'>{patient.email}</span>
                  </div>
                </td>
                <td>{`${patient.age} / ${patient.gender}`}</td>
                <td>{patient.registrationDate}</td>
                <td>{patient.lastVisit}</td>
                <td>
                  <div className='action-buttons'>
                    <button className='view-btn'>
                      <span className='icon'>👁️</span>
                      View
                    </button>
                    <button className='reports-btn'>
                      <span className='icon'>📄</span>
                      Reports
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientReports;