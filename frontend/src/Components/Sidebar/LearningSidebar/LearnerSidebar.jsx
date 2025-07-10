import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiLogOut, FiMenu, FiX, FiHome } from 'react-icons/fi';
// import logo from '../../assets/logo.svg';
import defaultAvatar from '../../../assets/logo-user.png';
import '../Sidebar.css';

function LearnerSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(true);

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

                    <Link to="/dashboard/learnerdashboard" className="sb-nav-link">
                        <FiHome className="sb-nav-icon" />
                        {!isCollapsed && <span>Dashboard</span>}
                    </Link>

                </nav>

                <div className="sb-user-section">
                    <div className="sb-user-profile">
                        <img src={defaultAvatar} alt="User Avatar" className="sb-avatar" draggable='false' />
                        {!isCollapsed && <span className="sb-username">Eren Yeager</span>}
                    </div>
                    <div className="sb-user-actions">
                        <Link to="/settings" className="sb-action-btn   ">
                            <FiSettings />
                            {!isCollapsed && <span>Settings</span>}
                        </Link>
                        <button className="sb-action-btn sb-logout-btn">
                            <FiLogOut />
                            {!isCollapsed && <span>Logout</span>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LearnerSidebar;