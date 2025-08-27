import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import FirebaseTest from '../components/FirebaseTest';

export default function RegisterPage() {
  const { signup } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'jobseeker' // Default to jobseeker
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Check password strength when password changes
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    let feedback = [];

    if (password.length >= 8) score++;
    else feedback.push('At least 8 characters');

    if (/[a-z]/.test(password)) score++;
    else feedback.push('Lowercase letter');

    if (/[A-Z]/.test(password)) score++;
    else feedback.push('Uppercase letter');

    if (/[0-9]/.test(password)) score++;
    else feedback.push('Number');

    if (/[^A-Za-z0-9]/.test(password)) score++;
    else feedback.push('Special character');

    setPasswordStrength({
      score,
      feedback: feedback.join(', ')
    });
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return 'text-red-400';
    if (passwordStrength.score <= 3) return 'text-yellow-400';
    if (passwordStrength.score <= 4) return 'text-blue-400';
    return 'text-green-400';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength.score <= 2) return 'Weak';
    if (passwordStrength.score <= 3) return 'Fair';
    if (passwordStrength.score <= 4) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (passwordStrength.score < 3) {
      setError('Please choose a stronger password.');
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.fullName, formData.userType);
      navigate('/profile');
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('An account with this email already exists.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/weak-password':
          setError('Please choose a stronger password.');
          break;
        case 'auth/operation-not-allowed':
          setError('Email/password accounts are not enabled. Please contact support.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection and try again.');
          break;
        case 'auth/invalid-api-key':
          setError('Firebase configuration error. Please contact support.');
          break;
        case 'auth/app-not-authorized':
          setError('Firebase app not authorized. Please contact support.');
          break;
        case 'auth/configuration-not-found':
          setError('Firebase configuration not found. Please check your Firebase project setup.');
          break;
        default:
          setError(`Failed to create account: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="fantasy-card p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <img 
            src="/moljo-logo.svg" 
            alt="Moljo" 
            className="mx-auto mb-6 w-16 h-16"
          />
          <h1 className="fantasy-title text-3xl mb-2">Join Moljo</h1>
          <p className="fantasy-text text-gray-300">
            {formData.userType === 'employer' 
              ? 'Create your account and start posting jobs to find the perfect candidates'
              : 'Create your account and start your AI-powered job search journey'
            }
          </p>
        </div>

        {error && (
          <div className="fantasy-card p-4 mb-6 border border-red-500 bg-red-500 bg-opacity-10">
            <p className="fantasy-text text-red-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="fantasy-text text-sm text-gray-400 uppercase tracking-wider block mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="fantasy-input"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-6">
            <label className="fantasy-text text-sm text-gray-400 uppercase tracking-wider block mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="fantasy-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="fantasy-text text-sm text-gray-400 uppercase tracking-wider block mb-2">
              I am a...
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  value="jobseeker"
                  checked={formData.userType === 'jobseeker'}
                  onChange={handleInputChange}
                  className="fantasy-radio"
                />
                <div className="flex items-center space-x-2">
                  <div className="fantasy-icon blue w-6 h-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="fantasy-text">Job Seeker</span>
                </div>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  value="employer"
                  checked={formData.userType === 'employer'}
                  onChange={handleInputChange}
                  className="fantasy-radio"
                />
                <div className="flex items-center space-x-2">
                  <div className="fantasy-icon gold w-6 h-6">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="fantasy-text">Employer</span>
                </div>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="fantasy-text text-sm text-gray-400 uppercase tracking-wider block mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="fantasy-input"
              placeholder="Create a strong password"
              required
            />
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className={`fantasy-text text-sm ${getPasswordStrengthColor()}`}>
                    {getPasswordStrengthText()}
                  </span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-2 rounded-full ${
                          level <= passwordStrength.score
                            ? getPasswordStrengthColor().replace('text-', 'bg-')
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                {passwordStrength.feedback && (
                  <p className="fantasy-text text-xs text-gray-400">
                    Needs: {passwordStrength.feedback}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="fantasy-text text-sm text-gray-400 uppercase tracking-wider block mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="fantasy-input"
              placeholder="Confirm your password"
              required
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="fantasy-text text-xs text-red-400 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          <div className="mb-6">
            <div className="fantasy-card p-4 bg-opacity-50">
              <h3 className="fantasy-text font-semibold text-accent-gold mb-2">What you'll get:</h3>
              <ul className="fantasy-text text-sm text-gray-300 space-y-1">
                <li>• AI-powered job matching</li>
                <li>• Automated application tailoring</li>
                <li>• Interview preparation tools</li>
                <li>• Performance tracking & insights</li>
                <li>• Completely free for job seekers</li>
              </ul>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`fantasy-button w-full mb-6 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="text-center">
            <p className="fantasy-text text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="fantasy-text text-accent-gold hover:text-accent-silver font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
      
      {/* Firebase Test Component - Remove this after debugging */}
      <FirebaseTest />
    </div>
  );
}

