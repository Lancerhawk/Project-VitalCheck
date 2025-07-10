import './Login.css';
import { useState } from 'react';
import SuccessModal, { LoadingSpinner } from '../../../Components/SuccessModal/SuccessModal';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const { setUserRole } = useUser();

    const [error, setError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        axios.post('https://hackorbit-final-coding-era.onrender.com/login', {
            email: formData.email,
            password: formData.password
        })
        .then(response => {
            setLoading(false);
            if (response.data.status === 'Success') {
                setUserRole(response.data.role);
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                    navigate(`/dashboard/${response.data.role}dashboard`);
                }, 1500);
            } else {
                setError(response.data);
            }
        })
        .catch(err => {
            setLoading(false);
            console.error('Login error:', err);
            setError('An error occurred during login. Please try again.');
        });
    };

    return (
        <div className='login-container'>
            {loading && <LoadingSpinner message="Logging in..." />}
            <SuccessModal isOpen={showSuccessModal} />
            <div className='login-box'>
                <div className='login-header'>
                    <h1>VitalCheck</h1>
                    <p>Welcome back to your healthcare dashboard</p>
                </div>
                <form onSubmit={handleSubmit} className='login-form'>
                    <div className='form-group-login'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className='form-group-login'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder='Enter your password'
                            required
                        />
                        <button
                            type='button'
                            className='password-toggle'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {error && <div className='error-message'>{error}</div>}
                    <div className='form-options'>
                        
                        <a href='/forgot-password' className='forgot-password'>Forgot Password?</a>
                    </div>
                    <button type='submit' className='login-button'>Log In</button>
                    <p className='signup-prompt'>
                        Don't have an account? <a href='/signup'>Sign up</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;