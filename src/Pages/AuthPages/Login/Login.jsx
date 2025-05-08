import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
        role: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const { setUserRole } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Login attempt:', formData);
        // Set user role in context
        setUserRole(formData.role);
        // Navigate to role-specific dashboard
        navigate(`/dashboard/${formData.role}dashboard`);
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <div className='login-header'>
                    <h1>VitalCheck</h1>
                    <p>Welcome back to your healthcare dashboard</p>
                </div>
                <form onSubmit={handleSubmit} className='login-form'>
                    <div className='form-group'>
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
                    <div className='form-group'>
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
                    <div className='form-group'>
                        <label htmlFor='role'>Role</label>
                        <select
                            id='role'
                            name='role'
                            value={formData.role}
                            onChange={handleInputChange}
                            required
                            placeholder='Choose your role'
                        >
                            <option value='' disabled>Choose your role</option>
                            <option value='doctor'>Doctor</option>
                            <option value='patient'>Patient</option>
                            <option value='learner'>Learner</option>
                            <option value='personal'>Individual</option>
                        </select>
                    </div>
                    <div className='form-options'>
                        <label className='remember-me'>
                            <input
                                type='checkbox'
                                name='rememberMe'
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                            />
                            Remember me
                        </label>
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