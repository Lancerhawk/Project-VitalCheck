import './DashboardLayout.css';
import { useUser } from '../../context/UserContext';
import DoctorSidebar from '../../Components/Sidebar/DoctorSidebar/DoctorSidebar';
import PatientSidebar from '../../Components/Sidebar/PatientSidebar/PatientSidebar';
import LearnerSidebar from '../../Components/Sidebar/LearningSidebar/LearnerSidebar';
import IndividualSidebar from '../../Components/Sidebar/IndividualSidebar/IndividualSidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import PersonalDashboard from './Dashboards/PersonalDashboard/PersonalDashboard';
import DoctorsDashboard from './Dashboards/DoctorDashboard/DoctorsDashboard';
import LearnerDashboard from './Dashboards/LearnerDashboard/LearnerDashboard';
import PatientDashboard from './Dashboards/PatientDashboard/PatientDashboard';
import Patients from './Patients/Patients';
import DiseaseFinderReports from './DiseaseFinder(Reports)/DiseaseFinderReports';
import DiseaseFinderScans from './DiseaseFinder(Scans)/DiseaseFinderScans';
import Notifications from './Notifications/Notifications';
import PatientReports from './PatientReports/PatientReports';
import PaymentStatus from './PaymentStatus/PaymentStatus';
import Settings from './Settings/Settings';
import SkinDiseaseFinder from './SkinDisease/SkinDiseaseFinder';
import Home from './Homeer/Home';

function DashboardLayout() {
    const { userRole } = useUser();

    const getSidebar = () => {
        switch(userRole) {
            case 'doctor':
                return <DoctorSidebar />;
            case 'patient':
                return <PatientSidebar />;
            case 'learner':
                return <LearnerSidebar />;
            case 'personal':
                return <IndividualSidebar />;
            default:
                return null;
        }
    };

    return(
        <>
            {getSidebar()}
            <div className="Dashboard-Container">
                <Routes>
                    <Route index element={<Navigate to="homer" replace />} />
                    <Route path="personaldashboard" element={<PersonalDashboard />} />
                    <Route path="homer" element={<Home />} />
                    <Route path="doctordashboard" element={<DoctorsDashboard />} />
                    <Route path="learnerdashboard" element={<LearnerDashboard />} />
                    <Route path="patientdashboard" element={<PatientDashboard />} />
                    <Route path="patients" element={<Patients />} />
                    <Route path="disease-finder-reports" element={<DiseaseFinderReports />} />
                    <Route path="disease-finder-scans" element={<DiseaseFinderScans />} />
                    <Route path="skin-disease-finder" element={<SkinDiseaseFinder />} />
                    <Route path="notifications" element={<Notifications />} />
                    <Route path="patientreports" element={<PatientReports />} />
                    <Route path="payment-status" element={<PaymentStatus />} />
                    <Route path="settings" element={<Settings />} />
                </Routes>
            </div>
        </>
    )
}

export default DashboardLayout;