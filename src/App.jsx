import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './Components/Navbars/Navbar';
import HomePage from './Pages/LandingPage/HomePage';
import Services from './Pages/LandingPage/Services';
import Prices from './Pages/LandingPage/Prices';
import ContactUs from './Pages/LandingPage/ContactUs';
import './App.css';
import Login from './Pages/AuthPages/Login/Login';
import Signup from './Pages/AuthPages/SignUp/Signup';
import DashboardLayout from './Pages/Profiles/DashboardLayout';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <UserProvider>
      <Router>
      <div className="app">
        <ScrollToTop />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/prices" element={<Prices />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard/*" element={<DashboardLayout />} />
          </Routes>
        </main>
      </div>
      </Router>
    </UserProvider>
  );
}

export default App;
