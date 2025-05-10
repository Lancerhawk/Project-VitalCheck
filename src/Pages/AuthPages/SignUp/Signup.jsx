import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Choose your role'            
    });

    const [errors, setErrors] = useState({});
    const [passwordValidation, setPasswordValidation] = useState({
        minLength: false,
        hasUpperCase: false,
        hasNumber: false,
        hasLowerCase: false
    });

    const validatePassword = (password) => {
        return {
            minLength: password.length >= 8,
            hasUpperCase: /[A-Z]/.test(password),
            hasNumber: /[0-9]/.test(password),
            hasLowerCase: /[a-z]/.test(password)
        };
    };

    useEffect(() => {
        const validationResult = validatePassword(formData.password);
        setPasswordValidation(validationResult);
    }, [formData.password]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }if (!formData.name.trim()) {
            newErrors.name = 'name is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        const validationResult = validatePassword(formData.password);
        const isPasswordValid = Object.values(validationResult).every(Boolean);
        if (!isPasswordValid) {
            newErrors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (formData.role === 'Choose your role') {
            newErrors.role = 'Please select a role';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Signup attempt:', formData);
        navigate('/login');
    };

    return (
        <div className='signup-container'>
            <div className='signup-box'>
                <div className='signup-header'>
                    <h1>VitalCheck</h1>
                    <p>Create your healthcare account</p>
                </div>
                <form onSubmit={handleSubmit} className='signup-form'>
                    <div className='form-group-signup'>

                    <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder='Enter your Real Name'
                        />
                        {errors.username && <span className='error-message'>{errors.username}</span>}
                    </div><div className='form-group-signup'>

                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder='Enter your username'
                        />
                        {errors.username && <span className='error-message'>{errors.username}</span>}
                    </div>

                    <div className='form-group-signup'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder='Enter your email'
                        />
                        {errors.email && <span className='error-message'>{errors.email}</span>}
                    </div>

                    <div className='form-group-signup'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder='Enter your password'
                        />
                        <button
                            type='button'
                            className='password-toggle'
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <div className='password-validation'>
                            <div className={`validation-item ${passwordValidation.minLength ? 'valid' : 'invalid'}`}>
                                <i>{passwordValidation.minLength ? <FaCheck /> : <FaTimes />}</i>
                                At least 8 characters
                            </div>
                            <div className={`validation-item ${passwordValidation.hasUpperCase ? 'valid' : 'invalid'}`}>
                                <i>{passwordValidation.hasUpperCase ? <FaCheck /> : <FaTimes />}</i>
                                At least one uppercase letter
                            </div>
                            <div className={`validation-item ${passwordValidation.hasNumber ? 'valid' : 'invalid'}`}>
                                <i>{passwordValidation.hasNumber ? <FaCheck /> : <FaTimes />}</i>
                                At least one number
                            </div>
                            <div className={`validation-item ${passwordValidation.hasLowerCase ? 'valid' : 'invalid'}`}>
                                <i>{passwordValidation.hasLowerCase ? <FaCheck /> : <FaTimes />}</i>
                                At least one lowercase letter
                            </div>
                        </div>
                        {errors.password && <span className='error-message'>{errors.password}</span>}
                    </div>

                    <div className='form-group-signup'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder='Confirm your password'
                        />
                        <button
                            type='button'
                            className='password-toggle'
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {errors.confirmPassword && <span className='error-message'>{errors.confirmPassword}</span>}
                    </div>

                    <div className='form-group-signup'>
                        <label htmlFor='role'>Role</label>
                        <select
                            id='role'
                            name='role'
                            value={formData.role}
                            onChange={handleInputChange}
                            className='role-select'
                        >
                            <option value='Choose your role' disabled>Choose your role</option>
                            <option value='p'>Personal</option>
                            <option value='d'>Doctor</option>
                            <option value='s'>Learner</option>
                        </select>
                        {errors.role && <span className='error-message'>{errors.role}</span>}
                    </div>

                    <button type='submit' className='signup-button'>Sign Up</button>
                    <p className='signup-prompt'>
                        Already have an account? <a href='/login'>Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;