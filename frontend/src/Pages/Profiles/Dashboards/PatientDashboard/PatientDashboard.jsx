import './PatientDashboard.css';
import { useState } from 'react';
import { useUser } from '../../../../context/UserContext';
import { FaUserCircle, FaDumbbell, FaAppleAlt, FaCalendarAlt, FaNotesMedical, FaBell, FaFileMedical, FaHistory } from 'react-icons/fa';

function PatientDashboard() {
  const { name } = useUser();
  const user = {
    name: name || 'User',
    avatar: '',
    stats: { reports: 12, appointments: 3, notifications: 5 },
  };
  const reports = [
    { id: 1, type: 'Blood Test', date: '2024-05-01', result: 'Cholesterol: Normal', ai: true },
    { id: 2, type: 'X-Ray', date: '2024-04-20', result: 'No TB Detected', ai: true },
    { id: 3, type: 'MRI', date: '2024-03-15', result: 'No Brain Tumor', ai: true },
  ];
  const notifications = [
    { id: 1, text: 'Your appointment with Dr. Smith (Cardiologist) is tomorrow at 10:00 AM.' },
    { id: 2, text: 'New AI report available for your recent blood test.' },
    { id: 3, text: 'Time to take your morning medication.' },
    { id: 4, text: 'Annual flu vaccination is due next week.' },
    { id: 5, text: 'Your diet plan has been updated for diabetes management.' },
  ];

  const [modal, setModal] = useState({ open: false, content: '' });
  const openModal = (content) => setModal({ open: true, content });
  const closeModal = () => setModal({ open: false, content: '' });

  return (
    <div className="personal-dashboard-container">
      {modal.open && (
        <div className="dashboard-modal-backdrop" onClick={closeModal}>
          <div className="dashboard-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>×</button>
            <div>{modal.content}</div>
          </div>
        </div>
      )}
      <div className="dashboard-row dashboard-header-row">
        <div className="dashboard-card user-info-card dashboard-card--tall">
          <div className="card-accent user-accent" />
          <div className="user-avatar">
            {user.avatar ? <img src={user.avatar} alt="avatar" /> : <FaUserCircle size={64} color="#2193b0" />}
          </div>
          <div className="user-details">
            <h2 className="dashboard-title">Welcome, <span>{user.name}</span></h2>
            <div className="user-stats">
              <span><FaFileMedical /> Reports: <b>{user.stats.reports}</b></span>
              <span><FaNotesMedical /> Appointments: <b>{user.stats.appointments}</b></span>
              <span><FaBell /> Notifications: <b>{user.stats.notifications}</b></span>
            </div>
            <div className="user-desc">Manage your health, routines, and reports all in one place.</div>
          </div>
        </div>
        <div className="dashboard-card notifications-card dashboard-card--tall">
          <div className="card-accent notif-accent" />
          <div className="card-header"><FaBell /> Notifications</div>
          <div className={`notifications-list-boxes${notifications.length > 3 ? ' notifications-scroll' : ''}`}>
            {notifications.map(n => (
              <div className="notification-box" key={n.id}>{n.text}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-row dashboard-main-grid">
        <div className="dashboard-card reports-history-card dashboard-card--minheight">
          <div className="card-accent reports-accent" />
          <div className="card-header"><FaHistory /> <span>AI Reports History</span></div>
          <div className="card-desc">Quickly access your most recent AI-analyzed medical reports.</div>
          <ul className="reports-list">
            {reports.map(r => (
              <li key={r.id}>
                <span className="report-type">{r.type}</span>
                <span className="report-date">{r.date}</span>
                <span className="report-result">{r.result}</span>
                {r.ai && <span className="ai-badge">AI</span>}
              </li>
            ))}
          </ul>
          <button className="view-all-btn" onClick={() => openModal('All Reports page coming soon!')}>View All Reports</button>
        </div>
        <div className="dashboard-card exercise-card dashboard-card--minheight">
          <div className="card-accent exercise-accent" />
          <div className="card-header"><FaDumbbell /> <span>Exercise Routine</span></div>
          <div className="card-desc">Medically recommended exercises for your condition, powered by AI.</div>
          <div className="exercise-content">
            <p><b>Today (Cardiac Rehab):</b> 20 min brisk walk, 10 min stretching, 5 min breathing exercises</p>
            <div className="dashboard-actions">
              <button className="customize-btn" onClick={() => openModal('Medical exercise routine customization coming soon!')}>Customize</button>
            </div>
          </div>
        </div>
        <div className="dashboard-card diet-card dashboard-card--minheight">
          <div className="card-accent diet-accent" />
          <div className="card-header"><FaAppleAlt /> <span>Diet Planner</span></div>
          <div className="card-desc">AI-powered meal plans for medical needs (e.g., diabetes, hypertension, recovery).</div>
          <div className="diet-content">
            <p><b>Breakfast:</b> Low-sodium oatmeal & berries<br /><b>Lunch:</b> Grilled salmon, leafy greens (diabetic-friendly)<br /><b>Dinner:</b> Steamed veggies, brown rice (post-surgery recovery)</p>
            <div className="dashboard-actions">
              <button className="customize-btn" onClick={() => openModal('Medical diet planner coming soon!')}>Customize</button>
            </div>
          </div>
        </div>
        <div className="dashboard-card event-card dashboard-card--minheight">
          <div className="card-accent event-accent" />
          <div className="card-header"><FaCalendarAlt /> <span>Event Planner</span></div>
          <div className="card-desc">Track medical events: medication reminders, therapy sessions, vaccinations, and checkups.</div>
          <div className="event-content">
            <p><b>Next:</b> Physical therapy session on 2024-05-10<br /><b>Medication:</b> 8:00 AM (Metformin), 8:00 PM (Amlodipine)</p>
            <div className="dashboard-actions">
              <button className="add-event-btn" onClick={() => openModal('Medical event planner coming soon!')}>Add Event</button>
            </div>
          </div>
        </div>
        <div className="dashboard-card appointments-card dashboard-card--minheight">
          <div className="card-accent appoint-accent" />
          <div className="card-header"><FaNotesMedical /> <span>Appointments</span></div>
          <div className="card-desc">Schedule and manage your medical appointments: doctor visits, lab tests, telemedicine, and follow-ups.</div>
          <div className="appointments-content">
            <p><b>Dr. Smith (Cardiologist)</b> - 2024-05-06, 10:00 AM<br /><b>Lab Test (Blood Panel)</b> - 2024-05-15, 8:00 AM</p>
            <div className="dashboard-actions">
              <button className="schedule-btn" onClick={() => openModal('Medical appointment scheduler coming soon!')}>Schedule New</button>
            </div>
          </div>
        </div>
        <div className="dashboard-card all-reports-card dashboard-card--minheight">
          <div className="card-accent allreports-accent" />
          <div className="card-header"><FaFileMedical /> <span>All Reports</span></div>
          <div className="card-desc">Access your full archive of medical reports, filter and search by date, type, or result.</div>
          <div className="all-reports-content">
            <button className="view-all-btn" onClick={() => openModal('Full reports archive coming soon!')}>Go to Reports</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;