import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function EmployerProfilePage() {
  const { t } = useLanguage();
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    companySize: '',
    location: '',
    website: '',
    description: '',
    foundedYear: '',
    benefits: [],
    workCulture: [],
    contactEmail: '',
    contactPhone: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (currentUser && userProfile) {
          setFormData(prev => ({
            ...prev,
            companyName: userProfile.companyName || '',
            industry: userProfile.industry || '',
            companySize: userProfile.companySize || '',
            location: userProfile.location || '',
            website: userProfile.website || '',
            description: userProfile.description || '',
            foundedYear: userProfile.foundedYear || '',
            benefits: userProfile.benefits || [],
            workCulture: userProfile.workCulture || [],
            contactEmail: userProfile.contactEmail || '',
            contactPhone: userProfile.contactPhone || ''
          }));
        }
      } catch (error) {
        console.error('Error loading employer profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [currentUser, userProfile]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.industry || !formData.location) {
      alert('Please fill in all required fields (Company Name, Industry, Location)');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await updateUserProfile(formData);
      const message = userProfile && userProfile.profileCompleted 
        ? 'Company profile updated successfully!'
        : 'Company profile created successfully! You can now start posting jobs.';
      alert(message);
      navigate('/');
    } catch (error) {
      console.error('Error submitting employer profile:', error);
      alert('Error creating company profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-bg">
        <div className="fantasy-loading">
          <div className="fantasy-icon blue mb-4">
            <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <p className="fantasy-text text-text-secondary">Loading your company profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-secondary-bg">
      <div className="max-w-4xl mx-auto">
        <div className="fantasy-card p-8 mb-8">
          <div className="text-center mb-6">
            <img src="/moljo-logo.svg" alt="Moljo" className="mx-auto mb-4 w-16 h-16" />
          </div>
          <h1 className="fantasy-title text-3xl mb-4">
            {userProfile && userProfile.profileCompleted ? 'Edit Company Profile' : 'Create Company Profile'}
          </h1>
          <p className="fantasy-text text-text-secondary">
            Tell us about your company so we can help you find the perfect candidates
          </p>
        </div>

        <div className="fantasy-card p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Company Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    required
                    className="fantasy-input"
                    placeholder="Enter your company name"
                  />
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Industry *</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    required
                    className="fantasy-input"
                  >
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Creative/Media">Creative/Media</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Company Size</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className="fantasy-input"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">Location *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                    className="fantasy-input"
                    placeholder="City, State or Remote"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Company Description</h2>
              <div>
                <label className="block fantasy-text text-sm font-medium mb-2">About Your Company</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="fantasy-input h-32 resize-none"
                  placeholder="Tell candidates about your company, mission, values, and what makes you unique..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="fantasy-button secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="fantasy-button"
              >
                {isSubmitting 
                  ? (userProfile && userProfile.profileCompleted ? 'Updating Profile...' : 'Creating Profile...') 
                  : (userProfile && userProfile.profileCompleted ? 'Update Profile' : 'Create Profile')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
