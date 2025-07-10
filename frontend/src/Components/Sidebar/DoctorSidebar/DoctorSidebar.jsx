import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { FiSettings, FiLogOut, FiMenu, FiX, FiHome, FiUsers, FiFileText, FiCamera, FiBell, FiClipboard, FiDollarSign } from 'react-icons/fi';
// import defaultAvatar from '../../../assets/logo-user.png';
import '../Sidebar.css';
import { FaUser } from 'react-icons/fa';

function DoctorSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useUser();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <>
        
         <button className="sb-toggle-btn" onClick={toggleSidebar}>        
            
                {isCollapsed ? <FiMenu /> : <FiX />}
            </button>

        <div className={`sb-sidebar ${isCollapsed ? 'sb-collapsed' : ''}`}>

            <nav className="sb-nav-links">
                <Link to="/dashboard/doctordashboard" className={`sb-nav-link ${location.pathname === '/dashboard/doctordashboard' ? 'active' : ''}`}>
                    <FiHome className="sb-nav-icon" />
                    {!isCollapsed && <span>Dashboard</span>}
                </Link>
                <Link to="/dashboard/patients" className={`sb-nav-link ${location.pathname === '/dashboard/patients' ? 'active' : ''}`}>
                    <FiUsers className="sb-nav-icon" />
                    {!isCollapsed && <span>Patients</span>}
                </Link>
                <Link to="/dashboard/disease-finder-scans" className={`sb-nav-link ${location.pathname === '/dashboard/disease-finder-scans' ? 'active' : ''}`}>
                    <FiCamera className="sb-nav-icon" />
                    {!isCollapsed && <span>Analysis with Scans</span>}
                </Link>
                <Link to="/dashboard/disease-finder-reports" className={`sb-nav-link ${location.pathname === '/dashboard/disease-finder-reports' ? 'active' : ''}`}>
                    <FiFileText className="sb-nav-icon" />
                    {!isCollapsed && <span>Analysis with Reports</span>}
                </Link>
                <Link to="/dashboard/skin-disease-finder" className={`sb-nav-link ${location.pathname === '/dashboard/skin-disease-finder' ? 'active' : ''}`}>
                    <FiCamera className="sb-nav-icon" />
                    {!isCollapsed && <span>Skin Analysis</span>}
                </Link>
                <Link to="/dashboard/notifications" className={`sb-nav-link ${location.pathname === '/dashboard/notifications' ? 'active' : ''}`}>
                    <FiBell className="sb-nav-icon" />
                    {!isCollapsed && <span>Notifications</span>}
                </Link>
                <Link to="/dashboard/patientreports" className={`sb-nav-link ${location.pathname === '/dashboard/patientreports' ? 'active' : ''}`}>
                    <FiClipboard className="sb-nav-icon" />
                    {!isCollapsed && <span>Patient Reports</span>}
                </Link>
                <Link to="/dashboard/payment-status" className={`sb-nav-link ${location.pathname === '/dashboard/payment-status' ? 'active' : ''}`}>
                    <FiDollarSign className="sb-nav-icon" />
                    {!isCollapsed && <span>Payment Status</span>}
                </Link>
            </nav>

            <div className="sb-user-section">
                <div className="sb-user-profile">
                <FaUser size={24} />
                    {!isCollapsed && <span className="sb-username">Arin Jain</span>}
                    
                </div>
                <div className="sb-user-actions">
                    <Link to="/dashboard/settings" className="sb-action-btn">
                        <FiSettings />
                        {!isCollapsed && <span>Settings</span>}
                    </Link>
                    <button className="sb-action-btn sb-logout-btn" onClick={handleLogout}>
                        <FiLogOut />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default DoctorSidebar;