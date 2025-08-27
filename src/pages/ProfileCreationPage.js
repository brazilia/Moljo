// src/pages/ProfileCreationPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function ProfileCreationPage() {
  const { t } = useLanguage();
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    skills: [],
    yearsExperience: '',
    
    // Company Preferences
    industries: [],
    companySizes: [],
    workStyles: [],
    salaryRange: '',
    remotePreference: '',
    cultureValues: [],
    
    // Motivation
    motivation: '',
    resume: null
  });

  // Load existing profile when component mounts
  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (currentUser) {
          console.log('Loading profile for user:', currentUser.uid);
          
          // Update form data with existing profile
          if (userProfile) {
            setFormData(prev => ({
              ...prev,
              fullName: userProfile.fullName || '',
              email: userProfile.email || '',
              phone: userProfile.phone || '',
              location: userProfile.location || '',
              skills: userProfile.skills || [],
              yearsExperience: userProfile.yearsExperience || '',
              industries: userProfile.industries || [],
              companySizes: userProfile.companySizes || [],
              workStyles: userProfile.workStyles || [],
              salaryRange: userProfile.salaryRange || '',
              cultureValues: userProfile.cultureValues || [],
              motivation: userProfile.motivation || '',
              resume: userProfile.resume || null
            }));
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [currentUser, userProfile]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      // Check file type
      const allowedTypes = ['.pdf', '.doc', '.docx'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        alert('Please upload a PDF, DOC, or DOCX file');
        return;
      }
      
      handleInputChange('resume', file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.location) {
      alert('Please fill in all required fields (Name, Email, Location)');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update profile in Firebase
      await updateUserProfile(formData);
      
      // Show success message and redirect to dashboard
      const message = userProfile && userProfile.profileCompleted 
        ? 'Profile updated successfully! Your AI agent will find new matches based on your changes.'
        : 'Profile created successfully! Your AI agent is now ready to find matches.';
      alert(message);
      navigate('/');
      
    } catch (error) {
      console.error('Error submitting profile:', error);
      alert('Error creating profile. Please try again.');
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
          <p className="fantasy-text text-text-secondary">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-secondary-bg">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="fantasy-card p-8 mb-8">
          <div className="text-center mb-6">
            <img 
              src="/moljo-logo.svg" 
              alt="Moljo" 
              className="mx-auto mb-4 w-16 h-16"
            />
          </div>
          <h1 className="fantasy-title text-3xl mb-4">
            {userProfile && userProfile.profileCompleted ? 'Edit Your AI Profile' : 'Create Your AI Profile'}
          </h1>
          <p className="fantasy-text text-text-secondary">
            Tell us about yourself so our AI can find the perfect job matches for you
          </p>
        </div>

        {/* Form */}
        <div className="fantasy-card p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    className="fantasy-input"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="fantasy-input"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="fantasy-input"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                    className="fantasy-input"
                    placeholder="City, State or Remote"
                  />
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">
                    Years of Experience
                  </label>
                  <select
                    value={formData.yearsExperience}
                    onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                    className="fantasy-input"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years (Entry Level)</option>
                    <option value="1-3">1-3 years (Junior)</option>
                    <option value="3-5">3-5 years (Mid-level)</option>
                    <option value="5-8">5-8 years (Senior)</option>
                    <option value="8+">8+ years (Expert)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Skills</h2>
              <div>
                <label className="block fantasy-text text-sm font-medium mb-2">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={(e) => handleInputChange('skills', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                  className="fantasy-input"
                  placeholder="e.g., React, JavaScript, Python, Design, Project Management"
                />
              </div>
            </div>

            {/* Company Preferences */}
            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Company Preferences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">
                    Preferred Industries
                  </label>
                  <div className="space-y-2">
                    {['Technology', 'Finance', 'Healthcare', 'Education', 'Creative/Media', 'Marketing'].map((industry) => (
                      <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.industries.includes(industry)}
                          onChange={() => handleMultiSelect('industries', industry)}
                          className="fantasy-checkbox"
                        />
                        <span className="fantasy-text text-sm">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">
                    Company Size
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'startup', label: 'Startup (1-50 employees)' },
                      { value: 'small', label: 'Small (51-200 employees)' },
                      { value: 'medium', label: 'Medium (201-1000 employees)' },
                      { value: 'large', label: 'Large (1000+ employees)' }
                    ].map((size) => (
                      <label key={size.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.companySizes.includes(size.value)}
                          onChange={() => handleMultiSelect('companySizes', size.value)}
                          className="fantasy-checkbox"
                        />
                        <span className="fantasy-text text-sm">{size.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">
                    Work Style
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'remote', label: 'Fully Remote' },
                      { value: 'hybrid', label: 'Hybrid (Remote + Office)' },
                      { value: 'office', label: 'Office-based' },
                      { value: 'flexible', label: 'Flexible (My choice)' }
                    ].map((style) => (
                      <label key={style.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.workStyles.includes(style.value)}
                          onChange={() => handleMultiSelect('workStyles', style.value)}
                          className="fantasy-checkbox"
                        />
                        <span className="fantasy-text text-sm">{style.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block fantasy-text text-sm font-medium mb-2">
                    Salary Range
                  </label>
                  <select
                    value={formData.salaryRange}
                    onChange={(e) => handleInputChange('salaryRange', e.target.value)}
                    className="fantasy-input"
                  >
                    <option value="">Select salary range</option>
                    <option value="30-50k">$30,000 - $50,000</option>
                    <option value="50-70k">$50,000 - $70,000</option>
                    <option value="70-90k">$70,000 - $90,000</option>
                    <option value="90-120k">$90,000 - $120,000</option>
                    <option value="120k+">$120,000+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Motivation */}
            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Motivation</h2>
              <div>
                <label className="block fantasy-text text-sm font-medium mb-2">
                  What motivates you in your career?
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  className="fantasy-input h-32 resize-none"
                  placeholder="Tell us about your career goals, what you're looking for in a role, and what motivates you..."
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <h2 className="fantasy-subtitle text-xl mb-6">Resume (Optional)</h2>
              <div className="fantasy-card p-6 border-2 border-dashed border-border-subtle hover:border-border-accent transition-colors">
                <div className="text-center">
                  {formData.resume ? (
                    <div>
                      <p className="fantasy-text text-accent-blue mb-2">✓ Resume uploaded successfully!</p>
                      <p className="fantasy-text text-sm text-text-secondary mb-2">{formData.resume.name}</p>
                      <button
                        type="button"
                        onClick={() => handleInputChange('resume', null)}
                        className="fantasy-text text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="fantasy-text text-text-secondary mb-2">Drop your resume here or click to browse</p>
                      <p className="fantasy-text text-xs text-text-muted">PDF, DOC, DOCX (Max 5MB)</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="fantasy-button mt-4 inline-block cursor-pointer">
                    {formData.resume ? 'Change File' : 'Choose File'}
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
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