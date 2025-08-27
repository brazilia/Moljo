import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function LoginPage() {
  const { login, resetPassword } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError('Failed to log in. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(formData.email);
      setResetEmailSent(true);
      setShowResetForm(false);
    } catch (error) {
      console.error('Reset password error:', error);
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (resetEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-secondary-bg">
        <div className="fantasy-card p-8 max-w-md w-full text-center">
          <div className="fantasy-icon blue mb-6 mx-auto w-16 h-16">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="fantasy-title text-2xl mb-4">Check Your Email</h2>
          <p className="fantasy-text text-text-secondary mb-6">
            We've sent a password reset link to <strong>{formData.email}</strong>
          </p>
          <button
            onClick={() => {
              setResetEmailSent(false);
              setFormData({ email: '', password: '' });
            }}
            className="fantasy-button"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-secondary-bg">
      <div className="fantasy-card p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <img 
            src="/moljo-logo.svg" 
            alt="Moljo" 
            className="mx-auto mb-6 w-16 h-16"
          />
          <h1 className="fantasy-title text-3xl mb-2">Welcome Back</h1>
          <p className="fantasy-text text-text-secondary">Sign in to your Moljo account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="fantasy-text text-red-700 text-sm">{error}</p>
          </div>
        )}

        {!showResetForm ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block fantasy-text text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="fantasy-input"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block fantasy-text text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="fantasy-input"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowResetForm(true)}
                className="fantasy-text text-accent-blue hover:text-blue-700 text-sm"
              >
                Forgot your password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="fantasy-button w-full"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label htmlFor="reset-email" className="block fantasy-text text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="reset-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="fantasy-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowResetForm(false)}
                className="fantasy-button secondary flex-1"
              >
                Back to Login
              </button>
              <button
                type="submit"
                disabled={loading}
                className="fantasy-button flex-1"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="fantasy-text text-text-secondary">
            Don't have an account?{' '}
            <Link to="/register" className="fantasy-text text-accent-blue hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

